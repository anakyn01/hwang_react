require("dotenv").config();
require("reflect-metadata");
const { DataSource} = require("typeorm");
const User = require("./src/entity/User");

const AppDataSource = new DataSource({
    type:"oracle",
    username:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    connectString:process.env.DB_CONNECTION_STRING,
    synchronize:true,
    logging:true,
    entities:[User],
    extra:{
        poolMin:2, poolMax:10, poolIncrement:1
    }
});

module.exports = AppDataSource;