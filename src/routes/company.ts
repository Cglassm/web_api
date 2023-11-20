import express from 'express'
import { create, deleteCompanyById, getAll, getCompanyById} from '../controllers/company.controller'


const router = express.Router()

router.get('/', getAll);
router.post('/', create);
router.delete('/:id', deleteCompanyById);
router.get('/:id', getCompanyById);



export default router