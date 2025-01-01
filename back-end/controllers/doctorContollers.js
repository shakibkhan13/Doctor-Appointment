import Doctor from "../models/doctorsModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import appointmentModel from "../models/appointmentModel.js"


const changeAvailablity = async(req, res)=>{
    try {
        const {docId} = req.body 

        const docData = await Doctor.findById(docId)
        await Doctor.findByIdAndUpdate(docId,{available: !docData.available})
        res.json({success: true, message: 'Availability Change'})

    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

const doctorList = async (req, res)=>{
    try {
        
        const doctors = await Doctor.find({}).select(['-password','-email'])
        // console.log(doctors)

        res.json({success:true, doctors})

    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

const loginDoctor = async (req, res)=>{
     try {
        
        const {email , password} = req.body 
        const doctor = await Doctor.findOne({email})

        if(!doctor){
            return res.json({success:false , message : 'InValid Email'})
        }

        const isMatch = await bcrypt.compare(password, doctor.password)
        if(isMatch){
           const token = jwt.sign({id:doctor._id}, process.env.JWT_SECRET)
           res.json({success:true , token})
        }else{
            res.json({success:false , message : 'InValid Password'})
        }

     } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
     }
}

const appointmentsDoctor = async (req , res)=>{

    try {

        const { docId } = req.body
        const appointments = await  appointmentModel.find({ docId })

        res.json({ success: true , appointments })

        
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }

}

 const appointmentComplete = async(req, res)=>{
    try {

        const { docId , appointmentId} = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)

        if (appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId , {isCompleted : true})
            return res.json({success:true , message:'Appointment Completed'})
        }else{
            return res.json({success:false , message:'Appointment Not Completed'})
        }
        
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
 }


 const appointmentCancel = async(req , res)=>{
    try {

        const { docId , appointmentId} = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)

        if (appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId , {cancelled : true})
            return res.json({success:true , message:'Appointment Cancelled'})
        }else{
            return res.json({success:false , message:'Cancellation Failed'})
        }
        
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
 }




export { changeAvailablity, doctorList , loginDoctor , appointmentsDoctor , appointmentComplete, appointmentCancel }