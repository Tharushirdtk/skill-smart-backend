exports.deleteById = async (certId, employeeId) => {
  return dataSource
    .getRepository(EmployeeCertificate)
    .delete({ id: certId, employeeId });
};
const dataSource = require("../../config/data-source");
const EmployeeCertificate = require("../entities/EmployeeCertificate");

exports.findAllByEmployee = async (employeeId) => {
  return dataSource
    .getRepository(EmployeeCertificate)
    .find({ where: { employeeId } });
};

exports.save = async (certificate) => {
  // Remove expiryDate if present
  const certToSave = { ...certificate };
  delete certToSave.expiryDate;
  return dataSource.getRepository(EmployeeCertificate).save(certToSave);
};

exports.countAll = async (companyId) => {
  // Count all certificates for employees in a company
  return dataSource
    .getRepository(EmployeeCertificate)
    .createQueryBuilder("certificate")
    .leftJoin("certificate.employee", "employee")
    .where("employee.companyId = :companyId", { companyId })
    .getCount();
};
