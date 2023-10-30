export class ImageHandler {
  static decodeBase64ToBuffer(base64String) {
    return Buffer.from(base64String, "base64");
  }

  static encodeBufferToBase64(buffer) {
    return buffer.toString("base64");
  }
}
