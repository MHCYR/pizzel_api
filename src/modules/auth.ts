import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Request, Response, NextFunction } from "express";
import { MyJwtPayload } from "../types";

/*
 ***************************************************************************************
 * Authentication functions                                                            *
 * These are utility functions that are used in the handlers to create and login users *
 ***************************************************************************************
 */

/*
 * Compare the password entered by the user at login to the hashed password stored in the database
 * @param {string} password - the password entered by the user at login
 * @param {string} hash - the hashed password stored in the database
 * @returns {Promise<boolean>} - returns a promise that resolves to a boolean
 */
export const comparePassword = (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};

/*
 * Hash the password entered by the user at registration
 * @param {string} password - the password entered by the user at registration
 * @returns {Promise<string>} - returns a promise that resolves to a string
 */
export const hashPassword = (password: string) => {
  return bcrypt.hash(password, 5);
};

/*
 * Create a JWT for the user
 * @param {object} user - the user object
 * @param {number} user.id - the user id
 * @param {string} user.email - the user email
 * @returns {string} - returns a JWT
 */
export const createJWT = (user: any) => {
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET as string
  );
  return token;
};

/*
 * Middleware to protect endpoints
 * adds the user object to the request object
 * @param {object} req - the request object
 * @param {object} req.headers - the request headers
 * @param {string} req.headers.authorization - the authorization header
 * @param {object} res - the response object
 * @param {object} next - the next middleware function
 * @returns {void}
 */
export const protect = (req: Request, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401).json({ error: "You are not authorized" });
    return;
  }

  const token = bearer.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "You are not authorized" });
    return;
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = user as MyJwtPayload;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "not valid token" });
    return;
  }
};
