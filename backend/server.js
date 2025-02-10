import { app } from "./src/App.js";
import dotenv from 'dotenv'
import { connecDB } from "./src/config/db.js";



dotenv.config({
    path: './.env'
})

connecDB()
.then(
    ()=>{
        app.listen(process.env.PORT, ()=>{
            console.log('Server is running at PORT 8000');
            
        })
    }
)
.catch(
    (err)=>{
        console.log('MongoDB connection failed !!! ', err);
        
    }
)
