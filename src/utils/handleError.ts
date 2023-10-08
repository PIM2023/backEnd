import { debug } from "console";
import { Response } from "express";

export const handleErrorResponse = (
  res: Response,
  message = "Internal server error",
  code = 500
) => {
  debug("Error - ", message);
  res.status(code);
  res.send({ message: message });
};
