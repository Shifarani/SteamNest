import { Router } from "express";
import {
    deleteVideo,
    getAllVideos,
    getVideoById,
    publishAVideo,
    togglePublishStatus,
    updateVideo,
    incrementViews
} from "../controllers/video.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";


const router = Router();

router.use(verifyJWT);

// Get all videos & Publish video
router
    .route("/")
    .get(getAllVideos)
    .post(
        upload.fields([
            {
                name: "videoFile",
                maxCount: 1,
            },
            {
                name: "thumbnail",
                maxCount: 1,
            },
        ]),
        publishAVideo
    );

// Get, Delete & Update video
router
    .route("/:videoId")
    .get(getVideoById)
    .delete(deleteVideo)
    .patch(
        upload.single("thumbnail"), // Temporary for debugging
        updateVideo
    );
router.route("/:videoId/views").patch(incrementViews);

router.route("/toggle/publish/:videoId").patch(togglePublishStatus);

export default router;