import mongoose from "mongoose";

import { Story } from "../models/story.models.js";

import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// ================= CREATE STORY =================

const createStory = asyncHandler(async (req, res) => {
    const storyLocalPath = req.file?.path;

    if (!storyLocalPath) {
        throw new ApiError(400, "Story file is required");
    }

    const uploadedStory = await uploadOnCloudinary(storyLocalPath);

    if (!uploadedStory) {
        throw new ApiError(
            500,
            "Error while uploading story"
        );
    }

    const mediaType =
        uploadedStory.resource_type === "video"
            ? "video"
            : "image";

    const story = await Story.create({
        owner: req.user._id,

        mediaUrl: uploadedStory.url,

        mediaType,

        expiresAt: new Date(
            Date.now() + 24 * 60 * 60 * 1000
        ),
    });

    return res.status(201).json(
        new ApiResponse(
            201,
            story,
            "Story created successfully"
        )
    );
});

// ================= GET ACTIVE STORIES =================

const getActiveStories = asyncHandler(async (req, res) => {

    // Current logged-in user
    const currentUserId = new mongoose.Types.ObjectId(
        req.user._id
    );

    const stories = await Story.aggregate([

        // ================= ACTIVE STORIES =================
        {
            $match: {
                expiresAt: {
                    $gt: new Date(),
                },
            },
        },

        // ================= CHECK SUBSCRIPTION =================
        {
            $lookup: {
                from: "subscriptions",

                let: {
                    storyOwner: "$owner",
                },

                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    {
                                        $eq: [
                                            "$subscriber",
                                            currentUserId,
                                        ],
                                    },
                                    {
                                        $eq: [
                                            "$channel",
                                            "$$storyOwner",
                                        ],
                                    },
                                ],
                            },
                        },
                    },
                ],

                as: "subscription",
            },
        },

        // ================= ONLY OWNER OR SUBSCRIBER =================
        {
            $match: {
                $or: [
                    // User apni khud ki story dekh sakta hai
                    {
                        owner: currentUserId,
                    },

                    // User ne story owner ko subscribe kiya hai
                    {
                        "subscription.0": {
                            $exists: true,
                        },
                    },
                ],
            },
        },

        // ================= SORT =================
        {
            $sort: {
                createdAt: -1,
            },
        },

        // ================= GET OWNER DETAILS =================
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

        // ================= OWNER ARRAY TO OBJECT =================
        {
            $addFields: {
                owner: {
                    $first: "$owner",
                },
            },
        },

        // ================= REMOVE SUBSCRIPTION FIELD =================
        {
            $project: {
                subscription: 0,
            },
        },
    ]);

    return res.status(200).json(
        new ApiResponse(
            200,
            stories,
            "Active stories fetched successfully"
        )
    );
});

// ================= DELETE STORY =================

const deleteStory = asyncHandler(async (req, res) => {
    const { storyId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(storyId)) {
        throw new ApiError(
            400,
            "Invalid story id"
        );
    }

    const story = await Story.findById(storyId);

    if (!story) {
        throw new ApiError(
            404,
            "Story not found"
        );
    }

    // Only story owner can delete
    if (
        story.owner.toString() !==
        req.user._id.toString()
    ) {
        throw new ApiError(
            403,
            "You are not authorized to delete this story"
        );
    }

    await Story.findByIdAndDelete(storyId);

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Story deleted successfully"
        )
    );
});

// ================= EXPORT =================

export {
    createStory,
    getActiveStories,
    deleteStory,
};