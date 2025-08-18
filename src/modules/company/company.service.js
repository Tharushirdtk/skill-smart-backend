const companyRepo = require("../../shared/repositories/company.repository");

exports.getAll = () => {
  return companyRepo.findAll();
};

exports.update = (id, data) => {
  return companyRepo.update(id, data);
};

exports.delete = (id) => {
  return companyRepo.delete(id);
};
