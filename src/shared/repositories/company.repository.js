const dataSource = require("../../config/data-source");
const Company = require("../../shared/entities/Company");

const companyRepo = dataSource.getRepository(Company);

exports.findAll = () => companyRepo.find();

exports.findById = (id) => companyRepo.findOne({ where: { id } });

exports.findOneBy = (criteria) => companyRepo.findOneBy(criteria);

exports.create = (data) => companyRepo.save(data);

exports.update = (id, data) => companyRepo.update(id, data);

exports.delete = (id) => companyRepo.delete(id);
