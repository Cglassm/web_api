import express from 'express'
import { create, deleteCompanyById, getAll, getCompanyById, patchCompanyWebsite} from '../controllers/company.controller'


const router = express.Router()

router.get('/', getAll);
router.post('/', create);
router.delete('/:id', deleteCompanyById);
router.get('/:id', getCompanyById);
router.patch('/:id/website', patchCompanyWebsite);



export default router