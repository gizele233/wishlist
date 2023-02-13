"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// const express = require ('./express');
// const Connection = require('./connection');
const connection_1 = require("./connection");
const router = require('./router');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');
connection_1.Connection.initialize().then(() => {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));
    app.use(router);
    return app.listen(process.env.PORT);
});
