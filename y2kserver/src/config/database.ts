import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('y2k_database', 'postgres', 'terraman', {
  host: 'localhost',
  dialect: 'postgres',
});

export default sequelize;