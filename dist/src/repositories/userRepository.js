"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = void 0;
const connection_1 = require("../connection");
const User_1 = require("../entities/User");
exports.userRepository = connection_1.Connection.getRepository(User_1.User);
