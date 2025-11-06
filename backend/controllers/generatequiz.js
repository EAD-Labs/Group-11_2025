import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const generateQuiz = async ({
  transcript,
  num_questions,
  video_id,
  title,
  description,
}) => {
  const googleai = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
  const model = googleai.getGenerativeModel({ model: "gemini-2.5-flash" });
  // Your prompt
  const prompt = `
Generate As much as possible multiple-choice questions. This is youtube video with id ${video_id} and title ${title} and description ${description}. Each question should have a question text and 4 options, with exactly one option marked as correct. Format the output as a JSON array of objects, where each object has a "question" (string) and "timestamp" (number) and "options" array. Each option object should have "option" (string) and "isCorrect" (boolean) fields. Ignore the sponsor messages and generate quiz on core things. Given the following transcript:
${transcript}.
Important: Return only the array, no other text or comments.
Important: Do not use markdown formatting just give text in each field.
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
          timestamp: { type: "NUMBER" },
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

  // Improved JSON extraction - find the JSON array and extract only that part
  let cleaned = caption_str
    .replace(/^\s*```(?:json)?\s*/i, "")
    .replace(/\s*```\s*$/, "")
    .trim();

  // Find the start and end of the JSON array
  const jsonStart = cleaned.indexOf("[");
  const jsonEnd = cleaned.lastIndexOf("]") + 1;

  if (jsonStart !== -1 && jsonEnd > jsonStart) {
    cleaned = cleaned.substring(jsonStart, jsonEnd);
  }

  const jaonparsed = JSON.parse(cleaned);
  return jaonparsed;
};

export default generateQuiz;
