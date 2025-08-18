const router = require("express").Router();

const authRoutes = require("./modules/auth/auth.module");
const companyRoutes = require("./modules/company/company.module");
const employeeRoutes = require("./modules/employee/employee.module");
const skillRoutes = require("./modules/skill/skill.module");

router.use("/auth", authRoutes);
router.use("/companies", companyRoutes);
router.use("/employees", employeeRoutes);
router.use("/skills", skillRoutes);

module.exports = router;
