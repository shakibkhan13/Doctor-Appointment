import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary'
import Doctor from '../models/doctorsModel.js';
import appointmentModel from '../models/appointmentModel.js';
import razorpay from 'razorpay'




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


// const bookAppointment = async(req , res) =>{
//     try {
//         const {userId , docId , slotDate , slotTime} = req.body

//         const docData = await Doctor.findById(docId.select('-password'))

//         if(!docData.available){
//             return res.json({success: false , message:'Doctor is not available'})
//         }

//         let slots_booked = docData.slots_booked 
//         if (slots_booked[slotDate]) {
//             if (slots_booked[slotDate].includes(slotTime)) {
//                 return res.json({success: false , message:'Slot is not available'})
//             }else{
//                 slots_booked[slotDate].push(slotTime)
//             }
//         }else{
//             slots_booked[slotDate] = []
//             slots_booked[slotDate].push(slotTime)
//         }

//         const userData = await userModel.findById(userId).select('-password')

//         delete docData.slots_booked

//         const appointmentData = {
//             userId ,
//             docId , 
//             userData , 
//             docData, 
//             amount:docData.fees,
//             slotTime,
//             slotDate,
//             date : Date.now()
//         }

//         const newAppointment = new appointmentModel(appointmentData)
//         await newAppointment.save()

//         await Doctor.findByIdAndUpdate(docId , {slots_booked})

//         res.json({success: true, message: ' Appointment Booked '})


//     } catch (error) {
//         console.log(error)
//         res.json({success : false , error:error.message})
//     }
// }

// const bookAppointment = async (req, res) => {
//     try {
//         const { userId, docId, slotDate, slotTime } = req.body;

//         const docData = await Doctor.findById(docId).select('-password');

//         if (!docData.available) {
//             return res.json({ success: false, message: 'Doctor is not available' });
//         }

//         let slots_booked = docData.slots_booked;
//         if (slots_booked[slotDate]) {
//             if (slots_booked[slotDate].includes(slotTime)) {
//                 return res.json({ success: false, message: 'Slot is not available' });
//             } else {
//                 slots_booked[slotDate].push(slotTime);
//             }
//         } else {
//             slots_booked[slotDate] = [];
//             slots_booked[slotDate].push(slotTime);
//         }

//         const userData = await userModel.findById(userId).select('-password');

//         delete docData.slots_booked;

//         const appointmentData = {
//             userId,
//             docId,
//             userData,
//             docData,
//             amount: docData.fees,
//             slotTime,
//             slotDate,
//             date: Date.now()
//         };

//         const newAppointment = new appointmentModel(appointmentData);
//         await newAppointment.save();

//         await Doctor.findByIdAndUpdate(docId, { slots_booked });

//         res.json({ success: true, message: 'Appointment Booked' });

//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, error: error.message });
//     }
// };

const bookAppointment = async (req, res) => {
    try {
        const { userId, docId, slotDate, slotTime } = req.body;

        // Fetch doctor data and convert it to a plain object using .lean() (faster & more efficient)
        const docData = await Doctor.findById(docId).select('-password').lean(); 

        if (!docData.available) {
            return res.json({ success: false, message: 'Doctor is not available' });
        }

        let slots_booked = docData.slots_booked || {};  // Default to empty object if not defined
        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: 'Slot is not available' });
            } else {
                slots_booked[slotDate].push(slotTime);
            }
        } else {
            slots_booked[slotDate] = [slotTime];  // Initialize an array for the slotDate if it doesn't exist
        }

        // Fetch user data and convert to plain object using .lean()
        const userData = await userModel.findById(userId).select('-password').lean();

        if (!userData) {
            return res.json({ success: false, message: 'User not found' });
        }

        // Remove slots_booked from docData to prevent unnecessary data storage in appointment
        delete docData.slots_booked;

        // Prepare appointment data
        const appointmentData = {
            userId,
            docId,
            userData,  // userData is already in JSON format
            docData,   // docData is now in JSON format after using .lean()
            amount: docData.fees,
            slotTime,
            slotDate,
            date: Date.now()
        };

        // Save the new appointment
        const newAppointment = new appointmentModel(appointmentData);
        await newAppointment.save();

        // Update the doctor’s slots_booked
        await Doctor.findByIdAndUpdate(docId, { slots_booked });

        // Return success response
        res.json({ success: true, message: 'Appointment Booked' });

    } catch (error) {
        console.error("Error booking appointment:", error);
        res.json({ success: false, error: error.message });
    }
};


const listAppointment = async (req, res) => {

    try {
        const { userId } = req.body;
        const appointments = await appointmentModel.find({ userId }).lean()
        res.json({ success: true, appointments })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

const cancelAppointment = async(req, res) => {
    try {

        const {userId , appointmentId} = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)

        if (appointmentData.userId !== userId ) {
            return res.json({success:false , message: 'Unauthorized action' })
        }

        await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled: true})

        const {docId , slotDate , slotTime} = appointmentData 
        const doctorData = await Doctor.findById(docId)

        let slots_booked = doctorData.slots_booked

        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)

        await Doctor.findByIdAndUpdate(docId , {slots_booked})

        res.json({success:true  , message: 'Appointment Cancelled '})

    }catch(error){
        console.log(error)
        res.json({success:false , message : error.message})
    }
}

// const razorpayInstance = new razorpay({
//     key_id:'' , 
//     key_secret: ' '
// })

// const paymentRazorpay = async (req,res ) =>{

// }


export { registerUser, getProfile, loginUser, updateProfile, bookAppointment, listAppointment , cancelAppointment }