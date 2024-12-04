import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('y2k_database', 'postgres', 'terraman', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});

export default sequelize;