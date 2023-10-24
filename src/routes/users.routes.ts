import { Router } from "express";
import * as userController from "../controller/user.controller";

const router = Router();

router.get("/", userController.all);
router.get("/:id", userController.getById);
router.put("/:id", userController.update);
router.delete("/:id", userController.remove);
router.post("/checkUsername", userController.checkUsername);
router.post("/checkEmail", userController.checkEmail);
router.get("/:id/profile", userController.getProfile);
export default router;
