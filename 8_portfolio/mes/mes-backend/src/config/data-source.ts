import 'reflect-metadata';
import {DataSource} from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

export const AppDatasource = new DataSource({
    type:'oracle',
    host:process.env.DB_HOST || 'localhost',
    port:Number(process.env.DB_PORT) || 1521,
    username:process.env.DB_USER as string,
    password:process.env.DB_PASSWORD as string,

    serviceName: process.env.DB_SERVICE_NAME || 'FREEPDB1',
    synchronize:true,
    logging:true,
    entities:[__dirname + '/../entities/**/*.{js,ts}'],
    extra:{
        poolMin:2,
        poolMax:10,
        poolIncrement:1,
    },
});