import ImageHandler from "../../src/utils/ImageHandler";
import * as fs from "fs";
import * as path from "path";

describe("ImageHandler", () => {
  let imageHandler: ImageHandler;

  beforeAll(() => {
    imageHandler = new ImageHandler();
  });

  afterEach(() => {
    // Limpia el directorio de pruebas después de cada prueba
    const files = fs.readdirSync(imageHandler["imageFolder"]);
    files.forEach((file) => {
      fs.unlinkSync(path.join(imageHandler["imageFolder"], file));
    });
  });

  it("should save an image", () => {
    const imageName = "testImage.jpg";
    const base64String = "data:image/png;base64,iVBORw..."; // Tu imagen en base64

    const imagePath = imageHandler.saveImage(imageName, base64String);

    expect(fs.existsSync(imagePath)).toBe(true);
  });

  it("should modify an existing image", () => {
    const imageName = "testImage.jpg";
    const base64String = "data:image/png;base64,iVBORw..."; // Tu imagen en base64

    // Guarda la imagen por primera vez
    const imagePath1 = imageHandler.saveImage(imageName, base64String);

    // Modifica la imagen
    const newPath = imageHandler.modifyImage(imageName, base64String);

    expect(newPath).toBe(imagePath1);
  });

  it("should save a new image if it does not exist", () => {
    const imageName = "testImage.jpg";
    const base64String = "data:image/png;base64,iVBORw..."; // Tu imagen en base64

    // Modifica una imagen que no existe
    const imagePath = imageHandler.modifyImage(imageName, base64String);

    expect(fs.existsSync(imagePath)).toBe(true);
  });
});
