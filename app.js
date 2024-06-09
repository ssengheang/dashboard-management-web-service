const express = require("express");
const cookieParser = require('cookie-parser')
const app = express();
const Sequelize = require('sequelize');
const dbConfig = require('./sequelize/config/config');
require("dotenv").config();

//import module
const roleRouter = require("./src/routers/v0/role.js");
const permissionRouter = require("./src/routers/v0/permission.js");
const userRouter = require("./src/routers/v0/user.js");
const authRouter = require("./src/routers/v0/authentication.js");
const clientLogRouter = require("./src/routers/v0/client_logs.js");
const appFunctionRouter = require("./src/routers/v0/app_function.js");
const appFunctionStatusRouter = require("./src/routers/v0/app_function_status.js");

// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use("/v0", authRouter);
app.use("/v0", roleRouter);
app.use("/v0", permissionRouter);
app.use("/v0", userRouter);
app.use("/v0", clientLogRouter);
app.use("/v0", appFunctionRouter);
app.use("/v0", appFunctionStatusRouter);


// Check DB Connection

const PORT = process.env.PORT;
const conf = dbConfig.development;

const sequelize = new Sequelize(
  conf.database,
  conf.username,
  conf.password,
  {
    host: conf.host,
    dialect: "postgres",
    operatorsAliases: 0,
    logging: 0
  }
);

sequelize.sync();

(async () => {
  try {
    await sequelize.authenticate(); 
    console.log("Database connection setup successfully!");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
  } catch (error) {
    console.log("Unable to connect to the database", error);
  }
})();
