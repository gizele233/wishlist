import { Request, Response } from "express";
import { UserService } from "../services/UserService";

export class UserController{
    async createUser(req: Request, res: Response){
        const {name, user, password} = req.body;

        try{
            const createUserService = new UserService();
        
            const createUser = await createUserService.createUser({res, name, user, password});
            return res.status(201).json(createUser)
            
        } catch(error){
            console.log(error)
            return res.status(500).json({message: 'Internal Server Error'})
        }

    }
}