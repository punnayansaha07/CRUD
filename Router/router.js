import express from 'express';
import { createEmployee ,getAllEmployeedata, updateEmployeeDataById,deleteEmployee,getOneEmployeeDataById} from '../controller/employeeController.js';
const router = express.Router();
router.post('/',createEmployee);
router.get('/',getAllEmployeedata);
router.put('/:id',updateEmployeeDataById);
router.delete('/:id',deleteEmployee);
router.get('/:id',getOneEmployeeDataById);
export default router