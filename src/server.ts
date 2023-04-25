import express, { Express } from "express";
import morgan from "morgan";
import { createUser, loginUser } from "./handlers/user";

const app: Express = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // creates an object from the request url

app.post("/user", createUser);
app.post("/login", loginUser);

export default app;
