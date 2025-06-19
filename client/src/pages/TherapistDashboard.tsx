import axios from "@/lib/axios";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, MessageCircle, Users, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";

const TherapistDashboard = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>({});
  const [slots, setSlots] = useState<string>("");
  const [appointments, setAppointments] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [profileRes, appointmentsRes, messagesRes] = await Promise.all([
          axios.get("/api/therapists/profile"),
          axios.get("/api/therapists/appointments"),
          axios.get("/api/therapists/messages")
        ]);
        setProfile(profileRes.data);
        setSlots(profileRes.data.availability || "");
        setAppointments(appointmentsRes.data.appointments || []);
        setMessages(messagesRes.data.messages || []);
      } catch (err) {}
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleProfileUpdate = async () => {
    await axios.put("/api/therapists/profile", profile);
    alert("Profile updated!");
  };
  const handleSlotsUpdate = async () => {
    await axios.put("/api/therapists/slots", { slots });
    alert("Slots updated!");
  };
  const handleAccept = async (id: string) => {
    await axios.post("/api/therapists/accept", { appointmentId: id });
    setAppointments(appointments.filter(a => a._id !== id));
  };
  const handleReject = async (id: string) => {
    await axios.post("/api/therapists/reject", { appointmentId: id });
    setAppointments(appointments.filter(a => a._id !== id));
  };

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
        <div className="grid md:grid-cols-2 gap-8">
          {/* Profile Management */}
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <Input value={profile.name || ""} onChange={e => setProfile({ ...profile, name: e.target.value })} placeholder="Name" className="mb-2" />
              <Input value={profile.specialization || ""} onChange={e => setProfile({ ...profile, specialization: e.target.value })} placeholder="Specialization" className="mb-2" />
              <Input value={profile.bio || ""} onChange={e => setProfile({ ...profile, bio: e.target.value })} placeholder="Bio" className="mb-2" />
              <Button onClick={handleProfileUpdate}>Update Profile</Button>
            </CardContent>
          </Card>
          {/* Slot Management */}
          <Card>
            <CardHeader>
              <CardTitle>Available Slots</CardTitle>
            </CardHeader>
            <CardContent>
              <Input value={slots} onChange={e => setSlots(e.target.value)} placeholder="e.g. Mon 2-4pm, Tue 10-12am" className="mb-2" />
              <Button onClick={handleSlotsUpdate}>Update Slots</Button>
            </CardContent>
          </Card>
        </div>
        {/* Appointments */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Pending Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              {appointments.length === 0 && <div>No pending appointments.</div>}
              {appointments.map(a => (
                <div key={a._id} className="flex items-center justify-between mb-2">
                  <div>
                    <div className="font-semibold">{a.userName || "User"}</div>
                    <div className="text-sm">{a.date} {a.time}</div>
                  </div>
                  <div className="space-x-2">
                    <Button size="sm" onClick={() => handleAccept(a._id)}>Accept</Button>
                    <Button size="sm" variant="destructive" onClick={() => handleReject(a._id)}>Reject</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        {/* Messages (AI-to-human handover) */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Messages (AI-to-Human Handover)</CardTitle>
            </CardHeader>
            <CardContent>
              {messages.length === 0 && <div>No messages.</div>}
              {messages.map(m => (
                <div key={m._id} className="mb-2">
                  <div className="font-semibold">{m.userName || "User"}</div>
                  <div className="text-sm">{m.message}</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TherapistDashboard; 