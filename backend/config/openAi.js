import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPEN_API_KEY,
  baseURL: process.env.OPEN_API_BASE_URL,
});

export default openai;
