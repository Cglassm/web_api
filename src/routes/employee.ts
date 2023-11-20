import express from 'express'
import { create, getAllEmployees, getEmployeeById, removeEmployee } from '../controllers/employee.controller';

const router = express.Router()

router.get('/', getAllEmployees);
router.post('/', create);
router.delete('/:id', removeEmployee);
router.get('/:id', getEmployeeById);



export default router