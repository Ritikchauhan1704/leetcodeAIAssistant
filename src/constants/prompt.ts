export interface PromptParams {
  problemStatement: string;
  code?: string;
}

export const LEETCODE_PROMPTS = {
  explain: ({ problemStatement }: PromptParams): string =>
    `
    Please explain this LeetCode problem in detail:

    **Problem:** ${problemStatement}

    Please provide:
    1. **Problem Understanding**: What is the problem asking for?
    2. **Key Concepts**: What algorithms/data structures are relevant?
    3. **Approach**: What are the different ways to solve this?
    4. **Complexity**: Time and space complexity considerations
    5. **Edge Cases**: What special cases should be considered?

    Make the explanation clear and beginner-friendly.
  `.trim(),

  solve: ({ problemStatement, code }: PromptParams): string =>
    `
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
  `.trim(),

  debug: ({ problemStatement, code }: PromptParams): string =>
    `
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
  `.trim(),
} as const;

export type FunctionType = keyof typeof LEETCODE_PROMPTS;
