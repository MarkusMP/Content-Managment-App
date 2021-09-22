import { Request, Response } from "express";
import { createUser } from "../service/user.service";
import { omit } from "lodash";
import log from "../logger";
import { createSession, createAccessToken } from "../service/session.service";
import { sign } from "../utils/jwt.utils";

const registerUser = async (req: Request, res: Response) => {
  try {
    const user = await createUser(req.body);

    const session = await createSession(user._id, req.get("user-agent") || "");

    // create access token
    const accessToken = createAccessToken({
      user,
      session,
    });

    // create refresh token
    const refreshToken = sign(session, {
      expiresIn: "30d", // 1 year
    });

    const userData = omit(user.toJSON(), "password");

    // send refresh & access token back
    return res.json({ user: userData, refreshToken, accessToken });
  } catch (error: any) {
    log.error(error);
    return res.status(409);
  }
};

export { registerUser };
