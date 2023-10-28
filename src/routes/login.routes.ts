import { Router } from "express";
import * as loginController from "../controller/login.controller";

const router = Router();

router.get("/", loginController.login);

export default router;
