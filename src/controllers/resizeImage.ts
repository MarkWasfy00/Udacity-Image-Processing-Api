import path from "path";
import sharp from "sharp";
import { IMAGE_FOLDER, IMAGE_OUTPUT_FOLDER } from "../utils/ImageApiUtils";

export const resizeController = async (filename: string, width: number, height: number): Promise<void> => {
  await sharp(path.resolve(IMAGE_FOLDER, `${filename}.jpg`))
    .resize({
      width: width,
      height: height,
      fit: sharp.fit.cover,
    })
    .toFile(path.resolve(IMAGE_OUTPUT_FOLDER, `${filename}_${width}_${height}.jpg`));
};
