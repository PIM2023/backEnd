import { Router } from "express";
import * as userController from "../controller/user.controller";
import upload from "../utils/multer";

const router = Router();

router.get("/", userController.all);
router.get("/:id", userController.getById);
router.get("/:id/profile", userController.getProfile);

router.post("/:id/avatar", upload.single("file"), userController.uploadAvatar);

router.put("/:id", userController.update);

router.delete("/:id", userController.remove);
export default router;
