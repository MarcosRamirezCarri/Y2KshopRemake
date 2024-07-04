import { DataTypes } from 'sequelize';
import sequelize from '../config/database';

const UserModel = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
  email: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
  password: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
  phone: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
  admin: {
    type: new DataTypes.BOOLEAN,
    allowNull: false,
  }
}, {
  tableName: 'User',
  timestamps: false, // Si no quieres que Sequelize agregue automáticamente las columnas createdAt y updatedAt
});

export default UserModel;