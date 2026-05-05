import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import ComprehensiveDashboard from './components/ComprehensiveDashboard';
import ComprehensiveTrackingForms from './components/ComprehensiveTrackingForms';
import MusicTherapyPlayer from './components/MusicTherapyPlayer';
import ProfessionalHelpCenter from './components/ProfessionalHelpCenter';
import AuthenticationPages from './components/AuthenticationPages';
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { 
  Heart, 
  Activity, 
  Moon, 
  Brain, 
  Music, 
  Users, 
  BarChart3,
  Calendar,
  Menu,
  X,
  Settings,
  LogOut,
  User
} from 'lucide-react';
import './App.css';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  joinDate: string;
}

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Check authentication status on app load
  useEffect(() => {
    const token = localStorage.getItem('lifepulse_token');
    const userData = localStorage.getItem('lifepulse_user');
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('lifepulse_token');
        localStorage.removeItem('lifepulse_user');
      }
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('lifepulse_token');
    localStorage.removeItem('lifepulse_user');
    setUser(null);
    setIsAuthenticated(false);
    setCurrentPage('home');
  };

  const NavigationItem = ({ 
    page, 
    icon: Icon, 
    label, 
    badge 
  }: { 
    page: string; 
    icon: React.ComponentType<any>; 
    label: string; 
    badge?: string;
  }) => (
    <button
      onClick={() => {
        setCurrentPage(page);
        setIsMobileMenuOpen(false);
      }}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all w-full text-left ${
        currentPage === page
          ? 'bg-blue-100 text-blue-700 font-medium'
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      <Icon className="h-5 w-5" />
      <span className="hidden md:inline">{label}</span>
      {badge && <Badge variant="secondary" className="ml-auto">{badge}</Badge>}
    </button>
  );

  const LandingPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </div>
  );

  const DashboardLayout = () => (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - Desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 bg-white border-r border-gray-200">
          {/* Logo */}
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4 mb-8">
              <Heart className="h-8 w-8 text-blue-600 mr-2" />
              <span className="text-xl font-bold text-gray-900">LifePulse</span>
            </div>
            
            {/* Navigation */}
            <nav className="mt-5 flex-1 px-2 space-y-2">
              <NavigationItem page="dashboard" icon={BarChart3} label="Dashboard" />
              <NavigationItem page="tracking" icon={Calendar} label="Daily Tracking" />
              <NavigationItem page="music" icon={Music} label="Music Therapy" />
              <NavigationItem page="professionals" icon={Users} label="Professional Help" />
            </nav>
          </div>
          
          {/* User Profile */}
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <div className="flex items-center w-full">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-700">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
              <button
                onClick={handleSignOut}
                className="ml-2 text-gray-400 hover:text-gray-600"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <div className="fixed inset-0 z-40 flex" style={{ display: isMobileMenuOpen ? 'flex' : 'none' }}>
          <div 
            className="fixed inset-0 bg-gray-600 bg-opacity-75"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <X className="h-6 w-6 text-white" />
              </button>
            </div>
            
            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div className="flex-shrink-0 flex items-center px-4 mb-8">
                <Heart className="h-8 w-8 text-blue-600 mr-2" />
                <span className="text-xl font-bold text-gray-900">LifePulse</span>
              </div>
              
              <nav className="mt-5 px-2 space-y-2">
                <NavigationItem page="dashboard" icon={BarChart3} label="Dashboard" />
                <NavigationItem page="tracking" icon={Calendar} label="Daily Tracking" />
                <NavigationItem page="music" icon={Music} label="Music Therapy" />
                <NavigationItem page="professionals" icon={Users} label="Professional Help" />
              </nav>
            </div>
            
            {/* Mobile User Profile */}
            <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
              <div className="flex items-center w-full">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-700">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
                <button
                  onClick={handleSignOut}
                  className="ml-2 text-gray-400 hover:text-gray-600"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="md:pl-64 flex flex-col flex-1">
        {/* Mobile Header */}
        <div className="md:hidden bg-white shadow-sm border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="text-gray-600 hover:text-gray-900"
            >
              <Menu className="h-6 w-6" />
            </button>
            
            <div className="flex items-center">
              <Heart className="h-6 w-6 text-blue-600 mr-2" />
              <span className="text-lg font-bold text-gray-900">LifePulse</span>
            </div>
            
            <div className="w-6"></div> {/* Spacer for centering */}
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="py-6">
            {currentPage === 'dashboard' && <ComprehensiveDashboard />}
            {currentPage === 'tracking' && <ComprehensiveTrackingForms />}
            {currentPage === 'music' && <MusicTherapyPlayer />}
            {currentPage === 'professionals' && <ProfessionalHelpCenter />}
          </div>
        </main>
      </div>
    </div>
  );

  // Show authentication page if not logged in
  if (!isAuthenticated) {
    return (
      <div className="App">
        <AuthenticationPages />
      </div>
    );
  }

  // Show main application if authenticated
  return (
    <div className="App">
      <DashboardLayout />
    </div>
  );
};

export default App;