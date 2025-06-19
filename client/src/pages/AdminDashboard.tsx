import axios from "@/lib/axios";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, MessageCircle, Calendar, BarChart2, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [therapists, setTherapists] = useState<any[]>([]);
  const [reports, setReports] = useState<any[]>([]);
  const [chatbotUsage, setChatbotUsage] = useState<any[]>([]);
  const [aiContent, setAIContent] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [statsRes, usersRes, therapistsRes, reportsRes, chatbotRes] = await Promise.all([
          axios.get("/api/admin/reports"),
          axios.get("/api/admin/users"),
          axios.get("/api/admin/therapists"),
          axios.get("/api/admin/reports"),
          axios.get("/api/admin/chatbot")
        ]);
        setStats(statsRes.data);
        setUsers(usersRes.data.users || []);
        setTherapists(therapistsRes.data.therapists || []);
        setReports(reportsRes.data.reports || []);
        setChatbotUsage(chatbotRes.data.usage || []);
      } catch (err) {}
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleAddUser = async () => {
    await axios.post("/api/admin/users", { name: "New User" });
    alert("User added!");
  };
  const handleDeleteUser = async (id: string) => {
    await axios.delete(`/api/admin/users/${id}`);
    setUsers(users.filter(u => u._id !== id));
  };
  const handleAddTherapist = async () => {
    await axios.post("/api/admin/therapists", { name: "New Therapist" });
    alert("Therapist added!");
  };
  const handleDeleteTherapist = async (id: string) => {
    await axios.delete(`/api/admin/therapists/${id}`);
    setTherapists(therapists.filter(t => t._id !== id));
  };
  const handleAIContentUpdate = async () => {
    await axios.post("/api/admin/ai-content", { content: aiContent });
    alert("AI content updated!");
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <header className="border-b border-white/20 backdrop-blur-sm bg-white/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Settings className="h-8 w-8 text-indigo-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Admin Panel
            </span>
          </Link>
          <div className="flex items-center space-x-3">
            <span className="hidden md:block text-sm font-medium">{user?.name || "Admin"}</span>
          </div>
        </div>
      </header>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Welcome, {user?.name?.split(' ')[0] || "Admin"}</h1>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Users</CardTitle>
            </CardHeader>
            <CardContent>
              <Button onClick={handleAddUser}>Add User</Button>
              <ul>
                {users.map(u => (
                  <li key={u._id} className="flex justify-between items-center my-2">
                    <span>{u.name}</span>
                    <Button size="sm" variant="destructive" onClick={() => handleDeleteUser(u._id)}>Delete</Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Therapists</CardTitle>
            </CardHeader>
            <CardContent>
              <Button onClick={handleAddTherapist}>Add Therapist</Button>
              <ul>
                {therapists.map(t => (
                  <li key={t._id} className="flex justify-between items-center my-2">
                    <span>{t.name}</span>
                    <Button size="sm" variant="destructive" onClick={() => handleDeleteTherapist(t._id)}>Delete</Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline">View Reports</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Chatbot Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <ul>
                {chatbotUsage.map(u => (
                  <li key={u._id}>{u.detail}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>AI Content & Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <Input value={aiContent} onChange={e => setAIContent(e.target.value)} placeholder="Update AI content/resources" className="mb-2" />
              <Button onClick={handleAIContentUpdate}>Update AI Content</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 