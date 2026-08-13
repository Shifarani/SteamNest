import mongoose, { Schema } from "mongoose";

const storySchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    mediaUrl: {
      type: String,
      required: true,
    },

    mediaType: {
      type: String,
      enum: ["image", "video"],
      default: "image",
    },

    expiresAt: {
      type: Date,
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Story automatically delete after expiresAt
storySchema.index(
  { expiresAt: 1 },
  { expireAfterSeconds: 0 }
);

export const Story = mongoose.model("Story", storySchema);