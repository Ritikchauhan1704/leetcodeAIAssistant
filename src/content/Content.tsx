import { useEffect } from "react";
import Chat from "../components/Chat";

export default function Content() {
  const content = document.querySelector("meta[name=description]")
  const problemStatment = content?.getAttribute("content") || ""
  useEffect(() => {
  }, []);
  return (
    <div className="fixed top-4 left-4 z-[999999] bg-black text-white px-4 py-2 rounded-xl shadow-lg text-lg font-semibold">
      <Chat problemStatement={problemStatment} />
    </div>
  );
}
