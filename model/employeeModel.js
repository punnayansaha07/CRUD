import { DataTypes } from "sequelize";
import sequelize from "../config/dbconfig.js";

const Employee = sequelize.define(
  "Employee",
  {
    employee_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      validate: {
        isInt: { msg: "Employee ID must be a number" },
        len: [4, 4],
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Name cannot be empty" },
      },
    },
    email: { 
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: { msg: "Invalid email address" },
      },
    },
    mobile: {
      type: DataTypes.BIGINT,
      allowNull: false,
      unique: true,
      validate: {
        is: /^\d{10}$/,
      },
    },
  },
  {
    timestamps: false,
  }
);

export default Employee;
