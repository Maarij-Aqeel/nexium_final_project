// Format the questions for assistant

const FormatQuestions = (obj: any): string => {
  const questions = obj.output.questions;

  const formatted = questions
    .map((q: string, i: number) => `Question#${i + 1}: ${q}`)
    .join(",\n");

  return formatted;
};

export default FormatQuestions;
