import express, { Express } from "express";
import morgan from "morgan";
import { createUser, loginUser } from "./handlers/user";
import router from "./routes/router";
import { handleIputErrors, validateUser } from "./routes/validations";

const app: Express = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // creates an object from the request url

app.post("/user", validateUser, handleIputErrors, createUser);
app.post("/login", loginUser);
app.use("/api", router);

export default app;
