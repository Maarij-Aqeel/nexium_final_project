import { Card, CardContent } from "./ui/card";
import { AlertCircle } from "lucide-react";

export default function Error({ msg }: { msg: string }) {
  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-hero-gradient">
      <Card className="w-full max-w-md bg-gray-900/50 backdrop-blur-sm text-white border-gray-700">
        <CardContent className="p-6 text-center">
          <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
          <p className="text-lg text-gray-300">{msg}</p>
        </CardContent>
      </Card>
    </div>
  );
}
