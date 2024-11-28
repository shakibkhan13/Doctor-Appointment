import express from 'express'
import cors from'cors'
import 'dotenv/config.js'
import connectDB from './config/mongodb.js';


const app = express()
const port = process.env.PORT || 5000
connectDB()

app.use(express.json())
app.use(cors())


app.get('/',(req,res)=>{
  res.send('API Working')
})


app.listen(port , ()=>console.log("server Started",port))
