import { readdirSync } from "fs";
import { AppDataSource } from "../data-source";

const removeExtension = (fileName) => {
  return fileName.split(".").shift();
};

console.log("\n===== Populating tables =====");

AppDataSource.initialize().then(async () => {
  const promises = readdirSync(__dirname).filter((file) => {
    const fileWithOutExt = removeExtension(file);
    const skip = ["index"].includes(fileWithOutExt);
    if (!skip) {
      console.log(`Populate: ${fileWithOutExt}`);
      require(`./${fileWithOutExt}.populate`).default;
    }
  });

  await Promise.all(promises);

  console.log("\n=====    =====");
  process.exit();
});
