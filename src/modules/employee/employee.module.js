const router = require("express").Router();
const passport = require("passport");
const employeeController = require("./employee.controller");
const {
  createEmployeeRules,
  updateEmployeeRules,
} = require("../../validation/employee.validation");
const validate = require("../../validation");

// Delete certificate for an employee
router.delete(
  "/:id/certificates/:certId",
  passport.authenticate("jwt", { session: false }),
  employeeController.deleteCertificate
);

// Employee certificates
router.post(
  "/:id/certificates",
  passport.authenticate("jwt", { session: false }),
  employeeController.addCertificate
);
router.get(
  "/certificates/count",
  passport.authenticate("jwt", { session: false }),
  employeeController.countCertificates
);

// Get certificates for an employee
router.get(
  "/:id/certificates",
  passport.authenticate("jwt", { session: false }),
  employeeController.getCertificates
);
// Employee certificates
router.post(
  "/:id/certificates",
  passport.authenticate("jwt", { session: false }),
  employeeController.addCertificate
);
router.get(
  "/certificates/count",
  passport.authenticate("jwt", { session: false }),
  employeeController.countCertificates
);

// Employee CRUD
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  employeeController.getAll
);
router.get(
  "/me",
  passport.authenticate("jwt", { session: false }),
  employeeController.getMe
);
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  employeeController.getOne
);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  createEmployeeRules,
  validate,
  employeeController.create
);
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  updateEmployeeRules,
  validate,
  employeeController.update
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  employeeController.delete
);

// Employee skills
router.get(
  "/:id/skills",
  passport.authenticate("jwt", { session: false }),
  employeeController.getSkills
);
router.post(
  "/:id/skills",
  passport.authenticate("jwt", { session: false }),
  employeeController.createSkill
);
router.put(
  "/:id/skills/:skillId",
  passport.authenticate("jwt", { session: false }),
  employeeController.updateSkill
);
router.delete(
  "/:id/skills/:skillId",
  passport.authenticate("jwt", { session: false }),
  employeeController.deleteSkill
);

module.exports = router;
