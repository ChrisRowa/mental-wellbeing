import { useEffect, useState } from "react";
import axios from "@/lib/axios";

const Appointments = () => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/users/bookings").then(res => {
      setAppointments(res.data.appointments || []);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">All Appointments</h1>
      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <ul className="space-y-4">
          {appointments.map((appt) => (
            <li key={appt.id} className="p-4 border rounded shadow">
              <div><strong>Therapist:</strong> {appt.therapist}</div>
              <div><strong>Date:</strong> {appt.date}</div>
              <div><strong>Type:</strong> {appt.type}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Appointments; 