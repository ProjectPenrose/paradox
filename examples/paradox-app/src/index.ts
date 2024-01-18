import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import path from "path";

dotenv.config();

const app: Express = express();

app.use(express.static("dist"));
app.use("/static", express.static(path.join(__dirname, "../dist")));

app.get("/*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../app", "index.html"))
})

const { PORT = 3040, DEV_HOST = "localhost" } = process.env || 3040;

app.listen(PORT as number, DEV_HOST, () => {
  console.log(`App up and runing on PORT http://${DEV_HOST}:${PORT}`);
});