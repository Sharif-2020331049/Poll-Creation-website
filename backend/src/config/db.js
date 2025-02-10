import mongoose from "mongoose";

const connecDB = async ()=>{
     try {
      const connectionInstance = await mongoose.connect(`${process.env.MONGODBURL}/PollCreation`);

      console.log("MongoDB connected successfully! ");
      
        
     } catch (error) {
        console.log(`Error occurred while connecting with database!`);
        process.exit(1)
        
     }
}

export { connecDB }