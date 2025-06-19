import axios from "axios";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Brain, Calendar, MessageCircle, Users, Heart, Clock, Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [upcomingAppointments, setUpcomingAppointments] = useState<any[]>([]);
  const [recentActivities, setRecentActivities] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [profileRes, bookingsRes] = await Promise.all([
          axios.get("/api/users/profile"),
          axios.get("/api/users/bookings")
        ]);
        setProfile(profileRes.data);
        setUpcomingAppointments(bookingsRes.data.appointments || []);
        setRecentActivities(bookingsRes.data.activities || []);
      } catch (err) {
        // handle error
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="border-b border-white/20 backdrop-blur-sm bg-white/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-indigo-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              WellnessCompass
            </span>
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link to="/dashboard" className="text-indigo-600 font-medium">Dashboard</Link>
            <Link to="/therapists" className="text-gray-600 hover:text-indigo-600 transition-colors">Therapists</Link>
            <Link to="/appointments" className="text-gray-600 hover:text-indigo-600 transition-colors">Appointments</Link>
            <Link to="/chat" className="text-gray-600 hover:text-indigo-600 transition-colors">AI Chat</Link>
          </nav>
          <div className="flex items-center space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>AJ</AvatarFallback>
            </Avatar>
            <span className="hidden md:block text-sm font-medium">{profile?.name || user?.name || "User"}</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Welcome back, {(profile?.name?.split(' ')[0]) || (user?.name?.split(' ')[0]) || "User"}!
          </h1>
          <p className="text-gray-600 text-lg">How are you feeling today? Your wellness journey continues here.</p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Link to="/chat">
            <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
              <CardContent className="p-6 text-center">
                <MessageCircle className="h-8 w-8 mx-auto mb-2" />
                <h3 className="font-semibold">AI Chat</h3>
                <p className="text-sm opacity-90">Get instant support</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/therapists">
            <Card className="border-0 shadow-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
              <CardContent className="p-6 text-center">
                <Users className="h-8 w-8 mx-auto mb-2" />
                <h3 className="font-semibold">Find Therapist</h3>
                <p className="text-sm opacity-90">Browse professionals</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/appointments">
            <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
              <CardContent className="p-6 text-center">
                <Calendar className="h-8 w-8 mx-auto mb-2" />
                <h3 className="font-semibold">Appointments</h3>
                <p className="text-sm opacity-90">Manage sessions</p>
              </CardContent>
            </Card>
          </Link>

          <Card className="border-0 shadow-lg bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
            <CardContent className="p-6 text-center">
              <Heart className="h-8 w-8 mx-auto mb-2" />
              <h3 className="font-semibold">Wellness</h3>
              <p className="text-sm opacity-90">Track progress</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Upcoming Appointments */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-indigo-600" />
                  <span>Upcoming Appointments</span>
                </CardTitle>
                <CardDescription>Your scheduled therapy sessions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center space-x-4 p-4 rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={appointment.avatar} />
                      <AvatarFallback>{appointment.therapist.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">{appointment.therapist}</h4>
                      <p className="text-sm text-gray-600">{appointment.type}</p>
                      <div className="flex items-center space-x-1 mt-1">
                        <Clock className="h-4 w-4 text-indigo-500" />
                        <span className="text-sm text-indigo-600 font-medium">{appointment.date}</span>
                      </div>
                    </div>
                    <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                      Join Session
                    </Button>
                  </div>
                ))}
                <Link to="/appointments">
                  <Button variant="outline" className="w-full mt-4 hover:bg-indigo-50">
                    View All Appointments
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Wellness Streak */}
            <Card className="border-0 shadow-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold mb-2">7</div>
                <p className="text-sm opacity-90">Day Wellness Streak</p>
                <Badge variant="secondary" className="mt-2 bg-white/20 text-white">
                  Keep it up! 🔥
                </Badge>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-800">{activity.message}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Chat */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6 text-center space-y-4">
                <MessageCircle className="h-12 w-12 text-indigo-600 mx-auto" />
                <div>
                  <h3 className="font-semibold mb-2">Need someone to talk to?</h3>
                  <p className="text-sm text-gray-600 mb-4">Our AI assistant is here 24/7 for emotional support</p>
                  <Link to="/chat">
                    <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                      Start Chat
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
