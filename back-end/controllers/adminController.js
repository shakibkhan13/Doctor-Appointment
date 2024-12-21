import validator from 'validator';  
import bcrypt from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary';
import doctorsModel from '../models/doctorsModel.js'; 

const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;

    const imageFile = req.file;

    console.log('Received data:', { name, email, password, address }, imageFile);  


    if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
      return res.json({ success: false, message: "Missing Details" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please Enter a Valid Email" });
    }

    if (password.length < 8) {
      return res.json({ success: false, message: "Please Enter a Strong Password" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    if (!imageFile) {
      return res.json({ success: false, message: "No image file uploaded" });
    }


    const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
    const imageUrl = imageUpload.secure_url;

    console.log('Image uploaded successfully:', imageUrl);  


    const doctorData = {
      name,
      email,
      image: imageUrl,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,  
      date: Date.now(),
    };


    const newDoctor = new doctorsModel(doctorData);
    await newDoctor.save();

    res.json({ success: true, message: "Doctor Added Successfully" });
  } catch (error) {
    console.log('Error occurred:', error);  
    res.json({ success: false, message: error.message });
  }
};

export { addDoctor };
