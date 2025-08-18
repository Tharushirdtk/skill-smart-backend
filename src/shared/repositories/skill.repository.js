const dataSource = require("../../config/data-source");
const Skill = require("../../shared/entities/Skill");

const skillRepo = dataSource.getRepository(Skill);

// --- Fetch all skills ---
exports.findAll = () => skillRepo.find();

// --- Fetch a skill by ID ---
exports.findById = (id) =>
  skillRepo.findOne({ where: { id: parseInt(id, 10) } });

// --- Create a new skill ---
exports.create = (data) => {
  const entity = skillRepo.create(data); // creates entity instance
  return skillRepo.save(entity);
};

// --- Update a skill by ID ---
exports.update = async (id, data) => {
  await skillRepo.update(parseInt(id, 10), data);
  return skillRepo.findOne({ where: { id: parseInt(id, 10) } });
};

// --- Delete a skill by ID ---
exports.delete = async (id) => {
  const skill = await skillRepo.findOne({ where: { id: parseInt(id, 10) } });
  if (!skill) return null;
  await skillRepo.remove(skill);
  return skill;
};
