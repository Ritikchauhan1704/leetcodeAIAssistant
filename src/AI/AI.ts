import { GoogleGenAI } from "@google/genai";
import { LEETCODE_PROMPTS } from "../constants/prompt";
import { ApiKeyService } from "./apiKey";

const model = "gemini-2.0-flash";

type FunctionType = "explain" | "solve" | "debug";

const apiKeyService: ApiKeyService = new ApiKeyService();

const solveAI = async (
  problemStatement: string,
  functionType: FunctionType,
  code?: string,
  language?: string
): Promise<string | AsyncIterable<string>> => {
  try {
    const apiKey = await apiKeyService.getApiKey();

    const ai = new GoogleGenAI({
      apiKey: apiKey,
    });

    const config = {
      responseMimeType: "text/plain",
    };

    let prompt = "";

    switch (functionType) {
      case "explain":
        prompt = LEETCODE_PROMPTS.explain({ problemStatement });
        break;

      case "solve":
        prompt = LEETCODE_PROMPTS.solve({ problemStatement, code });
        break;

      case "debug":
        prompt = LEETCODE_PROMPTS.debug({ problemStatement, code: code!, language });
        break;

      default:
        throw new Error(`Unknown function type: ${functionType}`);
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

    const rawStream = await ai.models.generateContentStream({
      model,
      config,
      contents,
    });

        // map raw chunks to plain text
    async function* textStream(): AsyncIterable<string> {
      for await (const chunk of rawStream) {
        yield chunk.text || "";
      }
    }
    return textStream();
  } catch (error) {
    console.error("AI API Error:", error);

    // Handle specific error cases
    if (error instanceof Error) {
      if (error.message.includes("API key not found")) {
        return "**API Key Required**\n\nPlease configure your Gemini API key in the extension settings first.\n\n1. Click on the extension icon\n2. Enter your Gemini API key\n3. Try again";
      }

      if (error.message.includes("API_KEY_INVALID")) {
        return "**Invalid API Key**\n\nYour API key appears to be invalid. Please check and update it in the extension settings.";
      }

      if (error.message.includes("QUOTA_EXCEEDED")) {
        return "**Quota Exceeded**\n\nYour API quota has been exceeded. Please check your Google AI Studio dashboard.";
      }
    }
    return Promise.resolve("**Error**\n\nFailed to get AI response. Please try again or check your API key configuration.");
  }
};

export default solveAI;
