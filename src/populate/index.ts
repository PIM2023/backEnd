import { readdirSync } from "fs";

const removeExtension = (fileName) => {
  return fileName.split(".").shift();
};

console.log("\n===== Populating tables =====");

readdirSync(__dirname).filter((file) => {
  const fileWithOutExt = removeExtension(file);
  const skip = ["index"].includes(fileWithOutExt);
  if (!skip) {
    console.log(`Populate: ${fileWithOutExt}`);
    require(`./${fileWithOutExt}.populate`).default;
  }
});

console.log("\n=====    =====");
