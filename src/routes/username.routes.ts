import { Router } from "express";
import * as userController from "../controller/user.controller";

const router = Router();

router.post("/:username/exist", userController.checkUsername);

export default router;
