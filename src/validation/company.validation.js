const { body } = require('express-validator');

exports.createCompanyRules = [
  body('name')
    .trim()
    .notEmpty().withMessage('Company name is required'),
  body('address')
    .trim()
    .notEmpty().withMessage('Address is required'),
  
];

exports.updateCompanyRules = [
  body('name')
    .optional()
    .trim()
    .notEmpty().withMessage('Name cannot be empty if provided'),
  body('address')
    .optional()
    .trim()
    .notEmpty().withMessage('Address cannot be empty if provided'),
];
