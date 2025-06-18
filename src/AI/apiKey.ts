export class ApiKeyService {
  private static readonly STORAGE_KEY = "gemini_api_key";

  async getApiKey(): Promise<string> {
    const result = await chrome.storage.local.get([ApiKeyService.STORAGE_KEY]);
    const apiKey = result[ApiKeyService.STORAGE_KEY];

    console.log("Retrieved API key:", apiKey ? "***PRESENT***" : "MISSING");

    if (!apiKey) {
      throw new ApiKeyError(
        "API key not found. Please configure your Gemini API key first."
      );
    }

    return apiKey;
  }

  async setApiKey(apiKey: string): Promise<void> {
    if (!apiKey || apiKey.trim().length === 0) {
      throw new ApiKeyError("API key cannot be empty");
    }

    await chrome.storage.local.set({
      [ApiKeyService.STORAGE_KEY]: apiKey.trim(),
    });
  }

  async removeApiKey(): Promise<void> {
    await chrome.storage.local.remove([ApiKeyService.STORAGE_KEY]);
  }

  async hasApiKey(): Promise<boolean> {
    try {
      await this.getApiKey();
      return true;
    } catch {
      return false;
    }
  }
}

export class ApiKeyError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ApiKeyError";
  }
}
