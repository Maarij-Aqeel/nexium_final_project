let questions: any = null;

export async function POST(req: Request) {
  const body = await req.json();
  questions = body.questions; // store questions
  return new Response(JSON.stringify({ success: true }));
}

export async function GET() {
  const message = [
    questions.output["Question#1"],
    ...(questions.output["Question#2"] || []),
  ].join(" ");

  return new Response(
    JSON.stringify({
      type: "say",
      message: message,
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
