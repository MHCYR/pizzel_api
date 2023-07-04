import prisma from "../db";
import { hashPassword, createJWT, comparePassword } from "../modules/auth";
import { Request, Response } from "express";
import { matchedData } from "express-validator";

/*
 * Open endpoints
 * Allows new users to register
 * Request must contain:
 * @param {string} email - user's email
 * @param {string} password - user's password
 * @param {string} name[optional] - user's name
 * @returns {string} token - JWT (required to access protected endpoints)
 */
export const createUser = async (req: Request, res: Response) => {
  const { email, password, name } = matchedData(req); // retrieve validated data from the request object
  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: await hashPassword(password), // hash the password before storing it in the database
    },
  });

  const token = createJWT(user);
  res.json({ token });
};

/*
 * Open endpoints
 * Allows existing users to login
 * Request must contain:
 * @param {string} email - user's email
 * @param {string} password - user's password
 * @returns {string} token - JWT (required to access protected endpoints)
 */
export const loginUser = async (req: Request, res: Response) => {
  const data = matchedData(req); // retrieve validated data from the request object
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
