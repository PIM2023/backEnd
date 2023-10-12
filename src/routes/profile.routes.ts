import { Router } from "express";
import * as profileController from "../controller/profile.controller";

const router = Router();

router.get("/", profileController.all);
router.get("/:id", profileController.one);
router.post("", profileController.save);
router.put("/:id", profileController.update);
router.delete("/:id", profileController.remove);

export default router;