import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });
    if (!email || !password) {
    res.status(400).send("Email and password are required");
    return;
  }
    if (user && bcrypt.compareSync(password, user.password)) {
        
        const token = jwt.sign(
            { email: user.email, userId: user.id, time: Date.now() },
            process.env.JWT_SECRET,
            { expiresIn: process.env.EXPIRES_IN }
        );
        res.setHeader("Set-Cookie", cookie.serialize(process.env.TOKEN_NAME, token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: parseInt(process.env.COOKIE_MAX_AGE),
            path: '/',
            sameSite: 'lax',
        }));
    res.status(200).json({ user });
    }else {
        res.status(401).json({error: "Invalid credentials"})
    }
};