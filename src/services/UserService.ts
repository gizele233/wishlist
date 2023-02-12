import { userRepository } from "../repositories/userRepository";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class UserService{
    async createUser({res, name, user, password}:any){
        const userExists = await userRepository.findOneBy({user: user})

        if(userExists){
            return res.status(404).send({status: 404, message: 'There is already a customer registered with that user'})
        }
        
        const hashPassword = await bcrypt.hash(password, 9);

        const newUser = userRepository.create({
            name,
            user,
            password: hashPassword
        })

        await userRepository.save(newUser)
        const {password: _, ...userWithoutPssword} = newUser;
        return res.status(201).send(userWithoutPssword);
    }

    async login({res, user, password}:any){
        const userExist = await userRepository.findOneBy({user: user});

        if(!userExist){
            return res.status(404).json({status: 404, message: 'Invalid user or password'})
        }

        const verifyPass = await bcrypt.compare(password, userExist.password);

        if(!verifyPass){
            return res.status(404).json({status: 404, message: 'Invalid user or password'})
        }

        const token = jwt.sign({user_id: userExist.user_id}, process.env.JWT_PASS ?? '', {
            expiresIn: '10h'
        })

        const {password: _, ...userLogin} = userExist
        return {
            user: userLogin,
			token: token,
        }

    }
}