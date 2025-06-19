import { FEEBACK_PROMPT } from "@/services/Constants";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export const openai = new OpenAI({ apiKey: process.env.OPENAI_APIKEY });

export const runtime = 'nodejs';


export async function POST(req: NextRequest) {
    const { conversation } = await req.json();

    const FINAL_PROMPT = FEEBACK_PROMPT.replace('{{conversation}}', conversation);

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
    return NextResponse.json(content, { status: 200 })
}