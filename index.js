import express from 'express' 
import router from './Router/router.js'
import sequelize from './config/dbconfig.js'
const app = express()
const port = process.env.PORT || 4000
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/employee', router);

(async function server(){
   try {
          await sequelize.authenticate();
          console.log('Connection has been established successfully.');
          await sequelize.sync({ alter: true });
          app.listen(port, ()=>{
              console.log(`Server is running on port ${port}`);
          })
      } catch (error) {
          console.error(`Error in DB connection: ${error.message}`);
      }
})()