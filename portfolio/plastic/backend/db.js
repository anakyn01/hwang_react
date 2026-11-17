const { DataSource } = require("typeorm");

const AppDataSource = new DataSource({
    type:"better-sqlite3",
    database:"database.sqlite",
    synchronize:true,
    logging:false,
    entities:[
        __dirname + "/src/entity/**/*.js"
    ]
});

module.exports = AppDataSource;

/* const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT) || 3306,
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "1234",
    database: process.env.DB_NAME || "plastic_db",
   sid: process.env.DB_SID || "XE", // 또는 serviceName 사용 가능
    synchronize: true, // 실제 DB 테이블과 수동 매칭하므로 false 권장
    logging: true,
    entities: [ */
