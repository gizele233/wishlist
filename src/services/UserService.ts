import { userRepository } from "../repositories/userRepository";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class UserService{
    async createUser({name, user, password}:any){
        const userExists = await userRepository.findOneBy({user: user})

        if(userExists){
            return {
                status: 404, 
                message: {
                    status: 404,
                    message: 'There is already a customer registered with that user'
                }
            };
        }
        
        const hashPassword = await bcrypt.hash(password, 9);

        const newUser = userRepository.create({
            name,
            user,
            password: hashPassword
        })

        await userRepository.save(newUser)
        const {password: _, ...userWithoutPssword} = newUser;
        return {status: 201, message: userWithoutPssword};
    }

    async login({user, password}:any){
        const userExist = await userRepository.findOneBy({user: user});

        if(!userExist){
            return {
                status: 404, 
                message: {
                    status: 404,
                    message: 'Invalid user or password'
                }
            }; 
        }

        const verifyPass = await bcrypt.compare(password, userExist.password);

        if(!verifyPass){
            return {
                status: 404, 
                message: {
                    status: 404,
                    message: 'Invalid user or password'
                }
            };
        }

        const token = jwt.sign({user_id: userExist.user_id}, process.env.JWT_PASS ?? '', {
            expiresIn: '10h'
        })

        const {password: _, ...userLogin} = userExist
        return {
            status: 201,
            message:{
                user: userLogin,
			    token: token, 
            }
        };
    }
}