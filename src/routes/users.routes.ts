import { Router } from "express";
import * as userController from "../controller/user.controller";

const router = Router();

router.get("/", userController.all);
router.get("/:id", userController.getById);
router.get("/:id/profile", userController.getProfile);
router.get("/:id/match", userController.matchUsername);

router.put("/:id", userController.update);

router.delete("/:id", userController.remove);
export default router;
