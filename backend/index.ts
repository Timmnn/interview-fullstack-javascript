import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import fs from "fs";

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
   // send data from mock db

   const cities = getMockData();

   const q = req.query.q as string | undefined;
   if (!q) {
      return res.status(400).json({
         type: "error",
         message: "Query parameter q is missing",
      });
   }

   const filteredCities = cities.filter(city => city.cityName.includes(q));

   res.json({
      type: "success",
      data: filteredCities,
   });
});

app.listen(port, () => {
   console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
