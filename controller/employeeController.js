import Employee from "../model/employeeModel.js";
import Joi from "joi";
import logger from "../Logger/logger.js";

const EmployeeSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  mobile: Joi.number().integer().required(),
  employee_id: Joi.number().integer().required(),
});

export const createEmployee = async (req, res) => {
  try {
    const { name, email, mobile, employee_id } =
      await EmployeeSchema.validateAsync(req.body);
    const existingRecord = await Employee.findOne({
      $or: [{ email }, { mobile }, { employee_id }],
    });

    if (existingRecord) {
      if (existingRecord.email === email) {
        return res.status(409).json({ error: "Email already exists" });
      }
      if (existingRecord.mobile === mobile) {
        return res.status(409).json({ error: "Mobile already exists" });
      }
      if (existingRecord.employee_id === employee_id) {
        return res.status(409).json({ error: "Employee ID already exists" });
      }
    }

    const employee = await Employee.create({
      name,
      email,
      mobile,
      employee_id,
    });

    res
      .status(201)
      .json({ message: "Employee created successfully", employee });
  } catch (error) {
    logger.error("Error creating employee record", { error });

    if (error.isJoi) {
      return res.status(400).json({ error: error.message });
    }

    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllEmployeedata = async (req, res) => {
  try {
    const allemployee = await Employee.find();
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

export const updateEmployeeDataById = async (req, res) => {
  try {
    const { name, email, mobile, employee_id } = req.body;

    const employee = await Employee.findOneAndUpdate(
      { employee_id: req.params.id },
      { name, email, mobile, employee_id },
      { new: true, runValidators: true }
    );
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res
      .status(200)
      .json({ meaasge: "Employee data udpated successfully", data: employee });
  } catch (error) {
    logger.error("Error updating employee data", { error });
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
      const employee = await Employee.findOneAndDelete({ employee_id: req.params.id });

      if (!employee) {
          logger.warn("Attempt to delete non-existent employee", { employee_id: req.params.id });
          return res.status(404).json({ message: "Employee not found" });
      }

      logger.info("Employee deleted successfully", { employee_id: req.params.id });
      res.status(200).json({ message: "Employee data deleted successfully" });
  } catch (error) {
      logger.error("Error deleting employee data", {
          employee_id: req.params.id,
          message: error.message,
          stack: error.stack,
      });
      res.status(500).json({ error: "Internal server error" });
  }
};

