import mongoose from "mongoose";
import { Comment } from "../models/comment.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getVideoComments = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    if (!mongoose.Types.ObjectId.isValid(videoId)) {
        throw new ApiError(400, "Invalid video id");
    }

    const comments = await Comment.aggregate([
        {
            $match: {
                video: new mongoose.Types.ObjectId(videoId)
            }
        },
        {
            $sort: {
                createdAt: -1
            }
        },
        {
            $skip: (Number(page) - 1) * Number(limit)
        },
        {
            $limit: Number(limit)
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
            $addFields: {
                owner: {
                    $first: "$owner"
                }
            }
        }
    ]);

    const totalComments = await Comment.countDocuments({
        video: videoId
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                comments,
                page: Number(page),
                limit: Number(limit),
                totalComments,
                totalPages: Math.ceil(totalComments / Number(limit))
            },
            "Comments fetched successfully"
        )
    );
});
const addComment = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    const { content } = req.body;

    if (!mongoose.Types.ObjectId.isValid(videoId)) {
        throw new ApiError(400, "Invalid video id");
    }

    if (!content || content.trim() === "") {
        throw new ApiError(400, "Comment content is required");
    }

    const comment = await Comment.create({
        content,
        video: videoId,
        owner: req.user._id,
    });

    const createdComment = await Comment.findById(comment._id).populate(
        "owner",
        "fullName username avatar"
    );

    if (!createdComment) {
        throw new ApiError(500, "Something went wrong while adding the comment");
    }

    return res.status(201).json(
        new ApiResponse(
            201,
            createdComment,
            "Comment added successfully"
        )
    );
});

const updateComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params;
    const { content } = req.body;

    if (!mongoose.Types.ObjectId.isValid(commentId)) {
        throw new ApiError(400, "Invalid comment id");
    }

    if (!content || content.trim() === "") {
        throw new ApiError(400, "Comment content is required");
    }

    const comment = await Comment.findById(commentId);

    if (!comment) {
        throw new ApiError(404, "Comment not found");
    }

    if (comment.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You are not authorized to update this comment");
    }

    comment.content = content;
    await comment.save({ validateBeforeSave: false });

    const updatedComment = await Comment.findById(comment._id).populate(
        "owner",
        "fullName username avatar"
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            updatedComment,
            "Comment updated successfully"
        )
    );
});

const deleteComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(commentId)) {
        throw new ApiError(400, "Invalid comment id");
    }

    const comment = await Comment.findById(commentId);

    if (!comment) {
        throw new ApiError(404, "Comment not found");
    }

    if (comment.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You are not authorized to delete this comment");
    }

    await Comment.findByIdAndDelete(commentId);

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Comment deleted successfully"
        )
    );
});
const getMyVideoComments = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const comments = await Comment.aggregate([
    {
      $lookup: {
        from: "videos",
        localField: "video",
        foreignField: "_id",
        as: "video",
      },
    },

    {
      $unwind: "$video",
    },

    // Sirf meri uploaded videos ke comments
    {
      $match: {
        "video.owner": new mongoose.Types.ObjectId(userId),
      },
    },

    // Comment karne wale user ki information
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

    // Latest comments first
    {
      $sort: {
        createdAt: -1,
      },
    },

    {
      $project: {
        _id: 1,
        content: 1,
        createdAt: 1,

        owner: 1,

        video: {
          _id: "$video._id",
          title: "$video.title",
          thumbnail: "$video.thumbnail",
        },
      },
    },
  ]);

  return res.status(200).json(
    new ApiResponse(
      200,
      comments,
      "My video comments fetched successfully"
    )
  );
});


export {
  getVideoComments,
  getMyVideoComments,
  addComment,
  updateComment,
  deleteComment
};