"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connection_1 = require("./connection");
const router = require('./router');
connection_1.Connection.initialize().then(() => {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use(router);
    return app.listen(process.env.PORT);
});
