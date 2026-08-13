import { Router } from "express";

import {
    createStory,
    getActiveStories,
    deleteStory,
} from "../controllers/story.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/").post(
    upload.single("story"),
    createStory
);

router.route("/").get(getActiveStories);

router.route("/:storyId").delete(deleteStory);

export default router;