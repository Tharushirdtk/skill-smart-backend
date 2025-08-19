const empService = require("./employee.service");

/**
 * @swagger
 * tags:
 *   name: Employee
 *   description: Employee management
 */

/**
 * @swagger
 * /api/employees:
 *   get:
 *     summary: Get all employees
 *     tags: [Employee]
 *     responses:
 *       200:
 *         description: List of employees
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
    const employees = await empService.getAll(cid);
    return res.json(employees);
  } catch (err) {
    console.error("Failed to fetch employees:", err);
    return res
      .status(500)
      .json({ message: "Failed to fetch employees", error: err.message });
  }
};

/**
 * @swagger
 * /api/employees/{id}:
 *   get:
 *     summary: Get a single employee by ID
 *     tags: [Employee]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Employee object
 *       404:
 *         description: Employee not found
 */
exports.getOne = async (req, res) => {
  try {
    const employee = await empService.getOne(req.params.id);
    if (!employee)
      return res.status(404).json({ message: "Employee not found" });
    res.json(employee);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch employee", error: err.message });
  }
};

/**
 * @swagger
 * /api/employees:
 *   post:
 *     summary: Create a new employee
 *     tags: [Employee]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Employee created
 */
exports.create = async (req, res) => {
  console.log("Creating employee with data:", req.body);
  try {
    const result = await empService.create(req.body);
    res.status(201).json(result);
  } catch (err) {
    console.error("Error creating employee:", err);
    res
      .status(500)
      .json({ message: "Failed to create employee", error: err.message });
  }
};

/**
 * @swagger
 * /api/employees/{id}:
 *   put:
 *     summary: Update an employee by ID
 *     tags: [Employee]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Employee updated
 */
exports.update = async (req, res) => {
  try {
    const result = await empService.update(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update employee", error: err.message });
  }
};

/**
 * @swagger
 * /api/employees/{id}:
 *   delete:
 *     summary: Delete an employee by ID
 *     tags: [Employee]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Employee deleted
 */
exports.delete = async (req, res) => {
  try {
    const result = await empService.delete(req.params.id);
    res.json(result);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete employee", error: err.message });
  }
};

/**
 * @swagger
 * /api/employees/me:
 *   get:
 *     summary: Get the currently logged-in employee
 *     tags: [Employee]
 *     responses:
 *       200:
 *         description: Current employee profile
 *       404:
 *         description: Employee not found
 */
exports.getMe = async (req, res) => {
  try {
    const employee = await empService.getOne(req.user.id);
    if (!employee)
      return res.status(404).json({ message: "Employee not found" });
    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

/**
 * @swagger
 * /api/employees/{id}/skills:
 *   get:
 *     summary: Get all skills for an employee
 *     tags: [Employee]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of employee skills
 */
exports.getSkills = async (req, res) => {
  try {
    const skills = await empService.getSkills(req.params.id);
    res.json(skills);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch employee skills", error: err.message });
  }
};

/**
 * @swagger
 * /api/employees/{id}/skills:
 *   post:
 *     summary: Add a skill to an employee
 *     tags: [Employee]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Skill added to employee
 */
exports.createSkill = async (req, res) => {
  try {
    const result = await empService.addSkill(req.params.id, req.body);
    res.status(201).json(result);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to add skill to employee", error: err.message });
  }
};

/**
 * @swagger
 * /api/employees/{id}/skills/{skillId}:
 *   put:
 *     summary: Update an employee's skill
 *     tags: [Employee]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *       - name: skillId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Employee skill updated
 */
exports.updateSkill = async (req, res) => {
  try {
    const result = await empService.updateSkill(
      req.params.id,
      req.params.skillId,
      req.body
    );
    res.json(result);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update employee skill", error: err.message });
  }
};

/**
 * @swagger
 * /api/employees/{id}/skills/{skillId}:
 *   delete:
 *     summary: Delete an employee's skill
 *     tags: [Employee]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *       - name: skillId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Employee skill deleted
 */
exports.deleteSkill = async (req, res) => {
  try {
    const result = await empService.deleteSkill(
      req.params.id,
      req.params.skillId
    );
    res.json(result);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete employee skill", error: err.message });
  }
};
