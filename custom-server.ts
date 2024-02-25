import express from "express";
import next from "next";

const dev = process.env.NODE_ENV !== "production";
const nextServer = next({ dev });
const nextRequestHandler = nextServer.getRequestHandler();

nextServer.prepare().then(() => {
  const server = express();
  server.disable("x-powered-by");

  // Delegate /about page to the custom Express server
  server.get("/about", (req, res) => {
    res.header("Content-Type", "application/json");
    res.header("x-test", "test");
    const data = {
      message: "Hello from custom Express server",
      timestamp: new Date().toISOString(),
    };
    return res.status(200).json(data);
  });

  // Delegate all other routes to the Next.js default server
  server.all("*", (req, res) => {
    return nextRequestHandler(req, res);
  });

  server.listen(3000, (err?: unknown) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});
