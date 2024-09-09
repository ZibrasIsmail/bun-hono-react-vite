import { Hono } from "hono";
import { logger } from "hono/logger";
import { expenseRoute } from "./routes/expenseRoute";
import { authRoutes } from "./routes/auth";
const app = new Hono();

app.use(logger());

const apiRoutes = app
  .basePath("/api")
  .route("/expenses", expenseRoute)
  .route("/", authRoutes);

// app.get("/assets/*", async (c) => {
//   const path = c.req.path;
//   const filePath = `./frontend/dist${path}`;
//   console.log(`Attempting to serve: ${filePath}`);

//   try {
//     const file = Bun.file(filePath);
//     const exists = await file.exists();
//     console.log(`File exists: ${exists}`);

//     if (!exists) {
//       console.log(`File not found: ${filePath}`);
//       return c.text(`File not found: ${path}`, 404);
//     }

//     const mimeType = getMimeType(filePath);
//     console.log(`Serving ${filePath} with MIME type: ${mimeType}`);
//     return new Response(file, {
//       headers: { "Content-Type": mimeType },
//     });
//   } catch (error) {
//     console.error(`Error serving ${filePath}:`, error);
//     return c.text(`Error serving file: ${path}`, 500);
//   }
// });

// app.get("*", async (c) => {
//   if (c.req.path.startsWith("/api")) {
//     return c.json({ error: "Not Found" }, 404);
//   }

//   console.log(`Serving index.html for path: ${c.req.path}`);
//   try {
//     const content = await Bun.file("./frontend/dist/index.html").text();
//     return c.html(content);
//   } catch (error) {
//     console.error("Error serving index.html:", error);
//     return c.text("Error serving index.html", 500);
//   }
// });

// function getMimeType(path: string): string {
//   if (path.endsWith(".js")) return "application/javascript";
//   if (path.endsWith(".css")) return "text/css";
//   if (path.endsWith(".html")) return "text/html";
//   if (path.endsWith(".png")) return "image/png";
//   if (path.endsWith(".jpg") || path.endsWith(".jpeg")) return "image/jpeg";
//   if (path.endsWith(".svg")) return "image/svg+xml";
//   return "application/octet-stream";
// }

export { app };
export type ApiRoutes = typeof apiRoutes;
