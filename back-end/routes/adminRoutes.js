import express from 'express' ; 
import { addDoctor } from '../controllers/adminController.js';
import upload from '../config/multer.config.js';


const adminRouter = express.Router()

adminRouter.post('/add-doctor' , upload.single('file'),addDoctor)

export default adminRouter 