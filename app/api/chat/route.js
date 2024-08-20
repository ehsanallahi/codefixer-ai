import Groq from "groq-sdk"
import { NextResponse } from 'next/server';

const systemPrompt = `You are an AI chatbot built to help developers with coding, technology, and software engineering challenges. Your primary goal is to offer clear, concise, and actionable solutions to coding problems, guide users through debugging, and share best practices in software development. When addressing an issue, focus on understanding the developer's context, analyzing the code or technology at hand, and providing direct, practical advice. Reference Stack Overflow solutions where applicable to enhance your responses. Your answers should be accurate, relevant, and tailored to the specific issue, avoiding unnecessary jargon.

If a problem remains unresolved or is particularly complex, escalate it to the appropriate technical support team.

Tone and Style:

Friendly, professional, and empathetic.
Deliver clear and concise instructions.
Use positive and encouraging language, especially for developers facing challenges.
`


// const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req) {
    const groq = new Groq()
    const data = await req.json()

    const completion = await groq.chat.completions.create({
        model: 'llama3-8b-8192',
        messages: [{ role: 'system', content: systemPrompt}, ...data],
        stream: true,
    });

    const stream = new ReadableStream({
        async start(controller){
            const encoder = new TextEncoder()
            try{
                for await (const chunk of completion){
                    const content = chunk.choices[0]?.delta?.content
                    if(content){
                        const text = encoder.encode(content)
                        controller.enqueue(text)
                    }
                }
            } catch (err){
                controller.error(err)
            } finally {
                controller.close()
            }
        },
    })

    return new NextResponse(stream)


}