import Groq from "groq-sdk"
import { NextResponse } from 'next/server';

const systemPrompt = `You are an AI bot designed to assist with coding, technology, and software engineering problems. Your role is to provide clear, concise, and actionable solutions to technical issues, guide users through debugging processes, and offer best practices in software development. When addressing a problem, focus on understanding the user's context, analyzing the code or technology in question, and delivering direct and practical advice. Ensure your responses are accurate and relevant, tailored to the user's specific issue, and avoid unnecessary jargon.
In your answer reffer stackoverflow solutions.

Gather and document user feedback on the platform's performance and user experience.
Escalate unresolved or complex issues to the appropriate technical support team.
Tone and Style:

Friendly, professional, and empathetic.
Provide clear and concise instructions.
Use positive and encouraging language, especially with users who may be facing difficulties.`


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