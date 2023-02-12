"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userRepository_1 = require("../repositories/userRepository");
const authMiddleware = async (req, res, next) => {
    var _a;
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            return res.status(401).json({ status: 401, message: "Not authorized" });
        }
        const token = authorization.split(' ')[1];
        const { id } = jsonwebtoken_1.default.verify(token, (_a = process.env.JWT_PASS) !== null && _a !== void 0 ? _a : '');
        const userExist = await userRepository_1.userRepository.findOneBy({ user_id: id });
        if (!userExist) {
            return res.status(401).json({ status: 401, message: "Not authorized" });
        }
        next();
    }
    catch (e) {
        console.log(e);
        return res.status(500).send({ message: "Internal Error", error: e });
    }
};
exports.authMiddleware = authMiddleware;
