import { Router } from "express";
import * as profileController from "../controller/profile.controller";

const router = Router();

router.get("/:id", profileController.one);
router.put("/:id", profileController.update);

export default router;
