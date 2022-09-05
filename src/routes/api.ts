import express from "express";
import { imageRouter } from "./api/images";

export const apiRouter = express.Router();

// this is the mini application that holds all api routes 🔹
apiRouter.use("/images", imageRouter);
