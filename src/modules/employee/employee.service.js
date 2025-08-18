const employeeRepo = require("../../shared/repositories/employee.repository");
const employeeSkillRepo = require("../../shared/repositories/employee-skill.repository");
const bcrypt = require("bcrypt");

// --- Employee CRUD ---
exports.getAll = () => employeeRepo.findAll();
exports.getOne = (id) => employeeRepo.findById(id);


// Create a new employee (non-admin)
exports.createEmployee = async (data) => {
  const { name, email, password, role, position, companyId } = data;

  // Check if email already exists
  const existing = await employeeRepo.findOneBy({ email });
  if (existing) throw new Error("Email already in use");

  // Make sure company exists
  const company = await companyRepo.findOneBy({ id: companyId });
  if (!company) throw new Error("Company not found");

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save employee
  const newEmployee = employeeRepo.create({
    name,
    email,
    password: hashedPassword,
    role: role || "employee", 
    position,
    joinDate: new Date(),
    company,
  });

  return employeeRepo.save(newEmployee);
};
exports.update = (id, data) => employeeRepo.update(id, data);
exports.delete = (id) => employeeRepo.delete(id);

// --- Employee Skills ---
exports.getSkills = (employeeId) =>
  employeeSkillRepo.findByEmployeeId(employeeId);
exports.addSkill = (employeeId, data) =>
  employeeSkillRepo.createForEmployee({ employeeId, ...data });
exports.updateSkill = (employeeId, skillId, data) =>
  employeeSkillRepo.updateForEmployee(employeeId, skillId, data);
exports.deleteSkill = (employeeId, skillId) =>
  employeeSkillRepo.deleteForEmployee(employeeId, skillId);
