import express, { Response, Request } from "express";
import dotenv from "dotenv";
import cors from "cors";

import testGeminiResponse from "./test-gemini";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

app.use(express.json());
app.use(cors({ origin: FRONTEND_URL }));

app.get("/", (req: Request, res: Response) => {
  res.send("Server working fine");
  
});

app.get("/test-gemini", async (req: Request, res: Response) => {
    try {
        const text = await testGeminiResponse();
        res.json({ message: text });
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            res.status(500).json({ error: error.message });
          } else {
            console.error("Unknown error", error);
            res.status(500).json({ error: "Unexpected error occurred." });
          }
    }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});