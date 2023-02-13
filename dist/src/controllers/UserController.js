"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const UserService_1 = require("../services/UserService");
class UserController {
    async createUser(req, res) {
        const { name, user, password } = req.body;
        try {
            const createUserService = new UserService_1.UserService();
            const createUser = await createUserService.createUser({ name, user, password });
            return res.status(createUser.status).json(createUser.message);
        }
        catch (error) {
            return res.status(500).send({ message: 'Internal Server Error' });
        }
    }
    async login(req, res) {
        const { user, password } = req.body;
        try {
            const loginUserService = new UserService_1.UserService();
            const loginUser = await loginUserService.login({ user, password });
            return res.status(loginUser.status).json(loginUser.message);
        }
        catch (error) {
            console.log(error);
            return res.status(500).send({ message: 'Internal Server Error' });
        }
    }
}
exports.UserController = UserController;
