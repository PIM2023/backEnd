import { DataSource } from "typeorm";

import * as dotenv from "dotenv";
dotenv.config();

import { readdirSync } from "fs";
import { join } from "path";
const entityPath = join(__dirname, "../src", "entity");

export let connection: DataSource;

beforeAll(async () => {
  connection = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3307,
    username: process.env.MYSQL_TEST_USER,
    password: process.env.MYSQL_TEST_PASSWORD,
    database: process.env.MYSQL_TEST_DATABASE,
    entities: ["src/entity/*.ts"],
    synchronize: true,
  });

  await connection.initialize();
});

afterAll(async () => {
  const entityFiles = readdirSync(entityPath);

  for (const file of entityFiles) {
    const table = file.split(".")[0].toLocaleLowerCase();
    await connection.query(`DELETE FROM ${table}`);
    await connection.query(`ALTER TABLE ${table} AUTO_INCREMENT = 1`);
  }

  await connection.destroy();
});
