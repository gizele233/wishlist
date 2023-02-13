"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const userRepository_1 = require("../repositories/userRepository");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserService {
    async createUser({ name, user, password }) {
        const userExists = await userRepository_1.userRepository.findOneBy({ user: user });
        if (userExists) {
            return {
                status: 404,
                message: {
                    status: 404,
                    message: 'There is already a customer registered with that user'
                }
            };
        }
        const hashPassword = await bcrypt_1.default.hash(password, 9);
        const newUser = userRepository_1.userRepository.create({
            name,
            user,
            password: hashPassword
        });
        await userRepository_1.userRepository.save(newUser);
        const { password: _, ...userWithoutPssword } = newUser;
        return { status: 201, message: userWithoutPssword };
    }
    async login({ user, password }) {
        var _a;
        const userExist = await userRepository_1.userRepository.findOneBy({ user: user });
        if (!userExist) {
            return {
                status: 404,
                message: {
                    status: 404,
                    message: 'Invalid user or password'
                }
            };
        }
        const verifyPass = await bcrypt_1.default.compare(password, userExist.password);
        if (!verifyPass) {
            return {
                status: 404,
                message: {
                    status: 404,
                    message: 'Invalid user or password'
                }
            };
        }
        const token = jsonwebtoken_1.default.sign({ user_id: userExist.user_id }, (_a = process.env.JWT_PASS) !== null && _a !== void 0 ? _a : '', {
            expiresIn: '10h'
        });
        const { password: _, ...userLogin } = userExist;
        return {
            status: 201,
            message: {
                user: userLogin,
                token: token,
            }
        };
    }
}
exports.UserService = UserService;
