const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Company",
  tableName: "company",
  columns: {
    id: { type: "int", primary: true, generated: true },
    name: { type: "varchar" },
    address: { type: "varchar", nullable: true },
    industry: { type: "varchar", nullable: true },
  },
  relations: {
    employees: {
      type: "one-to-many",
      target: "Employee",
      inverseSide: "company",
    },
  },
});
