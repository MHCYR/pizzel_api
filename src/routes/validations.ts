import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

/*
 * This middleware checks for input errors
 * errors depends on the validation rules set in the validateUser and validateLogin arrays
 */
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

/*
 * User creation validation rules
 * email must be a valid email
 * password must be at least 8 characters long and contain only letters and numbers
 * name is optional and must be a string with a maximum length of 10 characters
 */
export const validateUser = [
  body("email").trim().isEmail(),
  body("password").trim().isLength({ min: 8 }).isAlphanumeric(),
  body("name").optional().isString().isLength({ max: 10 }),
];

/*
 * User login validation rules
 * email must be a valid email
 * password must be at least 8 characters long and contain only letters and numbers
 */

export const validateLogin = [
  body("email").trim().isEmail(),
  body("password").trim().isLength({ min: 8 }).isAlphanumeric(),
];
