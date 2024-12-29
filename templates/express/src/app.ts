import express from "express";
import { middleware } from "./middleware";
import router from "./router";

const PORT: number = 3000;

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(middleware);
server.use("/api/example", router);

server.listen(PORT, () => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}]: server started`);
});
