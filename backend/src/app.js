import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
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

app.use(morgan("dev"));

// routes import
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import categoryRouter from "./routes/category.routes.js";
import productRouter from "./routes/product.routes.js";
import cartRouter from "./routes/cart.routes.js";
import locationRouter from "./routes/location.routes.js";

// routes
app.get("/", (req, res) => {
  res.status(200).send("hello world!");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/locations", locationRouter);

// default error handler
app.use(errorHandler);

export default app;
