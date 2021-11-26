 
const mongoose = require('mongoose')



  exports.dbConnection = () => {
     let MongoConnectionURL = ' ';    
     if (process.env.NODE_ENV_SET === `production` ? MongoConnectionURL = process.env.DB_LIVE_URL : MongoConnectionURL = process.env.DB_LOCAL_URL)
     console.log("Db connected",MongoConnectionURL);
      mongoose
     .connect(MongoConnectionURL)
     .then((res) => {
         console.log("Mongodb connected..");
     })
     .catch(err => {
         console.log(err);
         process.exit(1)
     });
  }
 
