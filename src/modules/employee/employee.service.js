const employeeRepo = require("../../shared/repositories/employee.repository");
const employeeSkillRepo = require("../../shared/repositories/employee-skill.repository");
const companyRepo = require("../../shared/repositories/company.repository");
const bcrypt = require("bcrypt");

exports.getAll = (companyId) => {
  return employeeRepo.findAll(companyId);
};

exports.getOne = (id) => employeeRepo.findById(id);

exports.create = async (data) => {
  const { name, email, password, role, position, companyId, joinDate } = data;

  if (!name || !email || !password || !companyId) {
    const err = new Error(
      "Missing required fields: name, email, password or companyId"
    );
    err.code = "BAD_REQUEST";
    throw err;
  }

  const existing = await employeeRepo.findByEmail(email);
  if (existing) {
    const err = new Error("Email already in use");
    err.code = "CONFLICT";
    throw err;
  }

  const company = await companyRepo.findById(companyId);
  if (!company) {
    const err = new Error("Company not found");
    err.code = "NOT_FOUND";
    throw err;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const employeePayload = {
    name,
    email,
    password: hashedPassword,
    role: role || "employee",
    position: position || null,
    joinDate: joinDate ? new Date(joinDate) : new Date(),
    company,
  };

  const saved = await employeeRepo.save(employeePayload);
  return saved;
};

exports.update = (id, data) => employeeRepo.update(id, data);
exports.delete = (id) => employeeRepo.delete(id);

exports.getSkills = (employeeId) =>
  employeeSkillRepo.findByEmployeeId(employeeId);
exports.addSkill = (employeeId, data) =>
  employeeSkillRepo.createForEmployee({ employeeId, ...data });
exports.updateSkill = (employeeId, skillId, data) =>
  employeeSkillRepo.updateForEmployee(employeeId, skillId, data);
exports.deleteSkill = (employeeId, skillId) =>
  employeeSkillRepo.deleteForEmployee(employeeId, skillId);
