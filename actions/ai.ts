"use server";

import Query from "@/models/query";
import db from "@/utils/db";

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export async function runAI(text: string) {
  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const result = await chatSession.sendMessage(text);
  return result.response.text();
}

export async function saveQuery(
  template: Object,
  email: string,
  query: string,
  content: string
) {
  try {
    await db();
    console.log("Connected to DB, attempting to save...");

    const newQuery = new Query({ template, email, query, content });
    await newQuery.save();
    console.log("Query saved successfully:", newQuery);

    return { ok: true };
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error saving query:", error.message);
      return { ok: false, error: error.message };
    } else {
      console.error("Unknown error:", error);
      return { ok: false, error: "An unknown error occurred" };
    }
  }
}

export async function getQueries(
  email: string,
  page: number,
  pageSize: number
) {
  try {
    await db();
    const skip = (page - 1) * pageSize;
    const totalQueries = await Query.countDocuments({ email });

    const queries = await Query.find({ email })
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 });

    return {
      queries,
      totalPages: Math.ceil(totalQueries / pageSize),
    };
  } catch (error) {}
}
