
import express from 'express'
import { doctorList } from '../controllers/doctorContollers.js';
const doctorRouter = express.Router() ; 

doctorRouter.get('/list', doctorList)

export default doctorRouter