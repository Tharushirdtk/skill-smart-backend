const { body, param } = require('express-validator');

exports.createEmployeeRules = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required'),
  body('email')
    .isEmail().withMessage('Must be a valid email'),
  body('password')
    .isLength({ min: 6 }).withMessage('Password must be ≥ 6 characters'),
  body('role')
    .isIn(['admin','employee']).withMessage('Invalid role'),  // example enum
];

exports.updateEmployeeRules = [
  param('id').isInt().withMessage('Invalid employee ID'),
  body('email')
    .optional()
    .isEmail().withMessage('Must be a valid email'),
  body('password')
    .optional()
    .isLength({ min: 6 }).withMessage('Password must be ≥ 6 characters'),
  body('role')
    .optional()
    .isIn(['admin','employee']).withMessage('Invalid role'),
];
