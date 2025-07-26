// Api route for getting Question/Answers
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { insertsessions } from "@/lib/db/Handleinterview";

const gemini = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);
const prompt = `# Objective
You are a professional programming evaluator.  
You will be given a programming question and a corresponding spoken answer transcribed from audio, which may include minor ambiguities, filler words, or transcription issues.

Your task is to:
- Evaluate the user's overall programming understanding, reasoning ability, and clarity.
- Consider all answers as a whole.
- Ignore minor transcription flaws unless they impact technical meaning.

### Provide:
- An overall numerical score between 0 and 100.
- A concise and specific feedback message summarizing strengths and areas needing improvement in **bullet points**.

# Output Format
Return strictly a **valid JSON object** with the following structure:


{
  "score": <integer between 0 and 100>,
  "feedback": {
    "strengths": "<short, meaningful bullet points summary of what was done well>",
    "needed_improvements": "<clear, constructive bullet points summary of what needs improvement>"
  }
}

`;

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const structedData = data.message.analysis.structuredData.output;
    if (!structedData)
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });

    const interviewId =
      data.message.call.assistantOverrides.variableValues.interviewId;
    const userId = data.message.call.assistantOverrides.variableValues.userId;
    const assignedBy =
      data?.message?.call.assistantOverrides?.variableValues?.assignedBy;
    const startedAt = data?.message?.startedAt;
    const completedAt = data?.message?.endedAt;
    const questionArray: { question: any; answer: any }[] = [];

    if (!interviewId || !userId) {
      return NextResponse.json(
        { error: "Missing required IDs" },
        { status: 400 }
      );
    }

    let user_response = "";
    for (const [question, answer] of Object.entries(structedData)) {
      user_response += `Question: ${question}\nAnswer: ${answer}\n\n`;
      questionArray.push({ question, answer });
    }

    const model = gemini.getGenerativeModel({
      model: "gemini-2.5-pro",
      systemInstruction: prompt,
      generationConfig: { responseMimeType: "application/json" },
    });

    const output = await model.generateContent(user_response);
    const result = output.response.text();
    const parsed = JSON.parse(result);

    await insertsessions(
      {
        interview_id: interviewId,
        student_id: userId,
        scores: parsed.score,
        status: "Completed",
        questions: questionArray,
        feedback: parsed.feedback,
        assignedBy: assignedBy,
        startedAt: startedAt,
        completedAt: completedAt,
      },
      true
    );
    // insertsessions()
    return NextResponse.json({ success: "Request completed" }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to generate content or parse ", err },
      { status: 500 }
    );
  }
}
