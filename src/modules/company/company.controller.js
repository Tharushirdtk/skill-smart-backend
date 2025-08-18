const companyService = require("../company/company.service");

/**
 * @swagger
 * tags:
 *   name: Company
 *   description: Company management endpoints
 */

/**
 * @swagger
 * /companies:
 *   get:
 *     summary: Get all companies
 *     tags: [Company]
 *     responses:
 *       200:
 *         description: List of companies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
exports.getAll = async (req, res) => {
  try {
    const companies = await companyService.getAll();
    res.json(companies);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch companies", error: err.message });
  }
};

/**
 * @swagger
 * /companies/{id}:
 *   put:
 *     summary: Update a company by ID
 *     tags: [Company]
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
 *         description: Company updated
 *       500:
 *         description: Failed to update company
 */
exports.update = async (req, res) => {
  try {
    const result = await companyService.update(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update company", error: err.message });
  }
};

/**
 * @swagger
 * /companies/{id}:
 *   delete:
 *     summary: Delete a company by ID
 *     tags: [Company]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Company deleted
 *       500:
 *         description: Failed to delete company
 */
exports.delete = async (req, res) => {
  try {
    const result = await companyService.delete(req.params.id);
    res.json(result);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete company", error: err.message });
  }
};
