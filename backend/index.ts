import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import fs from "fs";
import pg from "pg";

const pg_client = new pg.Client({
   user: "postgres",
   host: "localhost",
   database: "postgres",
   password: "postgres",
   port: 5432,
});

pg_client.connect();

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

interface City {
   uuid: string;
   cityName: string;
   count: number;
}

app.use(
   cors({
      origin: process.env.CLIENT_HOST,
   })
);

app.get("/", (req: Request, res: Response) => {
   res.send("Hello World");
});

function getMockData(): City[] {
   const data = fs.readFileSync("../database/cities.json", "utf-8");

   return JSON.parse(data);
}

app.get("/api/v1/cities", (req: Request, res: Response) => {
   const q = req.query.q as string | undefined;
   if (!q) {
      return res.status(400).json({
         type: "error",
         message: "Query parameter q is missing",
      });
   }

   console.log(q);
   pg_client.query(
      'SELECT * FROM cities WHERE position($1 in "cityName") > 0',
      [q],
      (err, result) => {
         if (err) {
            console.log(err);
            return res.status(500).json({
               type: "error",
               message: "Internal server error",
            });
         }

         const cities = result.rows;

         console.log(cities);

         res.json({
            type: "success",
            data: cities,
         });
      }
   );
});

app.listen(port, () => {
   console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
