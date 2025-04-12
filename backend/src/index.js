import "./config/dotenv.config.js";
import { Server } from "http";
import { connectDB } from "./db/index.js";
import app from "./app.js";

const port = process.env.PORT || 3000;

const server = new Server(app);

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("Error: ", error);
      throw error;
    });

    server.listen(port, () =>
      console.log(`server is listening on port ${port}`)
    );
  })
  .catch((error) => {
    console.log("Failed to connect database!", error);
  });
