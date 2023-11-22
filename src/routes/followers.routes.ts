import { Router } from "express";
import * as followersController from "../controller/followers.controller";

const router = Router();

router.get("/:id", followersController.getFollowers);
router.get("/:id/following", followersController.getFollowing);
router.post("/:id/follow", followersController.follow);
router.delete("/:id/unfollow", followersController.unfollow);

export default router;
