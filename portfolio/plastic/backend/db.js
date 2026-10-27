const { DataSource } = require("typeorm");

const AppDataSource = new DataSource({
    type: "oracle",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT) || 1521,
    username: process.env.DB_USER || "PLASTIC_USR",
    password: process.env.DB_PASSWORD || "1234",
    sid: process.env.DB_SID || "XE", // 또는 serviceName 사용 가능
    synchronize: false, // 실제 DB 테이블과 수동 매칭하므로 false 권장
    logging: true,
    entities: [
        __dirname + "/src/entity/**/*.js"
    ],
});

module.exports = AppDataSource;