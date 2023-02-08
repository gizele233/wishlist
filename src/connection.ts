import { DataSource } from 'typeorm';
import 'reflect-metadata';

const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, './.env') })

const port = process.env.MYSQL_PORT as number | undefined;

export const Connection = new DataSource({
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: port,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    entities: [`${__dirname}/**/entities/*.{ts,js}`],
    migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
    
});

