
import { GoogleGenAI, Type } from "@google/genai";
import { SurveyResponse, AIAnalysisResult } from "../types";

export const analyzeFeedback = async (responses: SurveyResponse[]): Promise<AIAnalysisResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const prompt = `
    Analyze the following product validation survey responses for a new app idea.
    Responses: ${JSON.stringify(responses)}
    
    Provide a detailed analysis including:
    1. A summary of user sentiment.
    2. 3-5 key recurring themes/pain points.
    3. 3 suggested features based on the feedback.
    4. An estimated Product-Market Fit score from 0-100.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING },
          keyThemes: { 
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          suggestedFeatures: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          marketFitScore: { type: Type.NUMBER }
        },
        required: ["summary", "keyThemes", "suggestedFeatures", "marketFitScore"]
      }
    }
  });

  const text = response.text || "{}";
  return JSON.parse(text);
};
