import { GoogleGenAI } from "@google/genai";

const model = "gemini-2.0-flash";

type FunctionType = "explain" | "solve" | "debug";

// Function to get API key from localStorage
const getApiKey = async (): Promise<string> => {
  const result = await chrome.storage.local.get(["gemini_api_key"]);
  const apiKey = result.gemini_api_key;
  console.log(apiKey);
  if (!apiKey) {
    throw new Error(
      "API key not found. Please configure your Gemini API key first."
    );
  }
  return apiKey;
};

const solveAI = async (
  problemStatement: string,
  functionType: FunctionType,
  code?: string
): Promise<string> => {
  try {
    const apiKey = await getApiKey();

    const ai = new GoogleGenAI({
      apiKey: apiKey,
    });

    const config = {
      responseMimeType: "text/plain",
    };

    let prompt = "";

    switch (functionType) {
      case "explain":
        prompt = `
Please explain this LeetCode problem in detail:

**Problem:** ${problemStatement}

Please provide:
1. **Problem Understanding**: What is the problem asking for?
2. **Key Concepts**: What algorithms/data structures are relevant?
3. **Approach**: What are the different ways to solve this?
4. **Complexity**: Time and space complexity considerations
5. **Edge Cases**: What special cases should be considered?

Make the explanation clear and beginner-friendly.
        `;
        break;

      case "solve":
        prompt = `
Please provide a complete solution for this LeetCode problem:

**Problem:** ${problemStatement}

${code ? `**Current Code Attempt:**\n\`\`\`\n${code}\n\`\`\`\n` : ""}

Please provide:
1. **Complete Working Solution** (in current language)
2. **Step-by-Step Explanation** of the algorithm
3. **Code Walkthrough** explaining each part
4. **Time & Space Complexity** analysis
5. **Alternative Approaches** if applicable

${
  code
    ? "Also compare with the current code attempt and suggest improvements."
    : ""
}

Format the code clearly with proper syntax highlighting.
        `;
        break;

      case "debug":
        prompt = `
Please help debug and fix this code for the LeetCode problem:

**Problem:** ${problemStatement}

**Current Code:**
\`\`\`
${code}
\`\`\`

Please provide:
1. **Error Analysis**: What's wrong with the current code?
2. **Fixed Code**: Corrected version with explanations
3. **Explanation**: Why the errors occurred

Be specific about syntax errors, logical errors, and optimization opportunities.
        `;
        break;
    }

    const contents = [
      {
        role: "user",
        parts: [
          {
            text: prompt,
          },
        ],
      },
    ];

    let fullResponse = "";

    const response = await ai.models.generateContentStream({
      model,
      config,
      contents,
    });

    for await (const chunk of response) {
      const chunkText = chunk.text || "";
      fullResponse += chunkText;
    }

    return fullResponse;
  } catch (error) {
    console.error("AI API Error:", error);

    // Handle specific error cases
    if (error instanceof Error) {
      if (error.message.includes("API key not found")) {
        return "❌ **API Key Required**\n\nPlease configure your Gemini API key in the extension settings first.\n\n1. Click on the extension icon\n2. Enter your Gemini API key\n3. Try again";
      }

      if (error.message.includes("API_KEY_INVALID")) {
        return "❌ **Invalid API Key**\n\nYour API key appears to be invalid. Please check and update it in the extension settings.";
      }

      if (error.message.includes("QUOTA_EXCEEDED")) {
        return "❌ **Quota Exceeded**\n\nYour API quota has been exceeded. Please check your Google AI Studio dashboard.";
      }
    }

    return "❌ **Error**\n\nFailed to get AI response. Please try again or check your API key configuration.";
  }
};

export default solveAI;
