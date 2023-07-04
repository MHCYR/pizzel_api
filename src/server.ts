import express, { Express } from "express";
import morgan from "morgan";
import { createUser, loginUser } from "./handlers/user";
import router from "./routes/router";
import {
  handleIputErrors,
  validateUser,
  validateLogin,
} from "./routes/validations";
import { protect } from "./modules/auth";
import cors from "cors";

/*
 * Express app configuration
 */
const app: Express = express();
app.use(morgan("dev")); // logs requests to the console
app.use(express.json()); // creates an object from the request body
app.use(express.urlencoded({ extended: true })); // creates an object from the request url
app.use(cors()); // allows requests from other origins

/*
 * Open Endpoints
 * These endpoints can be accessed by anyone
 * Open endpoints do not require authentication
 */
app.post("/user", validateUser, handleIputErrors, createUser);
app.post("/login", validateLogin, handleIputErrors, loginUser);

/*
 * Protected Endpoints
 * These endpoints can only be accessed by authenticated users
 * Protected endpoints require a valid JWT to be included in the header of the request
 * The JWT is generated when a user logs in or registers and is returned in the response
 */
app.use("/api", protect, router);

export default app;
