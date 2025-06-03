import { useState } from "react";
import solveAI from "../AI/AI";
import Markdown from "react-markdown";

interface ChatProps {
  problemStatement: string;
}

const Chat = ({ problemStatement }: ChatProps) => {
  const [res, setRes] = useState("");
  const [loading, setLoading] = useState(false);
  const [showResponse, setShowResponse] = useState(false);

  const handleAskAi = async () => {
    if (!problemStatement) return;

    setLoading(true);
    setShowResponse(true);
    try {
      const response = await solveAI(problemStatement);
      setRes(response);
      console.log("AI Response:", response);
    } catch (err) {
      setRes("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setShowResponse(false);
    setRes("");
  };

  return (
    <div className="p-4">
      <button
        onClick={handleAskAi}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? "Thinking..." : "Ask AI"}
      </button>

      {showResponse && (
        <div className="relative mt-4 border rounded-lg p-4 max-h-80 overflow-y-auto bg-gray-100 shadow">
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 text-sm text-red-600 hover:text-red-800"
          >
            ✕ Close
          </button>
          <div className="prose">
            <Markdown>{res}</Markdown>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
