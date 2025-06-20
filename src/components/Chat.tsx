import { useState } from "react";
import solveAI from "../AI/AI";
import Markdown from "react-markdown";

interface ChatProps {
  problemStatement: string;
  code: string;
  onClose?: () => void; // optional callback to close entire chat panel
}

type FunctionType = "explain" | "solve" | "debug";

const Chat = ({ problemStatement, code, onClose }: ChatProps) => {
  // helper to fetch currently selected language on LeetCode (best-effort)
  const getSelectedLanguage = () => {
    const langBtn = document.querySelector('[data-cy="lang-select"], .ant-select-selection-item') as HTMLElement | null;
    return langBtn?.textContent?.trim() || 'Unknown';
  };
  const [res, setRes] = useState("");
  const [loading, setLoading] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [selectedFunction, setSelectedFunction] = useState<FunctionType | null>(null);

  const handleFunctionSelect = async (functionType: FunctionType) => {
    setSelectedFunction(functionType);
    const language = getSelectedLanguage();
    setLoading(true);
    setShowResponse(true);
    
    try {
      let response: string | AsyncIterable<string> = "";
      
      switch (functionType) {
        case "explain":
          response = await solveAI(problemStatement, "explain");
          break;
        case "solve":
          response = await solveAI(problemStatement, "solve", code);
          break;
        case "debug":
          if (!code.trim()) {
            setRes("No code found to debug. Please write some code first.");
            setLoading(false);
            return;
          }
          response = await solveAI(problemStatement, "debug", code, language); // only fix errors, no full solution
          break;
      }
      
      // Support streaming responses (if solveAI returns an async iterator)
      if (typeof response === 'string') {
        setRes(response);
      } else if (response && typeof (response as any)[Symbol.asyncIterator] === 'function') {
        setRes('');
        for await (const chunk of response as AsyncIterable<string>) {
          setRes(prev => prev + chunk);
        }
      }
    } catch (err) {
      console.error(err);
      setRes("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setShowResponse(false);
    setRes("");
    setSelectedFunction(null);
  };

  const getFunctionTitle = () => {
    switch (selectedFunction) {
      case "explain":
        return "Problem Explanation";
      case "solve":
        return "Code Solution & Explanation";
      case "debug":
        return "Code Debug & Error Fix";
      default:
        return "AI Response";
    }
  };

  return (
    <div className="rounded-xl shadow-lg border border-[#3a3a3a] bg-[#262626] text-gray-100 relative min-w-[22rem] max-w-[26rem]">
      {/* Global close button */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 font-bold"
        >
          ✕
        </button>
      )}
      {!showResponse ? (
        // Function Selection View
        <div className="p-4">
          <h3 className="text-xl font-semibold text-gray-200 mb-4">
            LeetCode AI Assistant
          </h3>
          
          <div className="space-y-3">
            {/* Problem Explanation */}
            <button
              onClick={() => handleFunctionSelect("explain")}
              disabled={loading || !problemStatement}
              className="w-full text-left p-3 rounded-lg border border-blue-200 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-gray-200 text-base font-bold">?</span>
                </div>
                <div>
                  <div className="font-medium text-gray-200">Explain Problem</div>
                  <div className="text-base text-gray-400">
                    Get detailed explanation of the problem
                  </div>
                </div>
              </div>
            </button>

            {/* Code Solution */}
            <button
              onClick={() => handleFunctionSelect("solve")}
              disabled={loading || !problemStatement}
              className="w-full text-left p-3 rounded-lg border border-green-200 hover:border-green-400 hover:bg-green-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-gray-200 text-base font-bold">{'<>'}</span>
                </div>
                <div>
                  <div className="font-medium text-gray-200">Get Solution</div>
                  <div className="text-base text-gray-400">
                    Generate code solution with explanation
                  </div>
                </div>
              </div>
            </button>

            {/* Debug Code */}
            <button
              onClick={() => handleFunctionSelect("debug")}
              disabled={loading || !code.trim()}
              className="w-full text-left p-3 rounded-lg border border-red-200 hover:border-red-400 hover:bg-red-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-gray-200 text-base font-bold">🐛</span>
                </div>
                <div>
                  <div className="font-medium text-gray-200">Debug Code</div>
                  <div className="text-base text-gray-400">
                    {code.trim() ? "Fix errors and explain issues" : "Write code first to debug"}
                  </div>
                </div>
              </div>
            </button>
          </div>

          {/* Status Info */}
          <div className="mt-4 p-2 bg-gray-800 rounded-lg">
            <div className="text-xs text-gray-400">
              <div>Problem: {problemStatement ? "✓ Detected" : "✗ Not found"}</div>
              <div>Code: {code.trim() ? `✓ ${code.split('\n').length} lines` : "✗ Empty"}</div>
            </div>
          </div>
        </div>
      ) : (
        // Response View
        <div className="p-4">
          <div className="flex items-center mb-4">
            <h3 className="text-2xl font-semibold text-gray-200">
              {getFunctionTitle()}
            </h3>
            
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <span className="ml-3 text-gray-400">Thinking...</span>
            </div>
          ) : (
            <div className="max-h-[70vh] overflow-y-auto">
              <div className="prose prose-sm prose-invert max-w-none">
                <Markdown>{res}</Markdown>
              </div>
            </div>
          )}

          {!loading && (
            <div className="mt-4 pt-3 border-t border-[#3a3a3a]">
              <button
                onClick={handleClose}
                className="text-base text-blue-600 hover:text-blue-800"
              >
                ← Back to functions
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Chat;