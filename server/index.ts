//server>index.ts
import "dotenv/config";
import express from "express";
import cors from "cors";
import { logger } from "./middleware/logger.js";
import routes from "./routes/routes.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { errors } from "celebrate";
import cookieParser from "cookie-parser";
import helmet from "helmet";

export function createServer() {
  const app = express();

  // Middleware
  app.use(logger);
  // app.use(
  //   cors({
  //     origin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
  //   }),
  // );
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(helmet());
  app.use(cookieParser());

  // Routes are mounted by Vite middleware at the `/api` prefix already
  // so register routes at root here (requests will arrive under `/api`).
  app.use('/', routes);

  app.use(notFoundHandler);
  app.use(errors());
  app.use(errorHandler);

  //? Example API routes
  // app.get("/api/ping", (_req, res) => {
  //   const ping = process.env.PING_MESSAGE ?? "ping";
  //   res.json({ message: ping });
  // });

  return app;
}
