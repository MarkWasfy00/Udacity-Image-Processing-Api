import express from "express";
import { Response, Request } from "express";
import { resizeController } from "../../controllers/resizeImage";
import { validate, imageValidationRules, checkImageExists } from "../../middlewares/imageQueryValidator";
import { isAlreadyProcessed } from "../../modules/initiateImage";
import fse from "fs-extra";
import morgan from "morgan";
import path from "path";
import { upload } from "../../middlewares/imageUpload";
import multer from "multer";

export const imageRouter = express.Router();

// this is middleware logger to records all http request to src/records.log 📝
imageRouter.use(
  morgan("common", {
    stream: fse.createWriteStream(path.resolve(__dirname, "../../records.log"), { flags: "a" }),
  })
);

imageRouter.get(
  "/",
  imageValidationRules,
  validate,
  checkImageExists,
  async (req: Request, res: Response): Promise<void> => {
    // puts queries in variables 🔹
    const filename = req.query["filename"] as string;
    const width = parseInt(req.query["width"] as string);
    const height = parseInt(req.query["height"] as string);

    // checks if the image already processed on the server ✔️
    const imageAlreadyThere = await isAlreadyProcessed(filename, width, height);
    if (!imageAlreadyThere) {
      await resizeController(filename, width, height);
    }
    res.status(200).render("imagePreview", {
      filename,
      width,
      height,
      path: process.env.IMAGE_OUTPUT_STATIC_FOLDER + `${filename}_${width}_${height}.jpg`,
    });
  }
);

imageRouter.post("/", (req, res) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      res.status(400).json({ msg: err.code, status: 400 });
    } else {
      res.redirect("/");
    }
  });
});
