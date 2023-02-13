import express from 'express';
import {Connection} from './connection';
const router = require('./router');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');

Connection.initialize().then(() => {
    const app = express();
    app.use(express.json());
    app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
    app.use(router);

    return app.listen(process.env.PORT);
   
})

