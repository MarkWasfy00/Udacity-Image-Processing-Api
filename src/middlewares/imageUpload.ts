import multer, { FileFilterCallback } from "multer";
import { Request } from "express";
import { IMAGE_FOLDER, megasToBytes } from "../utils/ImageApiUtils";

const fileStorageEngine = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, IMAGE_FOLDER); // setting image destination folder ✍️
  },
  filename: (_req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // setting custom image name based on time to prevent reflections ⏰
  },
});

// handles file types 💢
const fileFilter = (_req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  const allowedFiles = ["image/jpg", "image/jpeg"];
  if (allowedFiles.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"));
  }
};

// handles file sizes 📟
const limits = {
  fileSize: megasToBytes(10),
};

export const upload = multer({ storage: fileStorageEngine, fileFilter, limits }).single("image");
