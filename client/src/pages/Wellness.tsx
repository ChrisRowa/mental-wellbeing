import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Wellness = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <header className="border-b border-white/20 backdrop-blur-sm bg-white/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center space-x-4">
          <Link to="/dashboard">
            <button className="text-indigo-600 font-medium">Back</button>
          </Link>
          <Heart className="h-8 w-8 text-rose-500 ml-4" />
          <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent ml-2">
            Wellness Progress
          </span>
        </div>
      </header>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Wellness Streak</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold mb-2">7</div>
            <div className="text-gray-600 mb-4">Day streak of daily check-ins</div>
            <div className="bg-green-100 text-green-700 px-3 py-1 rounded inline-block">Keep it up! 🔥</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Mood Check-In</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2 mb-4">
              <button className="px-4 py-2 rounded bg-blue-100 text-blue-700">😊 Good</button>
              <button className="px-4 py-2 rounded bg-yellow-100 text-yellow-700">😐 Okay</button>
              <button className="px-4 py-2 rounded bg-red-100 text-red-700">😔 Bad</button>
            </div>
            <div className="text-gray-500 text-sm">(Mood tracking coming soon...)</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Wellness; 