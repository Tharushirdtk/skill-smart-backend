const skillService = require("../skill/skill.service");

/**
 * @swagger
 * tags:
 *   name: Skill
 *   description: Skill management endpoints
 */

/**
 * @swagger
 * /skills:
 *   get:
 *     summary: Get all skills
 *     tags: [Skill]
 *     responses:
 *       200:
 *         description: List of skills
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
exports.getAll = async (req, res) => {
  try {
    const { companyId } = req.query;

    if (!companyId) {
      return res
        .status(400)
        .json({ message: "companyId query parameter is required" });
    }

    const cid = parseInt(companyId, 10);
    if (Number.isNaN(cid)) {
      return res
        .status(400)
        .json({ message: "companyId must be a valid number" });
    }
    const skills = await skillService.getAll(cid);
    res.json(skills);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch skills", error: err.message });
  }
};

/**
 * @swagger
 * /skills:
 *   post:
 *     summary: Create a new skill
 *     tags: [Skill]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Skill created
 *       500:
 *         description: Failed to create skill
 */
exports.create = async (req, res) => {
  try {
    const result = await skillService.create(req.body);
    res.status(201).json(result);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to create skill", error: err.message });
  }
};

/**
 * @swagger
 * /skills/{id}:
 *   put:
 *     summary: Update a skill by ID
 *     tags: [Skill]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Skill updated
 *       500:
 *         description: Failed to update skill
 */
exports.update = async (req, res) => {
  try {
    const result = await skillService.update(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update skill", error: err.message });
  }
};

/**
 * @swagger
 * /skills/{id}:
 *   delete:
 *     summary: Delete a skill by ID
 *     tags: [Skill]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Skill deleted
 *       500:
 *         description: Failed to delete skill
 */
exports.delete = async (req, res) => {
  try {
    const result = await skillService.delete(req.params.id);
    res.json(result);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete skill", error: err.message });
  }
};

/**
 * @swagger
 * /skills/{id}/users:
 *   get:
 *     summary: Get all users who have a specific skill
 *     tags: [Skill]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: List of users with the skill
 *       500:
 *         description: Failed to fetch users for skill
 */
exports.getUsersBySkill = async (req, res) => {
  try {
    const { companyId } = req.query;

    if (!companyId) {
      return res
        .status(400)
        .json({ message: "companyId query parameter is required" });
    }

    const cid = parseInt(companyId, 10);
    if (Number.isNaN(cid)) {
      return res
        .status(400)
        .json({ message: "companyId must be a valid number" });
    }

    const skillId = req.params.id;
    const users = await skillService.getUsersBySkill(skillId, cid);
    res.json(users);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch users for skill", error: err.message });
  }
};

/**
 * @swagger
 * /skills/company-assigned:
 *   get:
 *     summary: Get only skills assigned to employees of a company
 *     tags: [Skill]
 *     parameters:
 *       - name: companyId
 *         in: query
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of company-assigned skills
 *       400:
 *         description: Missing or invalid companyId
 *       500:
 *         description: Failed to fetch skills
 */
exports.getCompanyAssignedSkills = async (req, res) => {
  try {
    const { companyId } = req.query;
    if (!companyId) {
      return res.status(400).json({ message: "companyId query parameter is required" });
    }
    const cid = parseInt(companyId, 10);
    if (Number.isNaN(cid)) {
      return res.status(400).json({ message: "companyId must be a valid number" });
    }
    const skills = await skillService.getCompanyAssignedSkills(cid);
    res.json(skills);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch company-assigned skills", error: err.message });
  }
};
