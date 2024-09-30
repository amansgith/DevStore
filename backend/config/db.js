import mongoose from "mongoose";


// This function is used to connect to the MongoDB database
export const connDB=async ()=>{
    try{
        // this 
        const conn=await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }catch(err){
        console.error(`Error: ${err.message}`);
        process.exit(1); // 1 code means a failure and 0 means success
    }

}