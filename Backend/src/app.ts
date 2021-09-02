import express from "express";
import log from "./logger";
import connect from "./db/connect";
import dotenv from "dotenv";
import UserRoutes from "./routes/user.route";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/user", UserRoutes);

app.listen(process.env.PORT, () => {
  log.info(
    `Server started in ${process.env.NODE_ENV as string} and is running on ${
      process.env.PORT
    }`
  );

  connect();
});
