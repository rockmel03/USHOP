import dotenv from "dotenv";
import app from "./app.js";
import { Server } from "http";

dotenv.config({
  path: "src/.env",
});

const port = process.env.PORT;

const server = new Server(app);

app.get("/", (req, res) => {
  res.status(200).send("hello world!");
});

server.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
