import { Request, Response } from "express";
import { createUser } from "../service/user.service";
import { omit } from "lodash";
import log from "../logger";

const registerUser = async (req: Request, res: Response) => {
  try {
    const user = await createUser(req.body);
    return res.send(omit(user.toJSON(), "password"));
  } catch (error: any) {
    log.error(error);
    return res.status(409);
  }
};

export { registerUser };
