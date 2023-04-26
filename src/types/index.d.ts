export {};

declare global {
  namespace Express {
    interface Request {
      headers: {
        authorization: string;
      };
      user: string;
    }
  }
}
