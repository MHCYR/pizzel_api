import { JwtPayload } from "jsonwebtoken";

export interface MyJwtPayload extends JwtPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      headers: {
        authorization: string;
      };
      user: MyJwtPayload;
    }
  }
}
