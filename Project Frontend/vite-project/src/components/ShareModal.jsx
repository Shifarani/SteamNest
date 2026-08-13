import {
  X,
  Copy,
  Share2,
  MessageCircle,
  Send,
  Mail,
} from "lucide-react";

const ShareModal = ({ isOpen, onClose, video }) => {
  if (!isOpen || !video) return null;

  const shareUrl = `${window.location.origin}/watch/${video._id}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert("✅ Link copied successfully!");
    } catch (error) {
      console.error(error);
      alert("❌ Failed to copy link");
    }
  };

  const shareWhatsApp = () => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(
        `${video.title}\n${shareUrl}`
      )}`,
      "_blank"
    );
  };

  const shareTelegram = () => {
    window.open(
      `https://t.me/share/url?url=${encodeURIComponent(
        shareUrl
      )}&text=${encodeURIComponent(video.title)}`,
      "_blank"
    );
  };

  const shareTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        video.title
      )}&url=${encodeURIComponent(shareUrl)}`,
      "_blank"
    );
  };

  const shareFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        shareUrl
      )}`,
      "_blank"
    );
  };

  const shareEmail = () => {
    window.location.href = `mailto:?subject=${encodeURIComponent(
      video.title
    )}&body=${encodeURIComponent(
      `Check out this video:\n\n${shareUrl}`
    )}`;
  };
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-3xl bg-[var(--bg)] p-6 shadow-2xl">

        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Share2 className="text-purple-600" size={28} />
            <h2 className="text-2xl font-bold text-[var(--text)]">
              Share Video
            </h2>
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-2 transition hover:bg-[var(--card)]"
          >
            <X size={22} />
          </button>
        </div>

        {/* Video Title */}
        <div className="mb-5 rounded-2xl bg-gray-50 p-4">
          <p className="line-clamp-2 font-semibold text-[var(--text)]">
            {video.title}
          </p>
        </div>

        {/* Share Buttons */}
        <div className="grid grid-cols-2 gap-4">

          <button
            onClick={copyLink}
            className="flex items-center justify-center gap-2 rounded-2xl bg-orange-500 py-3 font-semibold text-white transition hover:scale-105"
          >
            <Copy size={18} />
            Copy Link
          </button>

          <button
            onClick={shareWhatsApp}
            className="flex items-center justify-center gap-2 rounded-2xl bg-green-600 py-3 font-semibold text-white transition hover:scale-105"
          >
            <MessageCircle size={18} />
            WhatsApp
          </button>

          <button
            onClick={shareTelegram}
            className="flex items-center justify-center gap-2 rounded-2xl bg-sky-500 py-3 font-semibold text-white transition hover:scale-105"
          >
            <Send size={18} />
            Telegram
          </button>

          <button
            onClick={shareTwitter}
            className="flex items-center justify-center gap-2 rounded-2xl bg-black py-3 font-semibold text-white transition hover:scale-105"
          >
            𝕏
            <span>X</span>
          </button>

          <button
            onClick={shareFacebook}
            className="flex items-center justify-center gap-2 rounded-2xl bg-blue-700 py-3 font-semibold text-white transition hover:scale-105"
          >
            f
            <span>Facebook</span>
          </button>

          <button
            onClick={shareEmail}
            className="flex items-center justify-center gap-2 rounded-2xl bg-purple-600 py-3 font-semibold text-white transition hover:scale-105"
          >
            <Mail size={18} />
            Email
          </button>

        </div>

        {/* URL Preview */}
        <div className="mt-6 rounded-2xl border border-[var(--border)] bg-gray-50 p-3">
          <p className="truncate text-sm text-[var(--muted)]">
            {shareUrl}
          </p>
        </div>

      </div>
    </div>
  );
};

export default ShareModal;