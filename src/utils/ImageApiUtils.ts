import fse from "fs-extra";
import path from "path";

// gets the folder that holds the images
export const IMAGE_FOLDER: string = path.resolve(__dirname, "../assets/full");
export const IMAGE_OUTPUT_FOLDER: string = path.resolve(__dirname, "../assets/thumb");

// list all image names in full folder 📑
export function getImages(): string[] {
  return fse.readdirSync(IMAGE_FOLDER).map((file) => {
    // remove extention name .jpg ✂️
    return file.split(".").slice(0, -1).join(".");
  });
}
// list all image names in thumb folder 📑
export function getThumbFolder(): string[] | undefined {
  if (fse.pathExistsSync(IMAGE_OUTPUT_FOLDER)) {
    return fse.readdirSync(IMAGE_OUTPUT_FOLDER);
  }
}

// turn Bytes to Megabytes 💱
export function megasToBytes(mega: number): number {
  return 1024 * 1024 * mega;
}
