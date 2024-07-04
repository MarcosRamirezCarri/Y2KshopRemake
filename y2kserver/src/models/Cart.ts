import { DataTypes } from 'sequelize';
import sequelize from '../config/database';
import UserModel from './User';
import ProductModel from './Products';

const CartModel = sequelize.define('Cart', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER.UNSIGNED,
    references: {
      model: UserModel,
      key: 'id',
    },
    allowNull: false,
  },
  products: {
    type: DataTypes.ARRAY(DataTypes.INTEGER.UNSIGNED),
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