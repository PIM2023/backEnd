import { Router } from "express";
import * as postController from "../controller/post.controller";

const router = Router();

router.post("/", postController.create);
router.delete("/:postId", postController.remove);
router.get("/", postController.getAll);
router.get("/:id", postController.getById);
router.put("/:id", postController.update);

export default router;
