import { DataTypes } from 'sequelize';
import sequelize from '../config/database';

const SizeQuantity = {
  size: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
};
const ColorSizes = {
  color: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
  sizes: {
    type: DataTypes.ARRAY(DataTypes.JSONB),
    allowNull: false,
  },
};

const ProductModel = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
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
    type: DataTypes.ARRAY(DataTypes.JSONB),
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