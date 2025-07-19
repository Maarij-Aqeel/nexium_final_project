import { NextRequest, NextResponse } from "next/server";
import { interviewManager } from "@/lib/interview";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const interview = interviewManager.getById(params.id);

  
  if (!interview) {
    return NextResponse.json({ error: "Questions not found" }, { status: 404 });
  }


  return NextResponse.json(interview.questions, { status: 200 });
}
