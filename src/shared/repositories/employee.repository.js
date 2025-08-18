const dataSource = require("../../config/data-source");
const Employee = require("../../shared/entities/Employee");

const employeeRepo = dataSource.getRepository(Employee);

exports.findAll = () =>
  employeeRepo.find({ relations: ["skills", "skills.skill"] });

exports.findById = (id) =>
  employeeRepo.findOne({
    where: { id },
    relations: ["skills", "skills.skill"],
  });

exports.findByEmail = (email) => employeeRepo.findOneBy({ email });

// Create a new employee
exports.create = (data) => employeeRepo.save(data);

// Specifically create an admin employee
exports.createAdminEmployee = (data) =>
  employeeRepo.save({
    ...data,
    role: "admin",
    joinDate: new Date(),
  });

exports.update = (id, data) => employeeRepo.update(parseInt(id), data);

exports.delete = (id) => employeeRepo.delete(id);
