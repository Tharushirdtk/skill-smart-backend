const bcrypt = require("bcrypt");
const employeeRepo = require("../../shared/repositories/employee.repository");
const companyRepo = require("../../shared/repositories/company.repository");

exports.createAdminWithCompany = async (
  name,
  email,
  password,
  companyName,
  address,
  industry
) => {
  const existingUser = await employeeRepo.findByEmail(email);
  if (existingUser) throw new Error("Email already in use");

  // Create Company
  const newCompany = await companyRepo.create({
    name: companyName,
    address,
    industry,
  });

  // Hash Password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create Admin Employee (use the new createAdminEmployee method)
  const newAdmin = await employeeRepo.createAdminEmployee({
    name,
    email,
    password: hashedPassword,
    company: newCompany,
  });

  return newAdmin;
};

exports.validateUser = async (email, password) => {
  const user = await employeeRepo.findByEmail(email);
  if (!user) return null;

  const isMatch = await bcrypt.compare(password, user.password);
  return isMatch ? user : null;
};

