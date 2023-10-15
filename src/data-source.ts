import "reflect-metadata";
import { DataSource } from "typeorm";

import * as dotenv from "dotenv";
dotenv.config();

const loggingEnabled = process.env.LOGGING_ENABLED === "true";
const synchronizeEnabled = process.env.SYNCRONIZE_ENABLED === "true";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  synchronize: synchronizeEnabled,
  logging: loggingEnabled,
  entities: ["src/entity/*.ts"],
  migrations: [],
  subscribers: [],
});