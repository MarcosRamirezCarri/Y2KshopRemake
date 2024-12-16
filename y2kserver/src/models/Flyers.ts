import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const FlyerModel = sequelize.define(
  "Flyer",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status:{
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    text:{
      type: DataTypes.STRING(128),
      allowNull: true
    }
  },
  {
    tableName: "Flyer",
    timestamps: false,
  }
);

export default FlyerModel;

