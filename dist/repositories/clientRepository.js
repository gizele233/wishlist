"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = require("../connection");
const Client_1 = require("../entities/Client");
exports.clientRepository = connection_1.Connection.getRepository(Client_1.Client);
