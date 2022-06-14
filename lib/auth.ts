import jwt from "jsonwebtoken";
import prisma from './prisma';
import {NextApiRequest, NextApiResponse} from 'next';
export const validateRoute = (handler) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        // const {process.env.TOKEN_NAME: token} = req.cookies;
        const token = req.cookies[process.env.TOKEN_NAME];
        if(token) {
            let user;
            try{
                const {id} = jwt.verify(token, process.env.JWT_SECRET)
                user = await prisma.user.findUnique({
                    where: {
                        id
                    }
                })
                if(!user){
                    throw new Error('Not Real User')
                }
            }catch(e){
                res.status(401).json({error: "Unauthorized"})
            }
        }

    }
}
