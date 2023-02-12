import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { userRepository } from "../repositories/userRepository";

type JwtPayload = {
	id: number
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) =>{
    try{
		const { authorization } = req.headers

		if (!authorization) {
			return res.status(401).send({message: "Not authorized"});
		}

		const token = authorization.split(' ')[1]

		const { id } = jwt.verify(token, process.env.JWT_PASS ?? '') as JwtPayload
		const userExist	 = await userRepository.findOneBy({ user_id: id });

		if (!userExist) {
			return res.status(401).send({message: "Not authorized"});
		}

		next()
	} catch (e) {
		console.log(e)
		return res.status(500).send({message: "Internal Error", error: e})
	}
}