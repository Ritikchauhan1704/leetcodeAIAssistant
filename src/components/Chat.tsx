export default function Chat({ problemStatment }: { problemStatment: string }) {
  return (
    <div>
      <div className="fixed top-4 left-4 z-[999999] bg-black text-white px-4 py-2 rounded-xl shadow-lg text-lg font-semibold">
        <h1>Chat with AI</h1>
        <p>{problemStatment}</p>
      </div>
      {/* Add your chat UI here */}
      <div className="mt-4 p-4 bg-gray-800 rounded-lg">
        {/* Chat messages will go here */}
      </div>
      <input
        type="text"
        placeholder="Type your message..."
        className="w-full mt-2 p-2 rounded-lg bg-gray-700 text-white"
      />
      <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg">
        Send
      </button>
    </div>
  );
}
