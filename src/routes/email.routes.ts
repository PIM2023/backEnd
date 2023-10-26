import { Router } from "express";
import * as userController from "../controller/user.controller";

const router = Router();

router.post("/:email/exist", userController.checkEmail);

export default router;
