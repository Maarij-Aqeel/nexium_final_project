import { retrieveQuestions } from "@/lib/n8n";

export async function POST(req: Request) {
  const interview = await req.json();
  const data = await retrieveQuestions(interview);
  return Response.json(data);
}
