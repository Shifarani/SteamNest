import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MessageCircle, CalendarDays } from "lucide-react";
import { getMyVideoComments } from "../../api/commentApi";

const CommentsSection = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchComments = async () => {
    try {
      setLoading(true);

      const data = await getMyVideoComments();

      setComments(data || []);
    } catch (error) {
      console.log("Comments Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  // Loading
  if (loading) {
    return (
      <div className="rounded-2xl border border-white/10 bg-[var(--bg)]/10 p-10 text-center backdrop-blur-xl">
        <p className="text-lg text-[var(--muted)]">
          Loading Comments...
        </p>
      </div>
    );
  }

  // No comments
  if (comments.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-[var(--bg)]/10 p-10 text-center backdrop-blur-xl">
        <MessageCircle
          size={45}
          className="mx-auto mb-4 text-orange-400"
        />

        <h2 className="text-2xl font-bold text-white">
          No Comments Yet
        </h2>

        <p className="mt-2 text-[var(--muted)]">
          Your videos haven't received any comments yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">

      {comments.map((comment) => (
        <div
          key={comment._id}
          className="
            overflow-hidden
            rounded-2xl
            border
            border-white/10
            bg-[var(--bg)]/10
            backdrop-blur-xl
            transition
            hover:border-orange-400/30
          "
        >

          {/* Comment Header */}

          <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">

            <div className="flex items-center gap-4">

              <img
                src={
                  comment.owner?.avatar ||
                  "https://ui-avatars.com/api/?name=User"
                }
                alt={comment.owner?.username || "User"}
                className="
                  h-12
                  w-12
                  rounded-full
                  border-2
                  border-orange-400
                  object-cover
                "
              />

              <div>

                <h3 className="font-bold text-white">
                  {comment.owner?.fullName ||
                    comment.owner?.username ||
                    "Unknown User"}
                </h3>

                <p className="text-sm text-[var(--muted)]">
                  @{comment.owner?.username || "user"}
                </p>

              </div>

            </div>

            <div className="flex items-center gap-2 text-sm text-[var(--muted)]">

              <CalendarDays size={16} />

              {new Date(comment.createdAt).toLocaleDateString()}

            </div>

          </div>


          {/* Comment */}

          <div className="px-6 py-5">

            <div className="flex gap-3">

              <MessageCircle
                size={20}
                className="mt-1 shrink-0 text-orange-400"
              />

              <p className="whitespace-pre-wrap leading-7 text-[var(--muted)]">
                {comment.content}
              </p>

            </div>

          </div>


          {/* Video */}

          {comment.video && (
            <Link
              to={`/watch/${comment.video._id}`}
              className="
                flex
                gap-4
                border-t
                border-white/10
                bg-black/10
                p-5
                transition
                hover:bg-white/5
              "
            >

              <img
                src={
                  comment.video.thumbnail ||
                  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500"
                }
                alt={comment.video.title}
                className="
                  h-24
                  w-40
                  rounded-xl
                  object-cover
                "
              />

              <div className="flex flex-1 flex-col justify-center">

                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-orange-400">
                  Commented on your video
                </p>

                <h4 className="font-bold text-white">
                  {comment.video.title}
                </h4>

                <p className="mt-1 text-sm text-[var(--muted)]">
                  Click to watch video →
                </p>

              </div>

            </Link>
          )}

        </div>
      ))}

    </div>
  );
};

export default CommentsSection;