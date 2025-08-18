const { body, param } = require('express-validator');

exports.createSkillRules = [
  body('name')
    .trim()
    .notEmpty().withMessage('Skill name is required'),
];

exports.updateSkillRules = [
  param('id').isInt().withMessage('Invalid skill ID'),
  body('name')
    .optional()
    .trim()
    .notEmpty().withMessage('Skill name cannot be empty'),
];
