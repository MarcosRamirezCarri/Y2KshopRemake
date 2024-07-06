import { DataTypes } from 'sequelize';
import sequelize from '../config/database';

const ProductModel = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
  images:{
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  colors: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  sizes: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  clasification: {
    type: DataTypes.STRING(128),
    allowNull: true,
  },
}, {
  tableName: 'Product',
  timestamps: false,
});

export default ProductModel;