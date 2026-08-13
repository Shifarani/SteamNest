import mongoose, {isValidObjectId} from "mongoose"
import {Video} from "../models/video.models.js"
import {User} from "../models/user.models.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"



const getAllVideos = asyncHandler(async (req, res) => {
    const {
        page = 1,
        limit = 10,
        query,
        sortBy = "createdAt",
        sortType = "desc",
        userId
    } = req.query;

    const matchStage = {
        isPublished: true
    };

    // Search by title
    if (query) {
        matchStage.title = {
            $regex: query,
            $options: "i"
        };
    }

    // Filter by owner
    if (userId) {
        if (!isValidObjectId(userId)) {
            throw new ApiError(400, "Invalid user id");
        }

        matchStage.owner = new mongoose.Types.ObjectId(userId);
    }

    const aggregate = Video.aggregate([
        {
            $match: matchStage
        },
        {
            $sort: {
                [sortBy]: sortType === "asc" ? 1 : -1
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "owner",
                pipeline: [
                    {
                        $project: {
                            fullName: 1,
                            username: 1,
                            avatar: 1
                        }
                    }
                ]
            }
        },
        {
            $unwind: "$owner"
        }
    ]);

    const options = {
        page: Number(page),
        limit: Number(limit)
    };

    const videos = await Video.aggregatePaginate(aggregate, options);

    return res.status(200).json(
        new ApiResponse(
            200,
            videos,
            "Videos fetched successfully"
        )
    );
});
const publishAVideo = asyncHandler(async (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        throw new ApiError(400, "Title and description are required");
    }

    const videoLocalPath = req.files?.videoFile?.[0]?.path;

    
    const thumbnailLocalPath = req.files?.thumbnail?.[0]?.path;

    if (!videoLocalPath) {
        throw new ApiError(400, "Video file is required");
    }

    if (!thumbnailLocalPath) {
        throw new ApiError(400, "Thumbnail is required");
    }

    const video = await uploadOnCloudinary(videoLocalPath);
    const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);

    if (!video) {
        throw new ApiError(500, "Error while uploading video");
    }

    if (!thumbnail) {
        throw new ApiError(500, "Error while uploading thumbnail");
    }

    const uploadedVideo = await Video.create({
        videoFile: video.url,
        thumbnail: thumbnail.url,
        title,
        description,
        duration: video.duration || 0,
        owner: req.user._id
    });

    return res.status(201).json(
        new ApiResponse(
            201,
            uploadedVideo,
            "Video published successfully"
        )
    );
});


    const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params;

    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video id");
    }
    await Video.findByIdAndUpdate(
    videoId,
    {
        $inc: {
            views: 1,
        },
    },
    {
        new: true,
    }
);
    

    const video = await Video.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(videoId),
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "owner",
                pipeline: [
                    {
                        $project: {
                            fullName: 1,
                            username: 1,
                            avatar: 1,
                        },
                    },
                ],
            },
        },
        {
            $unwind: "$owner",
        },
                {
            $lookup: {
                from: "likes",
                localField: "_id",
                foreignField: "video",
                as: "likes",
            },
        },
        {
            $lookup: {
                from: "subscriptions",
                let: {
                    ownerId: "$owner._id",
                },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $eq: ["$channel", "$$ownerId"],
                            },
                        },
                    },
                ],
                as: "subscribers",
            },
        },
        {
            $addFields: {
                likesCount: {
                    $size: "$likes",
                },
                subscribersCount: {
                    $size: "$subscribers",
                },
                isSubscribed: {
                    $cond: {
                        if: {
                            $in: [
                                req.user?._id,
                                "$subscribers.subscriber",
                            ],
                        },
                        then: true,
                        else: false,
                    },
                },
            },
        },
                {
            $project: {
                likes: 0,
                subscribers: 0,
            },
        },
    ]);

    if (!video || video.length === 0) {
        throw new ApiError(404, "Video not found");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            video[0],
            "Video fetched successfully"
        )
    );
});


    //TODO: update video details like title, description, thumbnail
 const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    const { title, description } = req.body;

    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video id");
    }
    

    const video = await Video.findById(videoId);

if (!video) {
    throw new ApiError(404, "Video not found");
}

if (video.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not authorized to update this video");
}

    const thumbnailLocalPath = req.file?.path;

    let thumbnail;

    if (thumbnailLocalPath) {
        thumbnail = await uploadOnCloudinary(thumbnailLocalPath);

        if (!thumbnail) {
            throw new ApiError(500, "Error while uploading thumbnail");
        }
    }

    const updatedVideo = await Video.findByIdAndUpdate(
        videoId,
        {
            $set: {
                ...(title && { title }),
                ...(description && { description }),
                ...(thumbnail && { thumbnail: thumbnail.url })
            }
        },
        {
            new: true
        }
    );

    if (!updatedVideo) {
        throw new ApiError(404, "Video not found");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            updatedVideo,
            "Video updated successfully"
        )
    );
});   

//TODO: delete video

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params;

    if (!isValidObjectId(videoId)) {
         throw new ApiError(400, "Invalid video id");
}


    const video = await Video.findById(videoId);

if (!video) {
    throw new ApiError(404, "Video not found");
}

if (video.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not authorized to delete this video");
}

    const deletedVideo = await Video.findByIdAndDelete(videoId);

    if (!deletedVideo) {
        throw new ApiError(404, "Video not found");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            deletedVideo,
            "Video deleted successfully"
        )
    );
});


const incrementViews = asyncHandler(async (req, res) => {
    const { videoId } = req.params;

    const video = await Video.findByIdAndUpdate(
        videoId,
        {
            $inc: {
                views: 1,
            },
        },
        {
            new: true,
        }
    );

    if (!video) {
        throw new ApiError(404, "Video not found");
    }

    return res.status(200).json(
        new ApiResponse(200, video, "Views updated")
    );
});


const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params;

    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video id");
    }

    const video = await Video.findById(videoId);

    if (!video) {
        throw new ApiError(404, "Video not found");
    }

    if (video.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You are not authorized to update this video");
    }
        video.isPublished = !video.isPublished;

    await video.save({ validateBeforeSave: false });
        return res.status(200).json(
        new ApiResponse(
            200,
            video,
            `Video ${video.isPublished ? "published" : "unpublished"} successfully`
        )
    );
});

export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus,
    incrementViews
}