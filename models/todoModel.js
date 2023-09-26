import { DataTypes } from "sequelize";
import sequelize from "../config/db";
import moment from "moment-timezone";

const Todo = sequelize.define(
  "todo",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isCompleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: moment().tz("Asia/Kolkata").format(),
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: moment().tz("Asia/Kolkata").format(),
    },
  },
  {
    timestamps: true,
  }
);

export default Todo;
