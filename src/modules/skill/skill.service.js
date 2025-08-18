const skillRepository = require("../../shared/repositories/skill.repository");
const employeeSkillRepository = require("../../shared/repositories/employee-skill.repository");
const { scoreToProficiency } = require("../../shared/utils/skill-utils");

/**
 * Returns all skills with aggregated metadata the frontend expects:
 * - id, name, category, description (if present)
 * - employeeCount
 * - avgProficiencyScore (numeric avg or null)
 * - avgProficiency (human label or null)
 * - trending (boolean)
 */
exports.getAll = async () => {
  // fetch base skills (returns array of skill entities)
  const skills = await skillRepository.findAll();

  const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;
  const now = Date.now();

  // For each skill, load its employee-skill rows and compute aggregates
  const augmented = await Promise.all(
    (skills || []).map(async (skill) => {
      // employeeSkillRepository.findBySkillId returns ES rows with relation "employee"
      const esRows = await employeeSkillRepository.findBySkillId(skill.id);
      const es = Array.isArray(esRows) ? esRows : [];

      const employeeCount = es.length;

      const totalScore = es.reduce(
        (acc, item) => acc + (Number(item.proficiencyScore) || 0),
        0
      );

      const avgScore =
        employeeCount > 0 ? Math.round(totalScore / employeeCount) : null;

      const avgProficiency =
        avgScore !== null ? scoreToProficiency(avgScore) : null;

      const trending =
        employeeCount > 0 &&
        es.some((item) => {
          if (!item.lastUpdated) return false;
          const t = new Date(item.lastUpdated).getTime();
          return now - t <= THIRTY_DAYS_MS;
        });

      return {
        id: skill.id,
        name: skill.name,
        category: skill.category,
        // include description if you add it to Skill entity/table; otherwise empty string
        description: skill.description || "",
        employeeCount,
        avgProficiency, // e.g. "Intermediate" (or null)
        avgProficiencyScore: avgScore, // numeric avg or null
        trending,
      };
    })
  );

  return augmented;
};

/**
 * Create/update/delete passthroughs using your repository wrapper
 */
exports.create = (data) => {
  return skillRepository.create(data);
};

exports.update = (id, data) => {
  return skillRepository.update(id, data);
};

exports.delete = (id) => {
  return skillRepository.delete(id);
};

/**
 * Return users who have a particular skill (mapped)
 * Each item contains: { employee, proficiency, proficiencyScore, lastUpdated }
 * where `employee` is the employee entity loaded by the repo (may include id, name, email, etc).
 */
exports.getUsersBySkill = async (skillId) => {
  const rows = await employeeSkillRepository.findBySkillId(skillId);
  return (rows || []).map((r) => ({
    employee: r.employee,
    proficiency: r.proficiency,
    proficiencyScore: r.proficiencyScore,
    lastUpdated: r.lastUpdated,
  }));
};
