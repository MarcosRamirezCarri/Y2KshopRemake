import { DataTypes } from 'sequelize';
import sequelize from '../config/database';
import CartItemModel from './Cart';

const UserModel = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
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
  location:{
    type: new DataTypes.JSONB,
    allowNull: false,
  },
  history: {
    type: DataTypes.ARRAY(DataTypes.JSONB),
    allowNull: false,
    defaultValue: [],
  },
  admin: {
    type: new DataTypes.BOOLEAN,
    allowNull: false,
  }
}, {
  tableName: 'User',
  timestamps: false, 
});

export default UserModel;