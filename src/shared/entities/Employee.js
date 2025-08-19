const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Employee",
  tableName: "employee",
  columns: {
    id: { type: "int", primary: true, generated: true },
    name: { type: "varchar" },
    email: { type: "varchar", unique: true },
    password: { type: "varchar" },
    role: { type: "enum", enum: ["admin", "employee"], default: "employee" },
    joinDate: { type: "date" },
    position: { type: "varchar", nullable: true },
    companyId: { type: "int", nullable: true },
  },
  relations: {
    company: {
      type: "many-to-one",
      target: "Company",
      joinColumn: {
        name: "companyId",
      },
      cascade: false,
    },
    skills: {
      type: "one-to-many",
      target: "EmployeeSkill",
      inverseSide: "employee",
    },
  },
});
