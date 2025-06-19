
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Calendar, MessageCircle, Users, Heart, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="border-b border-white/20 backdrop-blur-sm bg-white/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-indigo-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              WellnessCompass
            </span>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#features" className="text-gray-600 hover:text-indigo-600 transition-colors">Features</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-indigo-600 transition-colors">How It Works</a>
            <a href="#therapists" className="text-gray-600 hover:text-indigo-600 transition-colors">Therapists</a>
          </nav>
          <div className="flex space-x-3">
            <Link to="/login">
              <Button variant="outline" className="hover:bg-indigo-50">Login</Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20">
            <Heart className="h-4 w-4 text-rose-500" />
            <span className="text-sm text-gray-700">Your Mental Wellness Journey Starts Here</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
            AI-Powered Mental Wellness Support
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
            Connect with licensed therapists, get 24/7 AI emotional support, and manage your wellness journey 
            with our comprehensive mental health platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard">
              <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-lg px-8 py-3">
                Start Your Journey
              </Button>
            </Link>
            <Link to="/chat">
              <Button size="lg" variant="outline" className="text-lg px-8 py-3 hover:bg-indigo-50">
                <MessageCircle className="mr-2 h-5 w-5" />
                Chat with AI Assistant
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white/30 backdrop-blur-sm">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">Complete Wellness Ecosystem</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need for mental wellness in one secure, compassionate platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-4">
                  <MessageCircle className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">24/7 AI Support</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600 leading-relaxed">
                  Get instant emotional support, coping strategies, and wellness guidance from our AI assistant trained on mental health best practices.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">Licensed Therapists</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600 leading-relaxed">
                  Connect with qualified mental health professionals, browse specializations, and book sessions that fit your schedule.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">Smart Scheduling</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600 leading-relaxed">
                  Easy appointment booking with calendar integration, automated reminders, and seamless session management.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-12 border border-white/20">
            <Shield className="h-16 w-16 text-indigo-600 mx-auto mb-6" />
            <h3 className="text-3xl font-bold mb-4 text-gray-800">Your Privacy & Security Matter</h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              All conversations are encrypted and confidential. We follow HIPAA compliance standards 
              and never share your personal information. Your mental health journey is completely private and secure.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <h3 className="text-4xl font-bold mb-6">Ready to Start Your Wellness Journey?</h3>
          <p className="text-xl mb-8 opacity-90">
            Join thousands who have found support, guidance, and healing through our platform.
          </p>
          <Link to="/signup">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3 bg-white text-indigo-600 hover:bg-gray-100">
              Get Started Today - It's Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Brain className="h-6 w-6 text-indigo-400" />
              <span className="text-xl font-bold">WellnessCompass</span>
            </div>
            <div className="text-sm text-gray-400">
              © 2024 WellnessCompass. Your mental health matters.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
