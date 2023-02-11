import { userRepository } from "../repositories/userRepository";
import bcrypt from 'bcrypt';

export class UserService{
    async createUser({res, name, user, password}:any){
        const userExists = await userRepository.findOneBy({user: user})

        if(userExists){
            return res.status(404).json({message: 'There is already a customer registered with that user'})
        }
        
        const hashPassword = await bcrypt.hash(password, 9);

        const newUser = userRepository.create({
            name,
            user,
            password: hashPassword
        })

        await userRepository.save(newUser)
        const {password: _, ...userWithoutPssword} = newUser;
        return res.status(201).json(userWithoutPssword);
    }
}