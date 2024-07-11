import { DataTypes } from 'sequelize';
import sequelize from '../config/database';
import UserModel from './User';
import ProductModel from './Products';

const CartItemModel = sequelize.define('Cart', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'User',
      key: 'id',
    },
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Product',
      key: 'id',
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
  size: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
}, {
  tableName: 'Cart',
  timestamps: false,
});

UserModel.hasMany(CartItemModel, { foreignKey: 'userId' });
CartItemModel.belongsTo(UserModel, { foreignKey: 'userId' });
ProductModel.hasMany(CartItemModel, { foreignKey: 'productId' });
CartItemModel.belongsTo(ProductModel, { foreignKey: 'productId' });

export default CartItemModel;