import { useState } from "react";
import { FaRegCopy } from "react-icons/fa";

const CopyLinkButton = ({ postId }) => {
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    const postUrl = `${window.location.origin}/details/${postId}`;
    navigator.clipboard.writeText(postUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={copyLink}
      style={{
        cursor: "pointer",
        background: "none",
        border: "none",
        color: "#4c8565",
        display: "flex",
        alignItems: "center",
        gap: "6px",
        fontWeight: "600",
        fontSize: "0.9rem",
      }}
      aria-label="نسخ رابط الخبر"
      title="انسخ رابط الخبر"
    >
      <FaRegCopy size={18} />
      {copied ? "تم النسخ!" : "انسخ الرابط"}
    </button>
  );
};

export default CopyLinkButton;
