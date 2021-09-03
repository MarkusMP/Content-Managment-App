import jwt from "jsonwebtoken";

export const sign = (object: Object, options?: jwt.SignOptions | undefined) => {
  return jwt.sign(object, process.env.PRIVATEKEY as string, options);
};

export const decode = (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.PRIVATEKEY as string);

    return { valid: true, expired: false, decoded };
  } catch (error: any) {
    return {
      valid: false,
      expired: (error.message = "jwt expired"),
      decoded: null,
    };
  }
};
