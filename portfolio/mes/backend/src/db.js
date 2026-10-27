const { Sequelize } = require('sequelize');
require('dotenv').config();

// Sequelize와 오라클 연동 설정
const sequelize = new Sequelize(
    process.env.DB_NAME || 'XE', // 서비스명 또는 SID
    process.env.DB_USER || 'MES_USR',
    process.env.DB_PASSWORD || '1234',
    {
        host: '127.0.0.1',
        port: 1521,
        dialect: 'oracle',
        logging: false, // 쿼리 로그를 보려면 true로 변경
        dialectOptions: {
            // 필요시 추가 옵션 설정 가능
        }
    }
);

module.exports = sequelize;