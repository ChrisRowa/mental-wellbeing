import axios from "axios";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, MessageCircle, Users, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const TherapistDashboard = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [slots, setSlots] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [profileRes, apptRes] = await Promise.all([
          axios.get("/api/therapists/profile"),
          axios.get("/api/therapists/appointments")
        ]);
        setProfile(profileRes.data);
        setAppointments(apptRes.data.appointments || []);
        setSlots(profileRes.data.availability || []);
      } catch (err) {}
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <header className="border-b border-white/20 backdrop-blur-sm bg-white/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/therapists" className="flex items-center space-x-2">
            <Users className="h-8 w-8 text-indigo-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Therapist Panel
            </span>
          </Link>
          <div className="flex items-center space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={profile?.avatar || "/placeholder.svg"} />
              <AvatarFallback>TD</AvatarFallback>
            </Avatar>
            <span className="hidden md:block text-sm font-medium">{profile?.name || user?.name || "Therapist"}</span>
          </div>
        </div>
      </header>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Welcome, {profile?.name?.split(' ')[0] || user?.name?.split(' ')[0] || "Therapist"}</h1>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Profile & Specialization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={profile?.avatar || "/placeholder.svg"} />
                <AvatarFallback>TD</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-semibold">{profile?.name || user?.name || "Therapist"}</div>
                <div className="text-gray-600">{profile?.email || user?.email || "therapist@example.com"}</div>
                <div className="mt-2">
                  {profile?.specialization?.map((spec, i) => (
                    <span key={i} className="inline-block bg-indigo-100 text-indigo-700 px-2 py-1 rounded mr-2 text-xs">{spec}</span>
                  ))}
                </div>
              </div>
            </div>
            {/* TODO: Add edit profile functionality */}
          </CardContent>
        </Card>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Available Time Slots</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="mb-2">
              {slots.map((slot, i) => (
                <li key={i} className="text-gray-700">{slot}</li>
              ))}
            </ul>
            <Button size="sm">Edit Slots</Button>
            {/* TODO: Implement slot management */}
          </CardContent>
        </Card>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              {appointments.map((appt) => (
                <li key={appt.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                  <span>{appt.user} - {appt.date}</span>
                  <span className="capitalize text-xs px-2 py-1 rounded bg-indigo-100 text-indigo-700 ml-2">{appt.status}</span>
                  <Button size="sm" variant="outline">View</Button>
                  {/* TODO: Accept/Reject logic */}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <p>View and respond to user messages here.</p>
            {/* TODO: Implement message viewing and AI handover */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TherapistDashboard; 