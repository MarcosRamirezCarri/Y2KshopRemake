import { Request, Response } from "express";
import UserModel from "../../models/User";
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'JWT_secret'

const loginUser = async(req: Request, res: Response) =>{
    const {email, password} = req.body
    
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }
    try {
        const User: any = UserModel.findOne({where:{email}})
        if(!User){
            res.status(400).json({ error: 'Invalid email or password' })
        }
        const token = jwt.sign({ userId: User.id, email: User.email }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export default loginUser;