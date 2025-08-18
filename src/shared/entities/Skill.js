const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Skill',
  tableName: 'skill',
  columns: {
    id: { type: 'int', primary: true, generated: true },
    name: { type: 'varchar', unique: true },
    category: { type: 'varchar', nullable: true },
  },
  relations: {
    employeeSkills: { type: 'one-to-many', target: 'EmployeeSkill', inverseSide: 'skill' },
  }
});