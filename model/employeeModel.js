import { DataTypes } from "sequelize";
import sequelize from "../config/dbconfig.js";
const Employee = sequelize.define(
  "Employee",
  {
    employee_id: {
      type: DataTypes.INTEGER,
     unique: true,
     allowNull: false,
      validate: {
        isInt: { msg: "Employee ID must be a number" },
        len: [4, 4],
      },
    },
    department_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
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
    salary: {
      type: DataTypes.INTEGER,
      allowNull: false,
  }
  },
  {
    timestamps: false,
  }
);
const EmployeeDept = sequelize.define(
  "EmployeeDept",
  {
      department_id: {
           type: DataTypes.INTEGER,
           primaryKey: true,
           allowNull: false,
      },
      department_name: {
          type: DataTypes.STRING,
          allowNull: false,
      },

  },
  {
      timestamps: false,
  }
);
//Employee.hasOne(EmployeeDept,{foreignKey:'employee_id'});
//EmployeeDept.belongsTo(Employee,{foreignKey: 'employee_id'});
//one employee -> one departmrnt
//one department -> many employees;
// EmployeeDept has many Employees
EmployeeDept.hasMany(Employee, {
  foreignKey: 'department_id',
});

Employee.belongsTo(EmployeeDept, {
  foreignKey: 'department_id',
});

export { Employee, EmployeeDept };
