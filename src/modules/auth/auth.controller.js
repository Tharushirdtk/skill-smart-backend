const jwt = require("jsonwebtoken");
const authService = require("./auth.service");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 */

/**
 * @swagger
 * /auth/register-admin:
 *   post:
 *     summary: Register a new admin with company
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - companyName
 *               - companyAddress
 *               - companyIndustry
 *             properties:
 *               name: { type: string, example: John Doe }
 *               email: { type: string, format: email, example: john@example.com }
 *               password: { type: string, example: mySecurePassword123 }
 *               companyName: { type: string, example: Example Inc. }
 *               companyAddress: { type: string, example: 123 Example Street }
 *               companyIndustry: { type: string, example: Technology }
 *     responses:
 *       201:
 *         description: Admin and company registered successfully
 *       500:
 *         description: Server error
 */
exports.registerAdmin = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      companyName,
      companyAddress,
      companyIndustry,
    } = req.body;

    const newAdmin = await authService.createAdminWithCompany(
      name,
      email,
      password,
      companyName,
      companyAddress,
      companyIndustry
    );

    res.status(201).json({
      message: "Admin and company registered successfully",
      user: newAdmin,
    });
  } catch (err) {
    console.error("Register Admin Error:", err);
    res.status(500).json({ message: err.message || "Server error" });
  }
};

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in and get a JWT token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: { type: string, format: email, example: john@example.com }
 *               password: { type: string, example: mySecurePassword123 }
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token: { type: string }
 *                 user: { type: object }
 *       401:
 *         description: Invalid email or password
 *       500:
 *         description: Server error
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await authService.validateUser(email, password);

    if (!user)
      return res.status(401).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || "secret123",
      { expiresIn: "1h" }
    );

    res.json({ token, user });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
