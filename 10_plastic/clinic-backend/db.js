require("dotenv").config();
require("reflect-metadata");
const { DataSource} = require("typeorm");
const Member = require("./src/entity/Member");

const AppDataSource = new DataSource({
    type:"oracle",
    host:"localhost",
    port:1521,
    username:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    connectString:process.env.DB_CONNECTION_STRING,
    database:"XEPDB1",
    synchronize:true,
    //로깅 최적화 (운영환경이 아닐때만 true)
    logging:process.env.NODE_ENV !== 'production',
    entities:[Member],
    extra:{
        poolMin:2, poolMax:10, poolIncrement:1
    }
});

module.exports = AppDataSource;