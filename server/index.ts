import { app } from "./app";

const server = Bun.serve({
  fetch: app.fetch,
  port: 3000,
});

console.log(`Server is running on ${server.hostname}:${server.port}`);
