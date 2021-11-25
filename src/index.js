const dotenv = require('dotenv')
const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const addRouter = require('./Routers/add.route');
const { dbConnection } = require('./Models')

dotenv.config();
const app = express();


let server = new http.Server(app);
// db connection
dbConnection()


app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const health = async (req, res) => {
    res.json({
      message: "working",
      env: process.env.NODE_ENV,
      headers: req.headers,
    });
  };
  


app.get("/", health);
app.use("/add",addRouter)

module.exports = server
