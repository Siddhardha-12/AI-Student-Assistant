const express = require("express");
const dotenv = require("dotenv");
const { GoogleGenAI } = require("@google/genai");
const { marked } = require("marked");

dotenv.config();

const app = express();
const PORT = 3000;

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

app.use(express.json());
app.use(express.static(__dirname));

app.post("/ask", async (req, res) => {
    try {
        const question = req.body.question;

        if (!question) {
            return res.status(400).json({
                error: "Please enter a question."
            });
        }

        console.log("Question:", question);

        const models = [
            "gemini-3.5-flash-lite",
            "gemini-3.6-flash",
            "gemini-3.7-flash"
        ];

        let response = null;
        let lastError = null;

        for (const model of models) {
            try {
                console.log(`Trying model: ${model}`);

                response = await ai.models.generateContent({
                    model: model,
                    contents: question,
                    config: {
                        systemInstruction:
                            "You are an AI Student Assistant. Explain topics clearly and simply for college students."
                    }
                });

                console.log(`Success with: ${model}`);
                break;

            } catch (error) {
                lastError = error;
                console.log(`${model} failed. Trying next model...`);
            }
        }

        if (!response) {
            throw lastError;
        }

      res.json({
    answer: marked.parse(response.text)
       });

    } catch (error) {
        console.error("GEMINI ERROR:", error);

        res.status(500).json({
            error: error.message || "AI service is temporarily unavailable."
        });
    }
});

app.listen(PORT, () => {
    console.log(`AI Student Assistant running at http://localhost:${PORT}`);
});