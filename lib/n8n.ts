// lib/n8n.ts
export async function retrieveQuestions(interview: any) {
  const res = await fetch(
    "https://maaismusakhu.app.n8n.cloud/webhook/generate_questions",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        domain: interview.title,
        difficulty: interview.difficulty,
        duration: interview.duration,
      }),
    }
  );

  if (!res.ok) return null;
  return res.json();
}
