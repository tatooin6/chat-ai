import dotenv from 'dotenv';
dotenv.config();

// import { VercelRequest, VercelResponse} from "@vercel/node";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function testGeminiResponse() {
    try {
        const { 
            model, 
            generationConfig, 
            systemInstruction 
        } = getAiTools();

        const result = await model.generateContent({
        contents: [
            {
                role: "user",
                parts: [{text: "Hello, are you there?"}]
            }
        ],
        generationConfig,
        systemInstruction
    });
    const response = await result.response;
    return response.text();
} catch (error) {
    if (error instanceof Error) {
        console.error("Error found: " + error.message);
    } else {
        console.error(error);
    }
}
}

function getAiTools() {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) throw new Error("API key for Gemini not found.");
        const ai = new GoogleGenerativeAI(apiKey);
        const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
        const systemInstruction = {
            role: "system",
            parts: [
                {
                    text: "All your answers rhyme."
                }
            ]
        };
        const generationConfig = {
            temperature: 0.7
        };
        return { model, generationConfig, systemInstruction };
}

export async function promptResponse(text: string) {
    try {
        const { 
            model, 
            generationConfig, 
            systemInstruction 
        } = getAiTools();

        const result = await model.generateContent({
            generationConfig,
            systemInstruction,
            contents: [
                {
                    role: "user",
                    parts: [{text}]
                }
            ],
        });
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error(error);
    }
}
