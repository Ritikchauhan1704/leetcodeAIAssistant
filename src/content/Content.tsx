import Chat from "../components/Chat";
import { useState, useEffect } from "react";

export default function Content() {
  const [code, setCode] = useState("");
  const [problemStatement, setProblemStatement] = useState("");

  const getCurrentCode = () => {
    // Try Monaco Editor first
    if ((window as any)?.monaco && (window as any)?.monaco.editor) {
      const editors = (window as any).monaco.editor.getEditors();
      if (editors.length > 0) {
        return editors[0].getValue();
      }
    }

    // Try textarea
    const textarea = document.querySelector(
      ".monaco-editor textarea"
    ) as HTMLTextAreaElement;
    if (textarea) {
      return textarea.value;
    }

    // Try view lines
    const viewLines = document.querySelectorAll(".view-line");
    if (viewLines.length > 0) {
      return Array.from(viewLines)
        .map((line) => line.textContent)
        .join("\n");
    }

    return "";
  };

  const getProblemStatement = () => {
    // Try meta description first
    const metaDescription = document.querySelector("meta[name=description]");
    if (metaDescription) {
      const content = metaDescription.getAttribute("content");
      if (content) return content;
    }

    // Try to get from problem description area
    const problemDiv = document.querySelector('[data-track-load="description_content"]');
    if (problemDiv) {
      const textContent = problemDiv.textContent;
      if (textContent && textContent.length > 50) {
        return textContent.substring(0, 500) + "...";
      }
    }

    // Try to get problem title
    const titleElement = document.querySelector('h1[data-cy="question-title"]') || 
                        document.querySelector('.css-v3d350') ||
                        document.querySelector('h1');
    
    if (titleElement && titleElement.textContent) {
      return titleElement.textContent.trim();
    }

    return "";
  };

  useEffect(() => {
    const updateData = () => {
      setCode(getCurrentCode());
      setProblemStatement(getProblemStatement());
    };

    // Update every 2 seconds
    const interval = setInterval(updateData, 2000);

    // Initial update after a delay to let page load
    setTimeout(updateData, 1000);

    return () => clearInterval(interval);
  }, []);

  // Don't render if no problem statement is found
  if (!problemStatement) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-[999999] max-w-md">
      <Chat problemStatement={problemStatement} code={code} />
    </div>
  );
}