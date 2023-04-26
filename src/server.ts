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

const app: Express = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // creates an object from the request url

app.post("/user", validateUser, handleIputErrors, createUser);
app.post("/login", validateLogin, handleIputErrors, loginUser);
app.use("/api", protect, router);

export default app;
