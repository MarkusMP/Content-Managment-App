import express from "express";
import log from "./logger";
import connect from "./db/connect";
import dotenv from "dotenv";
import UserRoutes from "./routes/user.route";
import SessionRoutes from "./routes/session.route";
import BoardRoutes from "./routes/board.route";
import ListRoutes from "./routes/list.route";
import CardRoutes from "./routes/card.route";
import deserializeUser from "./middleware/DeserializeUser";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(deserializeUser);

app.use("/api/user", UserRoutes);
app.use("/api/sessions", SessionRoutes);
app.use("/api/board", BoardRoutes);
app.use("/api/list", ListRoutes);
app.use("/api/card", CardRoutes);

app.listen(process.env.PORT, () => {
  log.info(
    `Server started in ${process.env.NODE_ENV as string} and is running on ${
      process.env.PORT
    }`
  );

  connect();
});
