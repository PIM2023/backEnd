import { Router } from "express";
import * as tagController from "../controller/tag.controller";

const router = Router();

router.get("/", tagController.getAllTags);
router.post("/", tagController.create);

export default router;
