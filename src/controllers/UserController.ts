import { Request, Response } from "express";
import { UserService } from "../services/UserService";

export class UserController{
    async createUser(req: Request, res: Response){
        const {name, user, password} = req.body;

        try{
            const createUserService = new UserService();
        
            const createUser = await createUserService.createUser({res, name, user, password});
            return res.status(201).send(createUser)
            
        } catch(error){
            console.log(error)
            return res.status(500).send({message: 'Internal Server Error'})
        }

    }

    async login(req: Request, res: Response){
        const {user, password} = req.body;

        try{
            const loginUserService = new UserService();
        
            const loginUser = await loginUserService.login({res, user, password});
            return res.status(201).send(loginUser)
            
        } catch(error){
            console.log(error)
            return res.status(500).send({message: 'Internal Server Error'})
        }
    }
}