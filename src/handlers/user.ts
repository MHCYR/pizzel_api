import prisma from "../db";
import { hashPassword, createJWT, comparePassword } from "../modules/auth";
import { Request, Response } from "express";
import { matchedData } from "express-validator";

export const createUser = async (req: Request, res: Response) => {
  const { email, password, name } = matchedData(req);
  if (!email || !password) {
    res.status(400).json({ error: "Please provide an email and password" });
    return;
  }
  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: await hashPassword(password),
    },
  });

  const token = createJWT(user);
  res.json({ token });
};

export const loginUser = async (req: Request, res: Response) => {
  const data = matchedData(req);
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!user) {
    res.status(400).json({ error: "User not found" });
    return;
  }

  const valid = await comparePassword(data.password, user.password);
  if (!valid) {
    res.status(400).json({ error: "Invalid password" });
    return;
  }
  res.status(200).json({ token: createJWT(user) });
};
