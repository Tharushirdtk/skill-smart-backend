const router = require("express").Router();
const passport = require("passport");
const skillController = require("./skill.controller");

//  import your rules + middleware
const {
  createSkillRules,
  updateSkillRules,
} = require("../../validation/skill.validation");
const validate = require("../../validation");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  skillController.getAll
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  createSkillRules, // ② run these checks
  validate, // ③ catch any errors
  skillController.create
);

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  updateSkillRules, // optional id + body checks
  validate,
  skillController.update
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  skillController.delete
);

router.get(
  "/:id/users",
  passport.authenticate("jwt", { session: false }),
  skillController.getUsersBySkill
);

module.exports = router;
