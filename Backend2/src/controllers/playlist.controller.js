import mongoose, { isValidObjectId } from "mongoose";
import { Playlist } from "../models/playlist.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// TODO: Create Playlist

const createPlaylist = asyncHandler(async (req, res) => {
    const { name, description } = req.body;

    if (!name || name.trim() === "") {
        throw new ApiError(400, "Playlist name is required");
    }

    const playlist = await Playlist.create({
        name,
        description,
        owner: req.user._id,
    });

    if (!playlist) {
        throw new ApiError(500, "Something went wrong while creating playlist");
    }

    return res.status(201).json(
        new ApiResponse(
            201,
            playlist,
            "Playlist created successfully"
        )
    );
});



// TODO: Get User Playlists
const getUserPlaylists = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    if (!isValidObjectId(userId)) {
        throw new ApiError(400, "Invalid user id");
    }

    const playlists = await Playlist.find({
        owner: userId,
    }).sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(
            200,
            playlists,
            "User playlists fetched successfully"
        )
    );
});



// TODO: Get Playlist By Id

const getPlaylistById = asyncHandler(async (req, res) => {
    const { playlistId } = req.params;

    if (!isValidObjectId(playlistId)) {
        throw new ApiError(400, "Invalid playlist id");
    }

    const playlist = await Playlist.findById(playlistId)
  .populate("owner", "fullName username avatar")
  .populate({
    path: "videos",
    populate: {
      path: "owner",
      select: "fullName username avatar",
    },
  });

    if (!playlist) {
        throw new ApiError(404, "Playlist not found");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            playlist,
            "Playlist fetched successfully"
        )
    );
});



// TODO: Add Video To Playlist

const addVideoToPlaylist = asyncHandler(async (req, res) => {

    const { playlistId, videoId } = req.params;

    if (
        !isValidObjectId(playlistId) ||
        !isValidObjectId(videoId)
    ) {
        throw new ApiError(400, "Invalid playlist or video id");
    }

    const playlist = await Playlist.findById(playlistId);

    if (!playlist) {
        throw new ApiError(404, "Playlist not found");
    }

    if (playlist.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "Unauthorized request");
    }

    if (playlist.videos.includes(videoId)) {
        throw new ApiError(400, "Video already exists in playlist");
    }

    playlist.videos.push(videoId);

    await playlist.save({
        validateBeforeSave: false,
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            playlist,
            "Video added to playlist successfully"
        )
    );
});



// TODO: Remove Video From Playlist

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {

    const { playlistId, videoId } = req.params;

    if (
        !isValidObjectId(playlistId) ||
        !isValidObjectId(videoId)
    ) {
        throw new ApiError(400, "Invalid playlist or video id");
    }

    const playlist = await Playlist.findById(playlistId);

    if (!playlist) {
        throw new ApiError(404, "Playlist not found");
    }

    if (playlist.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "Unauthorized request");
    }

    playlist.videos = playlist.videos.filter(
        (id) => id.toString() !== videoId
    );

    await playlist.save({
        validateBeforeSave: false,
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            playlist,
            "Video removed from playlist successfully"
        )
    );
});



// TODO: Delete Playlist

const deletePlaylist = asyncHandler(async (req, res) => {

    const { playlistId } = req.params;

    if (!isValidObjectId(playlistId)) {
        throw new ApiError(400, "Invalid playlist id");
    }

    const playlist = await Playlist.findById(playlistId);

    if (!playlist) {
        throw new ApiError(404, "Playlist not found");
    }

    if (playlist.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "Unauthorized request");
    }

    await Playlist.findByIdAndDelete(playlistId);

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Playlist deleted successfully"
        )
    );
});



// TODO: Update Playlist

const updatePlaylist = asyncHandler(async (req, res) => {

    const { playlistId } = req.params;
    const { name, description } = req.body;

    if (!isValidObjectId(playlistId)) {
        throw new ApiError(400, "Invalid playlist id");
    }

    const playlist = await Playlist.findById(playlistId);

    if (!playlist) {
        throw new ApiError(404, "Playlist not found");
    }

    if (playlist.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "Unauthorized request");
    }

    if (name) {
        playlist.name = name;
    }

    if (description) {
        playlist.description = description;
    }

    await playlist.save();

    return res.status(200).json(
        new ApiResponse(
            200,
            playlist,
            "Playlist updated successfully"
        )
    );
});


export {
    createPlaylist,
    getUserPlaylists,
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist,
};