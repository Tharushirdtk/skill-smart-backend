const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "EmployeeCertificate",
  tableName: "employee_certificate",
  columns: {
    id: { type: "int", primary: true, generated: true },
    name: { type: "varchar" },
    issuedBy: { type: "varchar", nullable: true },
    issueDate: { type: "date", nullable: true },
    employeeId: { type: "int" },
  },
  relations: {
    employee: {
      type: "many-to-one",
      target: "Employee",
      joinColumn: {
        name: "employeeId",
      },
      cascade: false,
    },
  },
});
