const router = require("express").Router();
const passport = require("passport");
const companyController = require("../../modules/company/company.controller.js");

// import company rules + middleware
const {
  updateCompanyRules
} = require("../../validation/company.validation");
const validate = require("../../validation");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  companyController.getAll
);

// if you have a POST/create route, plug in createCompanyRules + validate here

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  updateCompanyRules,
  validate,
  companyController.update
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  companyController.delete
);

module.exports = router;
