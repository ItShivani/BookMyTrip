import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose" 
import authRoute from "./routes/auth.js"
import hotelsRoute from "./routes/hotels.js"
import roomsRoute from "./routes/rooms.js"
import usersRoute from "./routes/users.js"
import cookieParser from "cookie-parser"
const app = express()

dotenv.config()
const connect = async () => {
    try{
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to MongoDB")
    }catch(error){
        throw error;
    }
};

mongoose.connection.on("disconnected" , ()=>{
    console.log("mongoDB disconnected");
})

app.use(cookieParser())
app.use(express.json()) //in our api request we can use json body  
//Middleware 
//these are our routes
app.use("/api/auth",authRoute);
app.use("/api/users",usersRoute);
app.use("/api/hotels",hotelsRoute);
app.use("/api/rooms",roomsRoute);

//error handing 
app.use((err,req,res,next)=> { //takes all parameters in this order 
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong"
    return res.status(errorStatus).json(errorMessage)
})

app.listen(8800,()=>{
    connect();
    console.log("Connected to server!");
})