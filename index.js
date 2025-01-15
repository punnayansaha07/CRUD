import express from 'express'
import 'dotenv/config'
import connectDB from './dbConnection.js' 
import router from './Router/router.js'
const app = express()
const port = process.env.PORT || 4000
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 
app.use('/api/employee', router);
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})