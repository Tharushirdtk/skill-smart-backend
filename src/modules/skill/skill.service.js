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
exports.getAll = async (companyId) => {
  const skills = await skillRepository.findAll();

  const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;
  const now = Date.now();

  const augmented = await Promise.all(
    (skills || []).map(async (skill) => {
      const esRows = await employeeSkillRepository.findBySkillId(
        skill.id,
        companyId
      );
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
        description: skill.description || "",
        employeeCount,
        avgProficiency,
        avgProficiencyScore: avgScore,
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
exports.getUsersBySkill = async (skillId, companyId) => {
  const rows = await employeeSkillRepository.findBySkillId(skillId, companyId);
  return (rows || []).map((r) => ({
    employee: r.employee,
    proficiency: r.proficiency,
    proficiencyScore: r.proficiencyScore,
    lastUpdated: r.lastUpdated,
  }));
};

// Returns only skills assigned to employees of a given company
exports.getCompanyAssignedSkills = async (companyId) => {
  // Use the new helper from employee-skill.repository
  const skills = await employeeSkillRepository.findSkillsAssignedToCompany(companyId);
  return skills;
};
