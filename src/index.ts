import express from "express";
import * as dotenv from "dotenv";
import { apiRouter } from "./routes/api";
import path from "path";
import { getImages, getThumbFolder } from "./utils/ImageApiUtils";

dotenv.config(); // loads all env variables🔹
export const app = express();
const PORT = process.env.PORT || 8080;

app.use("/static", express.static(path.join(__dirname, "assets"))); // host static files on /static 🔹
app.set("views", __dirname + "/views"); // sets the views folder path 🔹
app.set("view engine", "pug"); // sets view engine to pug js (jade) 🔹

// this is the main endpoint for the application that holds api application 🔹
app.get("/", (_req, res) => {
  res.status(200).render("index", {
    fullFolder: getImages(),
    thumbFolder: getThumbFolder(),
  });
});

app.use("/api", apiRouter);

app.listen(PORT, function () {
  console.log(`express has started on port ${PORT}`);
});
