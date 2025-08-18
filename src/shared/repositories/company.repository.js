const dataSource = require("../../config/data-source");
const Company = require("../../shared/entities/Company");

const companyRepo = dataSource.getRepository(Company);

exports.findAll = () => companyRepo.find();

exports.create = (data) => companyRepo.save(data);

exports.update = (id, data) => companyRepo.update(id, data);

exports.delete = (id) => companyRepo.delete(id);
