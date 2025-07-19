// lib/n8n.ts
export async function retrieveQuestions(interview:any) {
  const res = await fetch("https://maarji-aqeel.app.n8n.cloud/webhook-test/generate_questions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      domain: interview.title,
      difficulty: interview.difficulty,
    }),
  });

  if (!res.ok) return null;
  return res.json();
}
