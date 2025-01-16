import Employee from "../model/employeeModel.js";
import sequelize from "../config/dbconfig.js";
import { Op } from "sequelize";
//import logger from "../Logger/logger.js";
/*
import Joi from "joi";
const EmployeeSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  mobile: Joi.number().integer().required(),
  employee_id: Joi.number().integer().required(),
});
*/

export const createEmployee = async (req, res) => {
  try {
    const { name, email, mobile, employee_id } = req.body;

    const existingEmployee = await Employee.findOne({
      where: { [Op.or]: [{ email }, { mobile }, { employee_id }] },
    });

    if (existingEmployee) {
      return res.status(400).json({ error: "Employee already exists" });
    }

    const employee = await Employee.create({ name, email, mobile, employee_id });
    //console.log(employee);
    return res
      .status(201)
      .json({ message: "Employee created successfully", employee });
  } catch (error) {
    console.error("Error creating employee record", { error });
    res.status(500).json({ error: "Internal server error" });
  }
};

/*
export const getAllEmployeedata = async (req, res) => {
  try {
    const allemployee = await Employee.find(
      {},{
        _id: 0,
        __v: 0
      }
    );
    res.status(200).json({
      message: "Employee data retrieved successfully",
      count: allemployee.length,
      data: allemployee,
    });
  } catch (error) {
    logger.error("Error retrieving employee data", { error });
    res.status(500).json({
      error: "Internal server error",
    });
  }
}; 
*/

export const getAllEmployeedata = async (req, res) => {
  try {
    const allEmployee = await Employee.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    res.status(200).json({
      message: "Employee data retrieved successfully",
      count: allEmployee.length,
      data: allEmployee,
    });
  } catch (error) {
    console.error("Error retrieving employee data", { error });
    res.status(500).json({ error: "Internal server error" });
  }
};


export const getOneEmployeeDataById = async (req, res) => {
  try {
    const getEmployee = await Employee.findOne({
      where: { employee_id: req.params.id },
    });

    if (!getEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.status(200).json({ message: "Employee retrieved successfully", getEmployee });
  } catch (error) {
    console.error("Error retrieving employee data", { error });
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateEmployeeDataById = async (req, res) => {
  try {
    const { name, email, mobile } = req.body;

    const targetedEmployee = await Employee.findOne({
      where: { employee_id: req.params.id },
    });

    if (!targetedEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    const duplicate = await Employee.findOne({
      where: {
        [Op.or]: [{ email }, { mobile }],
        employee_id: { [Op.ne]: req.params.id },
      },
    });

    if (duplicate) {
      return res.status(400).json({ error: "Email or mobile already in use" });
    }

    await targetedEmployee.update({ name, email, mobile });
    res.status(200).json({
      message: "Employee data updated successfully",
      data: targetedEmployee,
    });
  } catch (error) {
    console.error("Error updating employee data", { error });
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const toDeleteEmployee = await Employee.findOne({
      where: { employee_id: req.params.id },
    });

    if (!toDeleteEmployee) {
      console.warn("Attempt to delete non-existent employee", {
        employee_id: req.params.id,
      });
      return res.status(404).json({ error: "Employee not found" });
    }

    await toDeleteEmployee.destroy();
    console.info("Employee deleted successfully", {
      employee_id: req.params.id,
    });

    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Error deleting employee data", {
      employee_id: req.params.id,
      error,
    });
    res.status(500).json({ error: "Internal server error" });
  }
};
