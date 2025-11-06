import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const generateQuiz = async (transcript) => {
  const googleai = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
  const model = googleai.getGenerativeModel({ model: "gemini-1.5-flash" });
  // Your prompt
  const prompt = `
Given the following transcript:
${transcript}
Generate 3 multiple-choice questions. Each question should have a question text and 4 options, with exactly one option marked as correct. Format the output as a JSON array of objects, where each object has a "question" (string) and "options" array. Each option object should have "option" (string) and "isCorrect" (boolean) fields. Ignore the sponsor messages and generate quiz on core things.
`;

  // Your config
  const config = {
    responseMimeType: "application/json",
    responseSchema: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          question: { type: "STRING" },
          options: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: {
                option: { type: "STRING" },
                isCorrect: { type: "BOOLEAN" },
              },
            },
          },
        },
      },
    },
  };
  const response = await model.generateContent(prompt, config);
  const caption_str = response.response.text();
  console.log("caption_str", caption_str);
  const cleaned = caption_str
    .replace(/^\s*```(?:json)?\s*/i, "")
    .replace(/\s*```\s*$/, "")
    .trim();
  const jaonparsed = JSON.parse(cleaned);
  return jaonparsed;
};

export default generateQuiz;
