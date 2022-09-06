import supertest from "supertest";
import { app } from "../index";
import { IMAGE_FOLDER, IMAGE_OUTPUT_FOLDER } from "../utils/ImageApiUtils";
import fse from "fs-extra";
import { resizeController } from "../controllers/resizeImage";

const request = supertest(app);

//////////////////// ------- Image proccessing tests 🌅 -----------------

describe("Testing api/image endpoint", () => {
  it("Test the 1st image on this endpoint", async () => {
    await request.get("/api/images/").query({ filename: "fjord", width: 300, height: 300 }).expect(200);
  });
  it("Gets the 1st image and see if it exists", async () => {
    expect(fse.pathExistsSync(`${IMAGE_OUTPUT_FOLDER}/fjord_300_300.jpg`)).toBeTruthy();
  });
});
/////////////////////// --------Image upload tests on server ----------------------------

describe("Testing api/image endpoint", () => {
  it("Test upload method", async () => {
    await request.post("/api/images/").attach("image", `${IMAGE_FOLDER}/fjord.jpg`).expect(302);
  });
});

//////////////////////// -----------------Testing Resize Controller function ------------------

describe("Testing server functions", () => {
  it("Test resize controller function", async () => {
    expect(async () => {
      await resizeController("fjord", 200, 200);
    }).not.toThrow();
  });
});

/////////////////////// ----Erros 🚫 tests-------------------

describe("Testing api/image error handling", () => {
  it("Test if it doesn't accept wrong filename parameter", async () => {
    await request.get("/api/images/").query({ filename: "wrongFileName", width: 300, height: 300 }).expect(400);
  });
  ////////////////////////////////////
  it("Test if it doesn't accept wrong dimension parameter", async () => {
    await request.get("/api/images/").query({ filename: "fjord", width: 30, height: 90 }).expect(400);
  });
  ////////////////////////////////////
  it("Test if it doesn't accept empty request query", async () => {
    await request.get("/api/images/").expect(400);
  });
});
