import { QUESTION_PROMPT } from "@/services/Constants";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export const openai = new OpenAI({ apiKey: process.env.OPENAI_APIKEY });

export async function POST(req: NextRequest) {
    const { jobTitle, jobDescription, type, duration } = await req.json();

    const FINAL_PROMPT = QUESTION_PROMPT
        .replace('{{jobTitle}}', jobTitle)
        .replace('{{jobDescription}}', jobDescription)
        .replace('{{duration}}', duration)
        .replace('{{type}}', type);

    const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
            {
                role: 'system',
                content: 'You are a helpful assistant that outputs structured interview questions in JSON format only.',
            },
            {
                role: 'user',
                content: FINAL_PROMPT,
            },
        ],
        temperature: 0.5,
        max_tokens: 1000,
    });

    const content = completion.choices[0].message.content || '';

    let questions: string[] = [];

    try {
        // Extract just the JSON part from the content
        const jsonStart = content.indexOf('[');
        const jsonEnd = content.lastIndexOf(']') + 1;
        const jsonString = content.slice(jsonStart, jsonEnd);

        const parsed = JSON.parse(jsonString);

        // Extract just the `question` values
        questions = parsed.map((q: { question: string }) => q.question);
    } catch (err) {
        console.error('Failed to parse questions:', err);
        return NextResponse.json({
            success: false,
            error: 'Invalid format from AI',
        });
    }

    return NextResponse.json({
        success: true,
        questions,
    });
}
