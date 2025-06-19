import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Brain, Search, Star, MapPin, Clock, Calendar, ArrowLeft, Filter } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "@/lib/axios";

interface Therapist {
  id?: number;
  _id?: string;
  name: string;
  specialization: string[];
  rating: number;
  experience: string;
  location: string;
  price: string;
  availability: string;
  bio: string;
  image: string;
  verified: boolean;
}

const Therapists = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const navigate = useNavigate();

  const therapists: Therapist[] = [
    {
      id: 1,
      name: "Dr. Sarah Wilson",
      specialization: ["Anxiety", "Depression", "CBT"],
      rating: 4.9,
      experience: "8 years",
      location: "New York, NY",
      price: "$120/session",
      availability: "Available today",
      bio: "Specializing in cognitive behavioral therapy with a focus on anxiety and depression management.",
      image: "/placeholder.svg",
      verified: true
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialization: ["Stress Management", "Mindfulness", "PTSD"],
      rating: 4.8,
      experience: "12 years",
      location: "San Francisco, CA",
      price: "$140/session",
      availability: "Next available: Tomorrow",
      bio: "Experienced in trauma therapy and mindfulness-based stress reduction techniques.",
      image: "/placeholder.svg",
      verified: true
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      specialization: ["Relationship Therapy", "Family Counseling", "Communication"],
      rating: 4.7,
      experience: "6 years",
      location: "Austin, TX",
      price: "$100/session",
      availability: "Available this week",
      bio: "Passionate about helping couples and families build stronger, healthier relationships.",
      image: "/placeholder.svg",
      verified: true
    },
    {
      id: 4,
      name: "Dr. James Thompson",
      specialization: ["Addiction Recovery", "Life Coaching", "Motivation"],
      rating: 4.9,
      experience: "15 years",
      location: "Chicago, IL",
      price: "$130/session",
      availability: "Available today",
      bio: "Specializes in addiction recovery and helping clients build meaningful, purposeful lives.",
      image: "/placeholder.svg",
      verified: true
    }
  ];

  const filteredTherapists = therapists.filter(therapist => {
    const matchesSearch = therapist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         therapist.specialization.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSpecialization = selectedSpecialization === "all" || 
                                 therapist.specialization.some(spec => spec.toLowerCase().includes(selectedSpecialization.toLowerCase()));
    const matchesLocation = selectedLocation === "all" || therapist.location.includes(selectedLocation);
    
    return matchesSearch && matchesSpecialization && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="border-b border-white/20 backdrop-blur-sm bg-white/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center space-x-4">
          <Link to="/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <Brain className="h-8 w-8 text-indigo-600" />
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Find Your Therapist
            </h1>
            <p className="text-sm text-gray-600">Connect with licensed mental health professionals</p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Search and Filters */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm mb-8">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search by name or specialization..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/50"
                  />
                </div>
              </div>
              
              <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
                <SelectTrigger className="bg-white/50">
                  <SelectValue placeholder="Specialization" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Specializations</SelectItem>
                  <SelectItem value="anxiety">Anxiety</SelectItem>
                  <SelectItem value="depression">Depression</SelectItem>
                  <SelectItem value="stress">Stress Management</SelectItem>
                  <SelectItem value="relationship">Relationship Therapy</SelectItem>
                  <SelectItem value="addiction">Addiction Recovery</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="bg-white/50">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="New York">New York</SelectItem>
                  <SelectItem value="San Francisco">San Francisco</SelectItem>
                  <SelectItem value="Austin">Austin</SelectItem>
                  <SelectItem value="Chicago">Chicago</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            {filteredTherapists.length} Therapists Available
          </h2>
          <Button variant="outline" className="bg-white/50">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>

        {/* Therapist Cards */}
        <div className="grid lg:grid-cols-2 gap-6">
          {filteredTherapists.map((therapist) => (
            <Card key={therapist.id} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex space-x-4">
                  <div className="relative">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src={therapist.image} />
                      <AvatarFallback className="bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 text-lg">
                        {therapist.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    {therapist.verified && (
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">{therapist.name}</h3>
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{therapist.rating}</span>
                          </div>
                          <span className="text-gray-300">•</span>
                          <span className="text-sm text-gray-600">{therapist.experience} experience</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-indigo-600">{therapist.price}</div>
                        <div className="text-sm text-gray-600">per session</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 mb-3">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{therapist.location}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {therapist.specialization.map((spec, index) => (
                        <Badge key={index} variant="secondary" className="bg-indigo-100 text-indigo-700">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{therapist.bio}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1 text-green-600">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm font-medium">{therapist.availability}</span>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="hover:bg-indigo-50">
                          View Profile
                        </Button>
                        <Button size="sm" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700" onClick={() => navigate('/booking', { state: { therapistId: therapist._id ? therapist._id : therapist.id, therapistName: therapist.name } })}>
                          <Calendar className="h-4 w-4 mr-1" />
                          Book Session
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTherapists.length === 0 && (
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-12 text-center">
              <div className="text-gray-400 mb-4">
                <Search className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No therapists found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or filters</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Therapists;
