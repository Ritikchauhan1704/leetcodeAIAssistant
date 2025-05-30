import { useEffect } from "react";

export default function Content() {
  const content = document.querySelector("meta[name=description]")
  const problemStatment = content?.getAttribute("content")

  console.log('====================================');
  console.log(problemStatment);
  console.log('====================================');
  useEffect(() => {
  }, []);
  return (
    <div className="fixed top-4 left-4 z-[999999] bg-black text-white px-4 py-2 rounded-xl shadow-lg text-lg font-semibold">
      hello world
    </div>
  );
}
