import { Card, CardContent } from "./ui/card";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

export default function Error({ msg }: { msg: string }) {
  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-hero-gradient">
      <Card className="w-full max-w-md rounded-3xl bg-gray-900/50 backdrop-blur-sm text-white border-gray-700">
        <CardContent className="p-6 text-center space-y-4">
          <AlertCircle className="h-12 w-12 text-red-400 mx-auto" />
          <p className="text-lg text-gray-200">{msg}</p>

          <Link href="/">
            <button className="mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all">
              Go to Home
            </button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
