import { Router } from "express";
import * as postController from "../controller/post.controller";

const router = Router();

router.post("/:id/:text/:image", postController.create);
router.delete("/:id", postController.remove);
router.get("/", postController.getAll);
router.get("/:id", postController.getById);
router.put("/:id/:text/:image", postController.update);

export default router;
