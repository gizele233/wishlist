import express from 'express';
import {Connection} from './connection';
const router = require('./router');


Connection.initialize().then(() => {
    const app = express();
    app.use(express.json());
    app.use(router);
    
    return app.listen(process.env.PORT);
})