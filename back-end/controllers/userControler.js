import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary'


const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.json({ success: false, message: "Missing Details" })
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Enter a Valid Email" })
        }


        if (password.length < 8) {
            return res.json({ success: false, message: "Enter minimum 8 Digit password" })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name,
            email,
            password: hashedPassword,
        }


        const newUser = new userModel(userData)
        const user = await newUser.save()

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        res.json({ success: true, token })


    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const loginUser = async (req, res) => {
    try {


        const { email, password } = req.body
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: 'User does not exist' })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: 'Invalid Password' })
        }



    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const getProfile = async (req, res) => {
    try {

        const { userId } = req.body;
        const userData = await userModel.findById(userId).select('-password')

        res.json({ success: true, userData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const updateProfile = async (req, res) => {
    try {
        const { userId, name, phone, address, dob, gender } = req.body;
        const imageFile = req.file;

        // console.log('Received data:', { name,phone ,gender , address }, imageFile);

        if (!name || !phone || !dob || !gender) {
            return res.json({ success: false, message: "Data is missing" });
        }

        await userModel.findByIdAndUpdate(userId, {
            name,
            phone,
            address: JSON.parse(address),
            dob,
            gender,
        });

        if (imageFile) {
            try {
                const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
                const imageUrl = imageUpload.secure_url;

                await userModel.findByIdAndUpdate(userId, { image: imageUrl });
            } catch (uploadError) {
                console.error("Cloudinary Upload Error:", uploadError);
                return res.json({ success: false, message: "Image upload failed" });
            }
        }

        res.json({ success: true, message: "Profile is updated successfully" });
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};


export { registerUser, getProfile, loginUser, updateProfile }