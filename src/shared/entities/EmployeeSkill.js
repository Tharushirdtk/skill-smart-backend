const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'EmployeeSkill',
  tableName: 'employee_skill',
  columns: {
    id: { type: 'int', primary: true, generated: true },
    proficiency: { type: 'enum', enum: ['Beginner','Intermediate','Advanced','Expert'] },
    proficiencyScore: { type: 'tinyint' },
    lastUpdated: { type: 'datetime', default: () => 'CURRENT_TIMESTAMP' },
  },
  relations: {
    employee: { type: 'many-to-one', target: 'Employee', joinColumn: true, onDelete: 'CASCADE' },
    skill: { type: 'many-to-one', target: 'Skill', joinColumn: true },
  }
});