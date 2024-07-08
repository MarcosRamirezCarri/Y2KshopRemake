import { DataTypes } from 'sequelize';
import sequelize from '../config/database';
import UserModel from './User';
import ProductModel from './Products';

const CartModel = sequelize.define('Cart', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: UserModel,
      key: 'id',
    },
    allowNull: false,
  },
  products: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    references: {
      model: ProductModel,
      key: 'id',
    },
    allowNull: false,
  },
}, {
  tableName: 'Cart',
  timestamps: false,
});

UserModel.hasMany(CartModel, { foreignKey: 'userId' });
CartModel.belongsTo(UserModel, { foreignKey: 'userId' });

export default CartModel;