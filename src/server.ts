import express, { Express } from "express";
import morgan from "morgan";

const app: Express = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // creates an object from the request url

export default app;
