import { Router } from "express";
import * as calendarController from "../controller/calendar.controller";

const router = Router();

router.get("/:id", calendarController.getAllDatePostCreatedsByUser);
router.get("/:id/year/:year", calendarController.getDatePostsCreatedInYear);
router.get(
  "/:id/date/:year/:month/:day",
  calendarController.getCreatedPostsByDate
);

export default router;
