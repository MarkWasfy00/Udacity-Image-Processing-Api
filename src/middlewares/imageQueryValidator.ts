import { Response, Request, NextFunction } from "express";
import { query, validationResult } from "express-validator";
import { getImages } from "../utils/ImageApiUtils";

// query validation rules 🛑
export const imageValidationRules = [
  query("width") // < -- checking width 📏
    .exists()
    .withMessage("are not found")
    .isInt({ min: 100, max: 1000 })
    .withMessage("must be a number between 100 and 1000"),
  query("height") // < -- checking height 📐
    .exists()
    .withMessage("are not found")
    .isInt({ min: 100, max: 1000 })
    .withMessage("must be a number between 100 and 1000"),
];

// check if filename are exists in images folder 📂
export const checkImageExists = (req: Request, res: Response, next: NextFunction) => {
  const filename = req.query["filename"] as string;
  if (!getImages().includes(filename)) {
    res.status(400).json({ msg: "filename are not found", status: 400 });
  } else {
    next();
  }
};

// validate the query 📝
export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  } else {
    // gets the first error in the array and displayed in json form 🔀
    const errorMessage = { msg: `${errors.array()[0].param} ${errors.array()[0].msg}`, status: 400 };
    res.status(400).json(errorMessage);
  }
};
