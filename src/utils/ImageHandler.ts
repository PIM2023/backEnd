import * as fs from "fs";
import * as path from "path";

import * as dotenv from "dotenv";
dotenv.config();

class ImageHandler {
  private baseFolder: string;

  constructor() {
    const rootPath = process.cwd();
    this.baseFolder = path.join(rootPath, "uploads");

    if (!fs.existsSync(this.baseFolder)) {
      fs.mkdirSync(this.baseFolder);
    }
  }

  saveImage(userId: number, imageName: string, base64String: string) {
    // Asegúrate de que la carpeta del usuario exista, si no, créala
    const userFolder = path.join(this.baseFolder, userId.toString());
    if (!fs.existsSync(userFolder)) {
      fs.mkdirSync(userFolder);
    }

    base64String = this.base64plainText(base64String);

    const imageBuffer = Buffer.from(base64String, "base64");
    const imagePath = path.join(userFolder, `${imageName}.png`);
    fs.writeFileSync(imagePath, imageBuffer);
    return this.getServerImagePath(userId, imageName);
  }

  modifyImage(userId: number, imageName: string, base64String: string) {
    const userFolder = path.join(this.baseFolder, userId.toString());
    const imagePath = path.join(userFolder, `${imageName}.png`);

    if (fs.existsSync(imagePath)) {
      const imageBuffer = Buffer.from(base64String, "base64");
      fs.writeFileSync(imagePath, imageBuffer);
      return imagePath;
    } else {
      this.saveImage(userId, imageName, base64String);
      return this.getServerImagePath(userId, imageName);
    }
  }

  // Asegurar que el base64String venga en plain base64, sin data:image/png;base64,
  private base64plainText(encoded: string) {
    const base64Prefix = "data:image/png;base64,";
    if (encoded.startsWith(base64Prefix)) {
      encoded = encoded.replace(base64Prefix, "");
    }
    return encoded;
  }

  private getServerImagePath(userId: number, imageName: string) {
    imageName = `${imageName}.png`;
    let userIdString = userId.toString();

    const serverImagePath = path.join(
      process.env.SERVER_URL,
      "uploads",
      userIdString,
      imageName
    );
    return serverImagePath;
  }
}

export default ImageHandler;
