interface HuggingFaceResponse {
  generated_text?: string;
  score?: number;
  label?: string;
  error?: string;
}

export class HuggingFaceAPI {
  private apiToken: string;
  private baseUrl = 'https://api-inference.huggingface.co/models';

  constructor() {
    this.apiToken = process.env.HUGGINGFACE_API_TOKEN || '';
  }

  private async makeRequest(model: string, inputs: any): Promise<HuggingFaceResponse[]> {
    try {
      const response = await fetch(`${this.baseUrl}/${model}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputs }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Hugging Face API Error:', error);
      throw error;
    }
  }

  async generateText(prompt: string, model = 'gpt2'): Promise<string> {
    try {
      const response = await this.makeRequest(model, prompt);
      return response[0]?.generated_text || 'متأسفانه نمی‌توانم در حال حاضر پاسخ دهم.';
    } catch (error) {
      return 'مشکلی در ارتباط با سرور پیش آمد، لطفاً دوباره تلاش کنید.';
    }
  }

  async evaluateText(text: string, model = 'bert-base-multilingual-cased'): Promise<number> {
    try {
      const response = await this.makeRequest(model, text);
      return response[0]?.score ? Math.round(response[0].score * 100) : 50;
    } catch (error) {
      return 50; // Default score on error
    }
  }

  async evaluateCode(code: string, model = 'microsoft/codebert-base'): Promise<number> {
    try {
      const response = await this.makeRequest(model, code);
      return response[0]?.score ? Math.round(response[0].score * 100) : 50;
    } catch (error) {
      return 50; // Default score on error
    }
  }
}