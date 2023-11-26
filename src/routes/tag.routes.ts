import { Router } from "express";
import * as tagController from "../controller/tag.controller";

const router = Router();

router.get("/", tagController.getAllTags);

export default router;
