import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorHandler from "./utils/errorHandler.js";
import corsOptions from "./config/corsOptions.js";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// middlewares
app.use(cors(corsOptions));
app.use(cookieParser());

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "..", "public")));

// routes import
import userRouter from "./routes/user.routes.js";

// routes
app.get("/", (req, res) => {
  res.status(200).send("hello world!");
});

app.use("/api/v1/users", userRouter);

// default error handler
app.use(errorHandler);

export default app;
