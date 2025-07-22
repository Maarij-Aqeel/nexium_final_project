import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import CircularProgress from "@/components/Radix_score";

export default function Page() {
  const score = 50;

  const feedback = {
    strengths: "Good grasp of basic syntax and logical structure.",
    needed_improvements: "Lacked detail in time complexity explanation.",
  };

  const scoreMessage =
    score >= 85
      ? "Outstanding performance!"
      : score >= 70
      ? "Great job, room for polish!"
      : score >= 50
      ? "Decent start, keep practicing!"
      : "Needs improvement — don’t give up!";

  return (
    <div className="bg-hero-gradient flex flex-col items-center justify-center min-h-screen px-4 py-8 space-y-12">
      <h1 className="text-center text-3xl md:text-5xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-bold">
        Interview Results
      </h1>

      {/* Score Card */}
      <Card className="px-8 py-10 w-full max-w-sm backdrop-blur-md bg-[#0F1521] border border-white/10 rounded-2xl shadow-xl">
        <CardTitle className="text-center text-2xl font-semibold text-white mb-4">
          Overall Score
        </CardTitle>
        <CardContent className="flex justify-center">
          <CircularProgress value={score} />
        </CardContent>
        <CardDescription className="text-center text-lg text-gray-300 ">
          {scoreMessage}
        </CardDescription>
      </Card>

      {/* Feedback Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-14 w-full max-w-5xl ">
        {/* Strengths */}
        <Card className="p-6 bg-[#0F1521] backdrop-blur-md border border-white/10 rounded-xl shadow-md">
          <CardHeader>
            <img
              src={
                "https://img.icons8.com/?size=100&id=uEYO02ekLzVD&format=png&color=000000"
              }
            />
            <CardTitle className="text-2xl font-semibold text-white">
              Strengths
            </CardTitle>
            <CardDescription className="text-gray-300 mt-2">
              {feedback.strengths}
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Areas of Improvement */}
        <Card className="p-6 bg-[#0F1521] backdrop-blur-md border border-white/10 rounded-xl shadow-md">
          <CardHeader>
            <img
              src={
                "https://img.icons8.com/?size=100&id=117363&format=png&color=000000"
              }
            />
            <CardTitle className="text-2xl font-semibold text-white">
              Areas for Improvement
            </CardTitle>
            <CardDescription className="text-gray-300 mt-2">
              {feedback.needed_improvements}
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
