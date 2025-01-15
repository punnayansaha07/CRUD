import express from 'express'
import 'dotenv/config'
import connectDB from './dbConnection.js' 
import router from './Router/router.js'
import mongoose from "mongoose";
const app = express()
const port = process.env.PORT || 4000
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/employee', router);

(async function server(){
   try {
          const conn = await mongoose.connect(process.env.MONGO_URI);
          console.log(`MongoDB Connected: ${conn.connection.host}`);
          app.listen(port, () => {
            console.log(`Server listening on port ${port}`)
          })
      } catch (error) {
          console.error(`Error in DB connection: ${error.message}`);
          process.exit(1);
      }
})()