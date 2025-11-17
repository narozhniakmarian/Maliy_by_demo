//server>routes>demo.ts
import { RequestHandler } from "express";
import { Response } from "../type/apiType";

export const handleDemo: RequestHandler = (req, res) => {
  const response: Response = {
    message: "Hello from Express server",
  };
  res.status(200).json(response);
};
