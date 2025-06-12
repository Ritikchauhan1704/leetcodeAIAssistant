import { useState, useEffect } from "react";

export default function App() {
  const [apiKey, setApiKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  console.log('====================================');
  console.log("hi");
  console.log('====================================');
  // Load API key from localStorage on component mount
  useEffect(() => {
    const savedKey = localStorage.getItem("gemini_api_key");
    if (savedKey) {
      setApiKey(savedKey);
    } else {
      setIsEditing(true); // Show input if no key exists
    }
    console.log('====================================');
    console.log(savedKey);
    console.log('====================================');
  }, []);

  const handleSaveKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem("gemini_api_key", apiKey.trim());
      setIsEditing(false);
    }
  };

  const handleDeleteKey = () => {
    localStorage.removeItem("gemini_api_key");
    setApiKey("");
    setIsEditing(true);
  };

  const maskApiKey = (key: string) => {
    if (key.length <= 8) return key;
    const start = key.substring(0, 4);
    const end = key.substring(key.length - 4);
    const middle = "*".repeat(key.length - 8);
    return `${start}${middle}${end}`;
  };

  return (
    <div className="min-h-screen min-w-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md border border-gray-200 ">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl font-bold">🔑</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            LeetCode AI Assistant
          </h1>
          <p className="text-gray-600">
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Save API Key
            </button>

            {apiKey && isEditing && (
              <button
                onClick={() => setIsEditing(false)}
                className="w-full text-gray-600 hover:text-gray-800 py-2 text-sm"
              >
                Cancel
              </button>
            )}
          </div>
        ) : (
          // API Key Display
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-green-600 text-lg">✓</span>
                <span className="text-green-800 font-medium">
                  API Key Configured
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Your API Key:</span>
                  <button
                    onClick={() => setShowKey(!showKey)}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    {showKey ? "Hide" : "Show"}
                  </button>
                </div>

                <div className="bg-gray-100 p-3 rounded font-mono text-sm break-all">
                  {showKey ? apiKey : maskApiKey(apiKey)}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => setIsEditing(true)}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors"
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
              <p className="text-sm text-gray-600">
                Your AI assistant is now configured and ready to help with
                LeetCode problems.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
