import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import axios from "@/lib/axios";

const Booking = () => {
  const [loading, setLoading] = useState(true);
  const [therapists, setTherapists] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTherapist, setSelectedTherapist] = useState<string>("");
  const [slots, setSlots] = useState<string[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [therapistSlots, setTherapistSlots] = useState<any>({});
  const location = useLocation();

  useEffect(() => {
    const fetchTherapists = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/therapists");
        setTherapists(res.data);
        // Build a map of therapistId -> availability (if available)
        const slotsMap: any = {};
        res.data.forEach((t: any) => {
          slotsMap[t._id || t.id] = t.availability || [];
        });
        setTherapistSlots(slotsMap);
      } catch (err) {}
      setLoading(false);
    };
    fetchTherapists();
  }, []);

  useEffect(() => {
    if (location.state && location.state.therapistId) {
      setSelectedTherapist(location.state.therapistId);
    }
  }, [location.state]);

  useEffect(() => {
    if (!selectedTherapist) {
      setSlots([]);
      return;
    }
    // If we already have slots in therapistSlots, use them
    if (therapistSlots[selectedTherapist]) {
      setSlots(therapistSlots[selectedTherapist]);
      return;
    }
    // Otherwise, fetch from API
    const fetchSlots = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/therapists/${selectedTherapist}`);
        setSlots(res.data.availability || []);
      } catch (err) {}
      setLoading(false);
    };
    fetchSlots();
  }, [selectedTherapist, therapistSlots]);

  const handleBook = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        "/api/appointments/book",
        {
          therapistId: selectedTherapist,
          date: selectedDate,
          time: selectedSlot
        },
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : undefined
          }
        }
      );
      alert("Session booked!");
    } catch (err: any) {
      alert(err.response?.data?.message || "Booking failed");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <header className="border-b border-white/20 backdrop-blur-sm bg-white/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center space-x-4">
          <Link to="/dashboard">
            <Button variant="ghost" size="sm">
              Back
            </Button>
          </Link>
          <Calendar className="h-8 w-8 text-indigo-600" />
          <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Book a Session
          </span>
        </div>
      </header>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Schedule a Therapy Session</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <label className="block mb-2 font-medium">Select Therapist</label>
              <select className="w-full border rounded p-2" value={selectedTherapist} onChange={e => setSelectedTherapist(e.target.value)}>
                <option value="">Choose...</option>
                {therapists.map(t => <option key={t._id} value={t._id}>{t.name}</option>)}
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-medium">Select Date</label>
              <input type="date" className="w-full border rounded p-2" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} />
            </div>
            {slots.length > 0 ? (
              <div className="mb-4">
                <label className="block mb-2 font-medium">Select Time Slot</label>
                <select className="w-full border rounded p-2" value={selectedSlot} onChange={e => setSelectedSlot(e.target.value)}>
                  <option value="">Choose...</option>
                  {slots.map((slot, i) => <option key={i} value={slot}>{slot}</option>)}
                </select>
              </div>
            ) : selectedTherapist && (
              <div className="mb-4 text-red-500">No available slots for this therapist.</div>
            )}
            <Button className="w-full" onClick={handleBook} disabled={!selectedTherapist || !selectedDate || !selectedSlot}>Book Session</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Booking; 