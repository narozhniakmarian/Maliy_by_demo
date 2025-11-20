//server>node-build.ts
import path from "path";
import { createServer } from "./index.ts";
import * as express from "express";
import { connectMongoDB } from "./db/connectMongoDB.js";

// //! тимчасове рішення
// import fs from "fs";

// let clientPort = "8080";
// try {
//   clientPort = fs.readFileSync(".vite-port", "utf-8");
// } catch {
//   console.warn("⚠️ Could not read .vite-port, falling back to 8080");
// }

// //!

const app = createServer();
const port = process.env.PORT || 3000;

// In production, serve the built SPA files
const __dirname = import.meta.dirname;
const distPath = path.join(__dirname, "../spa");

// Serve static files
app.use(express.static(distPath));

// Handle React Router - serve index.html for all non-API routes
app.use((req, res, next) => {
  if (req.method === "HEAD" || req.method === "GET") {
    if (req.path.startsWith("/api/") || req.path.startsWith("/health")) {
      return res.status(404).json({ error: "API endpoint not found" });
    }

    res.sendFile(path.join(distPath, "index.html"));
  } else {
    next();
  }
});

await connectMongoDB();
app.listen(port, () => {
  console.log(`🚀 Fusion Starter server running on port ${port}`);
  // console.log(`📱 Frontend: http://localhost:${clientPort}`);
  console.log(
    `🌍 API running at: ${process.env.NODE_ENV === "production" ? "https://your-backend-name.onrender.com" : `http://localhost:${port}`}`,
  );
});

// // Graceful shutdown
// process.on("SIGTERM", () => {
//   console.log("🛑 Received SIGTERM, shutting down gracefully");
//   process.exit(0);
// });

// process.on("SIGINT", () => {
//   console.log("🛑 Received SIGINT, shutting down gracefully");
//   process.exit(0);
// });
