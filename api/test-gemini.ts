import dotenv from 'dotenv';
dotenv.config();

// import { VercelRequest, VercelResponse} from "@vercel/node";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function testGeminiResponse() {
try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) throw new Error("API key for Gemini not found.");

    const ai = new GoogleGenerativeAI(apiKey);

    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent({
        contents: [
            {
                role: "user",
                parts: [{text: "Hello, are you there?"}]
            }
        ],
        generationConfig: {
            temperature: 0.7
        },
        systemInstruction: {
            role: "system",
            parts: [
                {
                    text: "All your answers rhyme."
                }
            ]
        }
    });

    const response = await result.response;
    const text = response.text();
    return text; 
} catch (error) {
    if (error instanceof Error) {
        console.error("Error found: " + error.message);
    } else {
        console.error(error);
    }
}
}
