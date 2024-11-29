import validator from "validator";
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from "cloudinary";
import doctorModels from "../modules/doctorsModels.js"


const addDoctor = async (req, res) =>{
    try{
        const {name,email,password,speciality,experience,degree,about,fees,address} = req.body;
        const imageFile = req.imageFile
        if(!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address){
            return res.json({success:false, message:"Missing Details"})
        }

        
        if(!validator.isEmail(email)){
            return res.json({success:false, message:"Please enter a Vaild email"});
        }

        if(password.length < 8){
            return res.json({success:false, message:"Please enter a Strong Password "});
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const imageupload = await cloudinary.uploader.upload(imageFile.path, {resource_type:"image"})
        const imageUrl = imageupload.secure_url 

        const doctorData = {
            name ,
            email,
            image: imageUrl, 
            password:hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address:JSON.parse(address) , 
            date : Date.now()
        }

        const newDoctor = new doctorModels(doctorData)
        await newDoctor.save()

        res.json({success:true, message:"Doctor Added"})


    }catch(error){
        console.log(error)
        res.json({success:false, message:error.message})

    }
}

export {addDoctor}

