import fse from "fs-extra";
import { IMAGE_OUTPUT_FOLDER } from "../utils/ImageApiUtils";

export const isAlreadyProcessed = async (filename: string, width: number, height: number) => {
  // checks if thumb folder is there 🔹
  const exists = await fse.pathExists(IMAGE_OUTPUT_FOLDER);
  // if exists it will search for the image if its already been processed 🔹
  if (exists) {
    const isImageExists = await fse.pathExists(`${IMAGE_OUTPUT_FOLDER}/${filename}_${width}_${height}.jpg`);
    return isImageExists;
  } else {
    // if not it will make thumb folder 🔹
    fse.mkdirSync(IMAGE_OUTPUT_FOLDER);
  }
};
