//server>index.ts
import "dotenv/config";
import express from "express";
import cors from "cors";
import { logger } from "./middelware/logger.js";
import routes from "./routes/routes.js";
import { notFoundHandler } from "./middelware/notFoundHandler.js";
import { errorHandler } from "./middelware/errorHandler.js";
import { errors } from "celebrate";

export function createServer() {
  const app = express();

  // Middleware
  app.use(logger);
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(routes);

  app.use(notFoundHandler);
  app.use(errorHandler);
  app.use(errors());

  //? Example API routes
  // app.get("/api/ping", (_req, res) => {
  //   const ping = process.env.PING_MESSAGE ?? "ping";
  //   res.json({ message: ping });
  // });

  return app;
}
