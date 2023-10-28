import { Router } from "express";
import * as postController from "../controller/post.controller";

const router = Router();

router.get("/", postController.getAll);

router.post("/", postController.create);
router.get("/:id", postController.getById);
router.put("/:id", postController.update);
router.delete("/:id", postController.remove);

export default router;
