import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import fs from "fs";
import pg from "pg";
import bodyParser from "body-parser";

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
app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
   res.send("Hello World");
});

app.get("/api/v1/cities", (req: Request, res: Response) => {
   const q = req.query.q as string | undefined;
   const page = parseInt(req.query.page as string) || 1;

   const pageSize = 5;
   if (!q) {
      return res.status(400).json({
         type: "error",
         message: "Query parameter q is missing",
      });
   }

   console.log(q);
   pg_client.query(
      'SELECT * FROM cities WHERE position($1 in "cityName") > 0 LIMIT $2 OFFSET $3',
      [q, pageSize, (page - 1) * pageSize],
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

app.post("/api/v1/cities", (req: Request, res: Response) => {
   const body = req.body as {
      cities: {
         cityName: string;
         count: number;
      }[];
   };
   // check if all cities have a cityName and count

   const data_valid = body.cities?.every(
      city =>
         city.cityName &&
         typeof city.cityName === "string" &&
         city.count &&
         typeof city.count === "number"
   );

   if (!data_valid) {
      return res.status(400).json({
         type: "error",
         message: "Invalid data",
      });
   }

   // insert data into database
   const query = 'INSERT INTO cities ("cityName", count) VALUES ($1, $2)';
   const values = body.cities.map(city => [city.cityName, city.count]);

   pg_client.query("BEGIN", async err => {
      if (err) {
         console.log(err);
         return res.status(500).json({
            type: "error",
            message: "Internal server error",
         });
      }

      for (const value of values) {
         await pg_client.query(query, value, (err, result) => {
            if (err) {
               console.log(err);
               pg_client.query("ROLLBACK", err => {
                  if (err) {
                     console.log(err);
                  }
               });
               return res.status(500).json({
                  type: "error",
                  message: "Internal server error",
               });
            }
         });
      }

      pg_client.query("COMMIT", err => {
         if (err) {
            console.log(err);
            return res.status(500).json({
               type: "error",
               message: "Internal server error",
            });
         }

         res.json({
            type: "success",
            message: "Data inserted successfully",
         });
      });
   });
});

app.delete("/api/v1/cities", (req: Request, res: Response) => {
   const cityName = req.body.cityName as string | undefined;

   if (!cityName) {
      return res.status(400).json({
         type: "error",
         message: "City name is missing",
      });
   }

   pg_client.query('DELETE FROM cities WHERE "cityName" = $1', [cityName], (err, result) => {
      if (err) {
         console.log(err);
         return res.status(500).json({
            type: "error",
            message: "Internal server error",
         });
      }

      res.json({
         type: "success",
         message: "Data deleted successfully",
      });
   });
});

app.listen(port, () => {
   console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
