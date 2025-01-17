import { Employee, EmployeeDept } from "../model/employeeModel.js";
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



/*
export const createEmployee = async (req, res) => {
  try {
    const { name, email, mobile } = req.body;
   /*
    const existingEmployee = await Employee.findOne({
      where: { [Op.or]: [{ email }, { mobile }] },
    });

    if (existingEmployee) {
      return res.status(400).json({ error: "Employee with this email or mobile already exists" });
    }
    
    const employee = await Employee.create({ name, email, mobile });

    return res
      .status(201)
      .json({ message: "Employee created successfully", employee });
  } catch (error) {
    console.error("Error creating employee record", { error });
    res.status(500).json({ error: "Internal server error" });
  }
};
*/
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
export const createEmployee = async (req, res) => {
  try {
    const { name, email, mobile, employee_id, department_id ,salary} = req.body;

    const existingEmployee = await Employee.findOne({
      where: { [Op.or]: [{ email }, { mobile }, { employee_id }] },
    });

    if (existingEmployee) {
      return res.status(400).json({ error: "Employee already exists" });
    }

    const departmentExists = await EmployeeDept.findOne({
      where: { department_id },
    });

    if (!departmentExists) {
      return res.status(404).json({ error: "Department not found" });
    }

    const employee = await Employee.create({
      name,
      email,
      mobile,
      employee_id,
      department_id,
      salary,
    });

    return res
      .status(201)
      .json({ message: "Employee created successfully", employee });
  } catch (error) {
    console.error("Error creating employee record", { error });
    res.status(500).json({ error: "Internal server error" });
  }
};
export const getAllEmployeedata = async (req, res) => {
  try {
    const allEmployee = await Employee.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: EmployeeDept,
          attributes: ["department_name"],
        },
      ],
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
      include: [
        {
          model: EmployeeDept,
          attributes: ["department_name"],
        },
      ],
    });

    if (!getEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res
      .status(200)
      .json({ message: "Employee retrieved successfully", data: getEmployee });
  } catch (error) {
    console.error("Error retrieving employee data", { error });
    res.status(500).json({ error: "Internal server error" });
  }
};
export const updateEmployeeDataById = async (req, res) => {
  try {
    const { name, email, mobile, department_id , salary} = req.body;

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

    const departmentExists = await EmployeeDept.findOne({
      where: { department_id },
    });

    if (!departmentExists) {
      return res.status(404).json({ error: "Department not found" });
    }

    await targetedEmployee.update({ name, email, mobile, department_id , salary});
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
      return res.status(404).json({ error: "Employee not found" });
    }

    await toDeleteEmployee.destroy();
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Error deleting employee data", { error });
    res.status(500).json({ error: "Internal server error" });
  }
};
export const createEmployeeDept = async (req, res) => {
  try {
    const {department_id, department_name } = req.body;


    const departmentExists = await EmployeeDept.findOne({
      where: { department_id },
    });

    if (departmentExists) {
      return res
        .status(400)
        .json({ error: "Department with this ID already exists" });
    }

    const employeeDept = await EmployeeDept.create({
      department_id,
      department_name,
    });

    res.status(200).json({
      message: "Employee department and salary created successfully",
      data: employeeDept,
    });
  } catch (error) {
    console.error("Error inserting employee department and salary", { error });
    res.status(500).json({ error: "Internal server error" });
  }
};
export const deleteAllEmployee = async (req, res) => {
  try{
      await Employee.destroy({ where: {} });
      res.status(200).json({ message: "All employee data deleted successfully" });
  }
  catch(error){
       console.error("Error deleting employee data", {
         
       });
       res.status(500).json({error : 'Internal server error'});
  }
};