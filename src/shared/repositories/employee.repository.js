const dataSource = require("../../config/data-source");
const Employee = require("../../shared/entities/Employee");

const employeeRepo = dataSource.getRepository(Employee);

exports.findAll = (companyId) => {
  const relations = ["skills", "skills.skill"];

  if (companyId !== undefined && companyId !== null) {
    const cid = Number(companyId);
    return employeeRepo.find({
      where: { companyId: cid },
      relations,
    });
  }

  return employeeRepo.find({ relations });
};

exports.findById = (id) =>
  employeeRepo.findOne({
    where: { id },
    relations: ["skills", "skills.skill"],
  });

exports.findByEmail = (email) => {
  if (!email) return Promise.resolve(null);
  return employeeRepo.findOneBy({ email });
};

exports.create = (data) => employeeRepo.save(data);

exports.save = (entity) => employeeRepo.save(entity);

exports.createAdminEmployee = (data) =>
  employeeRepo.save({
    ...data,
    role: "admin",
    joinDate: new Date(),
  });

exports.update = (id, data) => employeeRepo.update(id, data);

exports.delete = (id) => employeeRepo.delete(id);
