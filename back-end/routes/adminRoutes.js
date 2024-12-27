
import express from 'express'; 
import { addDoctor , allDoctor, loginAdmin, appointmentsAdmin } from '../controllers/adminController.js'; 
import upload from '../middlewares/multer.js'; 
import authAdmin from '../middlewares/authAdmin.js';
import { changeAvailablity } from '../controllers/doctorContollers.js';

const adminRouter = express.Router();

adminRouter.post('/add-doctor',authAdmin,upload.single('image'), addDoctor);
adminRouter.post('/login', loginAdmin);
adminRouter.post('/all-doctors',authAdmin, allDoctor);
adminRouter.post('/change-availability',authAdmin, changeAvailablity);
adminRouter.get('/appointments',authAdmin, appointmentsAdmin);


export default adminRouter;
