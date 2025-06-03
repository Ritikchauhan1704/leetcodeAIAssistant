import React, { useState } from "react";
import solveAI from "../AI/AI";

interface ChatProps {
  problemStatement?: string;
}

const Chat: React.FC<ChatProps> = ({ problemStatement = "Default problem to solve" }) => {
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showResponse, setShowResponse] = useState(false);

  const handleGetHelp = async () => {
    if (!problemStatement) {
      setResponse("Please provide a problem statement.");
      setShowResponse(true);
      return;
    }

    setIsLoading(true);
    setShowResponse(true);
    setResponse("");

    try {
      // Handle streaming chunks in real-time
      const handleChunk = (chunk: string) => {
        setResponse(prev => prev + chunk);
      };

      // Get the full response (also builds up via chunks)
      const fullResponse = await solveAI(problemStatement, handleChunk);
      
      // Ensure we have the complete response (in case chunks were missed)
      setResponse(fullResponse);
    } catch (error) {
      setResponse("Sorry, there was an error getting help. Please try again.");
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">AI Problem Solver</h2>
        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <h3 className="font-semibold mb-2">Problem Statement:</h3>
          <p className="text-gray-700">{problemStatement}</p>
        </div>
        
        <button 
          onClick={handleGetHelp}
          disabled={isLoading}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-semibold transition-colors"
        >
          {isLoading ? "Getting Help..." : "Get Help"}
        </button>
      </div>

      {showResponse && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-3">AI Response:</h3>
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            {isLoading && !response ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                <span className="text-gray-600">AI is thinking...</span>
              </div>
            ) : (
              <div className="whitespace-pre-wrap text-gray-800">
                {response || "No response received."}
                {isLoading && (
                  <span className="inline-block w-2 h-5 bg-blue-600 animate-pulse ml-1"></span>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;