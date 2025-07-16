import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function Cards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10  px-6 py-20">
      <Card className="h-70 py-6 hover:shadow-2xl hover:border-primary hover:scale-[1.03] transition-all duration-300 ease-out rounded-2xl">
        <CardHeader className="flex flex-col items-center">
            <img src="https://img.icons8.com/?size=100&id=POBc2SrrhhnF&format=png&color=000000" alt="Product" className="mb-3 w-16 h-16 rounded-full" />
          <CardTitle className="text-2xl ">AI-Powered Analysis</CardTitle>
          <CardDescription className="mt-2 text-lg">
            Advanced AI algorithms analyze your responses in real-time and provide
            detailed feedback.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card className="h-70 py-6 hover:shadow-2xl hover:border-primary hover:scale-[1.03] transition-all duration-300 ease-out rounded-2xl">
        <CardHeader className="flex flex-col items-center">
            <img src="https://img.icons8.com/?size=100&id=110282&format=png&color=000000" alt="Product" className="mb-3 w-16 h-16 rounded-full" />
          <CardTitle className="text-2xl">Voice-Based Interface</CardTitle>
          <CardDescription className="mt-2 text-lg">
            Natural voice interactions make the interview feel like a real
            conversation.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card className="h-70 py-6 hover:shadow-2xl hover:border-primary  hover:scale-[1.03] transition-all duration-300 ease-out rounded-2xl">
        <CardHeader className="flex flex-col items-center">
            <img src="https://img.icons8.com/?size=100&id=Vki9XK1CWRYi&format=png&color=000000" alt="Product" className="mb-3 w-16 h-16 rounded-full" />
          <CardTitle className="text-2xl ">Instant Results</CardTitle>
          <CardDescription className="mt-2 text-lg">
            Get comprehensive evaluation reports immediately after your interview.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
