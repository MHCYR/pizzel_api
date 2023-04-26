import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const validateUser = [
  body("email").trim().isEmail(),
  body("password").trim().isLength({ min: 8 }).isAlphanumeric(),
  body("name").optional().isString().isLength({ max: 10 }),
];

export const handleIputErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  } else {
    next();
  }
};
