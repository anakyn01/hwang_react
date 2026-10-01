require("dotenv").config();
require("reflect-metadata");
const { DataSource} = require("typeorm");
const Member = require("./src/entity/Member");
const FooterSettings = require("./src/entity/FooterSettings");
const Consult = require("./src/entity/Consult");
const NavSetting = require("./src/entity/NavSetting");
const MainVisual = require("./src/entity/MainVisual");
const ToneSetting = require("./src/entity/ToneSetting");
const PopupSetting = require("./src/entity/PopupSetting");
const Popup = require("./src/entity/Popup");
const Category = require("./src/entity/Category");

const AppDataSource = new DataSource({
    type:"oracle",
    host:"localhost",
    port:1521,
    username:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    connectString:process.env.DB_CONNECTION_STRING,
    database:"XEPDB1",
    synchronize:false,
    //로깅 최적화 (운영환경이 아닐때만 true)
    logging:process.env.NODE_ENV !== 'production',
    entities:[Member, FooterSettings, Consult, NavSetting, MainVisual, ToneSetting, PopupSetting, Popup, Category],
    extra:{
        poolMin:2, poolMax:10, poolIncrement:1
    }
});

module.exports = AppDataSource;