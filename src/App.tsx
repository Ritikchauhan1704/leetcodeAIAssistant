import { useState, useEffect, type FC } from "react";

const Popup: FC = () => {
  const [apiKey, setApiKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Load API key from chrome.storage.local on component mount
  useEffect(() => {
    const loadApiKey = async () => {
      try {
        const result = await chrome.storage.local.get(["gemini_api_key"]);
        const savedKey = result.gemini_api_key;

        if (savedKey) {
          setApiKey(savedKey);
        } else {
          setIsEditing(true);
        }
      } catch (error) {
        console.error("Error loading API key:", error);
        setIsEditing(true);
      }
    };

    loadApiKey();
  }, []);

  const handleSaveKey = async () => {
    if (apiKey.trim()) {
      try {
        await chrome.storage.local.set({ gemini_api_key: apiKey.trim() });
        setIsEditing(false);
        console.log("API key saved successfully");
      } catch (error) {
        console.error("Error saving API key:", error);
      }
    }
  };

  const handleDeleteKey = async () => {
    try {
      await chrome.storage.local.remove(["gemini_api_key"]);
      setApiKey("");
      setIsEditing(true);
      console.log("API key deleted successfully");
    } catch (error) {
      console.error("Error deleting API key:", error);
    }
  };

  const maskApiKey = (key: string) => {
    if (key.length <= 8) return key;
    const start = key.substring(0, 4);
    const end = key.substring(key.length - 4);
    const middle = "*".repeat(key.length - 8);
    return `${start}${middle}${end}`;
  };

  return (
    <div className="min-h-screen min-w-screen bg-[#1e1e1e] flex items-center justify-center p-4">
      <div className="bg-[#262626] rounded-2xl shadow-xl p-8 w-full max-w-md border border-[#3a3a3a] text-gray-100">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-purple-600 hover:bg-purple-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl font-bold">🔑</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-100 mb-2">
            LeetCode AI Assistant
          </h1>
          <p className="text-gray-400">
            Enter your Gemini API key to get started
          </p>
        </div>

        {!apiKey || isEditing ? (
          // API Key Input Form
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gemini API Key
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your Gemini API key..."
                className="w-full px-4 py-3 border border-[#4a4a4a] rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>

            <div className="text-xs text-gray-500 bg-blue-50 p-3 rounded-lg">
              <p className="font-semibold mb-1">How to get your API key:</p>
              <p>
                1. Go to{" "}
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  className="text-blue-600 hover:underline"
                >
                  Google AI Studio
                </a>
              </p>
              <p>2. Click "Create API Key"</p>
              <p>3. Copy and paste it here</p>
            </div>

            <button
              onClick={handleSaveKey}
              disabled={!apiKey.trim()}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Save API Key
            </button>

            {apiKey && isEditing && (
              <button
                onClick={() => setIsEditing(false)}
                className="w-full text-gray-400 hover:text-gray-100 py-2 text-sm"
              >
                Cancel
              </button>
            )}
          </div>
        ) : (
          // API Key Display
          <div className="space-y-6">
            <div className="bg-green-900/20 border border-green-500/40 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-green-600 text-lg">✓</span>
                <span className="text-green-400 font-medium">
                  API Key Configured
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Your API Key:</span>
                  <button
                    onClick={() => setShowKey(!showKey)}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    {showKey ? "Hide" : "Show"}
                  </button>
                </div>

                <div className="bg-[#1e1e1e] border border-[#4a4a4a] p-3 rounded font-mono text-sm break-all">
                  {showKey ? apiKey : maskApiKey(apiKey)}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => setIsEditing(true)}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
              >
                Update API Key
              </button>

              <button
                onClick={handleDeleteKey}
                className="w-full bg-red-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-600 transition-colors"
              >
                Delete API Key
              </button>
            </div>

            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-green-600 font-medium mb-2">
                🎉 Ready to use!
              </p>
              <p className="text-sm text-gray-400">
                Your AI assistant is now configured and ready to help with
                LeetCode problems.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Popup;
