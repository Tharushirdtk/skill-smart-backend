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
    const skills = await skillService.getAll();
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
    const skillId = req.params.id;
    const users = await skillService.getUsersBySkill(skillId);
    res.json(users);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch users for skill", error: err.message });
  }
};
