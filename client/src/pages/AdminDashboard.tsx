import axios from "axios";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, MessageCircle, Calendar, BarChart2, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [therapists, setTherapists] = useState<any[]>([]);
  const [reports, setReports] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [statsRes, usersRes, therapistsRes, reportsRes] = await Promise.all([
          axios.get("/api/admin/reports"),
          axios.get("/api/admin/users"),
          axios.get("/api/admin/therapists"),
          axios.get("/api/admin/reports")
        ]);
        setStats(statsRes.data);
        setUsers(usersRes.data);
        setTherapists(therapistsRes.data);
        setReports(reportsRes.data);
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
              <CardTitle>Manage Users</CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline">View All Users</Button>
              {/* TODO: Implement user management */}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Manage Therapists</CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline">View All Therapists</Button>
              {/* TODO: Implement therapist management */}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Reports & Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline">View Reports</Button>
              {/* TODO: Implement reports and analytics */}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Chatbot Monitoring</CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline">Monitor Chatbot</Button>
              {/* TODO: Implement chatbot usage monitoring */}
            </CardContent>
          </Card>
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>AI Content & Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline">Control AI Content</Button>
              {/* TODO: Implement AI content/resource management */}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 