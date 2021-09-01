import mongoose from "mongoose";
import log from "../logger";

const connect = () => {
  return mongoose
    .connect(process.env.DBURI as string)
    .then(() => {
      log.info("Database Connected");
    })
    .catch((err) => {
      log.error("db error", err);
      process.exit(1);
    });
};

export default connect;
