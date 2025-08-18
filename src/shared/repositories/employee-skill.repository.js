const dataSource = require("../../config/data-source");
const EmployeeSkill = require("../../shared/entities/EmployeeSkill");
const Employee = require("../../shared/entities/Employee");
const Skill = require("../../shared/entities/Skill");
const { scoreToProficiency } = require("../utils/skill-utils");

const esRepo = dataSource.getRepository(EmployeeSkill);
const employeeRepo = dataSource.getRepository(Employee);
const skillRepo = dataSource.getRepository(Skill);

// --- Fetch all skills assigned to an employee ---
exports.findByEmployeeId = (employeeId) =>
  esRepo.find({
    where: { employee: { id: parseInt(employeeId, 10) } },
    relations: ["skill"],
  });

// --- Fetch all employees who have a skill ---
exports.findBySkillId = (skillId) =>
  esRepo.find({
    where: { skill: { id: parseInt(skillId, 10) } },
    relations: ["employee"],
  });

// --- Fetch one specific EmployeeSkill ---
exports.findByEmployeeAndSkill = (employeeId, skillId) =>
  esRepo.findOne({
    where: {
      employee: { id: parseInt(employeeId, 10) },
      skill: { id: parseInt(skillId, 10) },
    },
    relations: ["employee", "skill"],
  });

// --- Create / assign a skill to an employee ---
exports.createForEmployee = async ({
  employeeId,
  skillId,
  proficiencyScore,
}) => {
  // 1️⃣ Fetch employee
  const employee = await employeeRepo.findOneBy({
    id: parseInt(employeeId, 10),
  });
  if (!employee) throw new Error("Employee not found");

  // 2️⃣ Fetch skill
  const skill = await skillRepo.findOneBy({ id: parseInt(skillId, 10) });
  if (!skill) throw new Error("Skill not found");

  // 3️⃣ Check if already assigned
  const exists = await exports.findByEmployeeAndSkill(employeeId, skillId);
  if (exists) throw new Error("Skill already assigned to employee");

  // 4️⃣ Calculate proficiency label from score
  const proficiency = scoreToProficiency(proficiencyScore);

  // 5️⃣ Create new EmployeeSkill
  const entity = esRepo.create({
    employee,
    skill,
    proficiency,
    proficiencyScore: parseInt(proficiencyScore, 10),
    lastUpdated: new Date(),
  });

  return esRepo.save(entity);
};

// --- Update an employee's skill ---
exports.updateForEmployee = async (employeeId, skillId, data) => {
  const exists = await exports.findByEmployeeAndSkill(employeeId, skillId);
  if (!exists) throw new Error("Employee skill not found");

  if (data.proficiencyScore !== undefined) {
    exists.proficiencyScore = parseInt(data.proficiencyScore, 10);
    exists.proficiency = scoreToProficiency(exists.proficiencyScore);
  } else if (data.proficiency !== undefined) {
    exists.proficiency = data.proficiency;
  }

  exists.lastUpdated = new Date();
  return esRepo.save(exists);
};

// --- Delete a skill from an employee ---
exports.deleteForEmployee = async (employeeId, skillId) => {
  const exists = await exports.findByEmployeeAndSkill(employeeId, skillId);
  if (!exists) return { affected: 0 };
  return esRepo.delete(exists.id);
};
