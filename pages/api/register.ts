import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cookie from "cookie";
import prisma from "../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  if (!email || !password) {
    res.status(400).send("Email and password are required");
    return;
  }
  let user;
  try {
    user = await prisma.user.create({
      data: {
        email,
        password: await bcrypt.hashSync(password, salt),
      },
    });
  } catch (e) {
    res.status(400).json({ error: "user already exists" });
  }
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
};
