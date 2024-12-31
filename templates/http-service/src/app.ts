import express from "express";
import { middleware } from "./middleware";
import router from "./router";

const PORT = 3000;
const server = express();

server.use(middleware);
server.use("/api/example", router);

server.listen(PORT, () => {
    console.log(`server started. listening on port ${PORT}...`);
});
