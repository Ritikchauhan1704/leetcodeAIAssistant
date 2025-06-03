import { GoogleGenAI } from "@google/genai";

const api_key = "AIzaSyDuz23qsquLYaE1NlCH2Lank57ast_OTuw";
const model = "gemini-2.0-flash";

const solveAI = async (problemStatement: string, onChunk?: (chunk: string) => void): Promise<string> => {
  const ai = new GoogleGenAI({
    apiKey: api_key,
  });
  
  const config = {
    responseMimeType: "text/plain",
  };
  
  const prompt = `Here's a solution for: "${problemStatement}"

This appears to be a problem that requires careful analysis. Here are the key steps to solve it:

1. First, understand the problem requirements
2. Break down the problem into smaller components  
3. Implement a step-by-step solution
4. Test and validate the result

Would you like me to elaborate on any specific aspect of this solution?`;

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

  try {
    const response = await ai.models.generateContentStream({
      model,
      config,
      contents,
    });

    for await (const chunk of response) {
      const chunkText = chunk.text || "";
      fullResponse += chunkText;
      
      // Call the onChunk callback if provided (for real-time updates)
      if (onChunk && chunkText) {
        onChunk(chunkText);
      }
    }

    return fullResponse;
  } catch (error) {
    console.error('AI API Error:', error);
    return Promise.reject('Failed to get AI response');
  }
};

export default solveAI;