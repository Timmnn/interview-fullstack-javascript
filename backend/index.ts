import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(
   cors({
      origin: process.env.CLIENT_HOST,
   })
);

app.get("/", (req: Request, res: Response) => {
   res.send("Hello World");
});

app.listen(port, () => {
   console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
