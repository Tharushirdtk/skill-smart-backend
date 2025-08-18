const { DataSource } = require('typeorm');
const path = require('path');

module.exports = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'final_project',
  synchronize: true,
  logging: false,
  entities: [
    path.join(__dirname, '..', 'shared', 'entities', '*.js')
  ],
});