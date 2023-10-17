import { Router } from "express";
import * as registerController from "../controller/register.controller";

const router = Router();

router.post("/", registerController.register);

export default router;
