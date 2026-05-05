import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { 
  Phone, 
  MessageSquare, 
  AlertTriangle, 
  Heart, 
  Users, 
  BookOpen, 
  Calendar,
  MapPin,
  Clock,
  Search,
  ExternalLink,
  User,
  Mail,
  Star
} from 'lucide-react';

interface CrisisResource {
  name: string;
  phone: string;
  text?: string;
  website: string;
  description: string;
  availability: string;
  type: 'crisis' | 'support' | 'therapy';
}

interface ProfessionalProvider {
  id: string;
  name: string;
  title: string;
  specialties: string[];
  location: string;
  phone: string;
  email: string;
  website: string;
  rating: number;
  acceptingPatients: boolean;
  insuranceAccepted: string[];
  sessionTypes: string[];
  bio: string;
}

interface SelfHelpResource {
  id: string;
  title: string;
  type: 'article' | 'video' | 'exercise' | 'meditation' | 'worksheet';
  category: string;
  duration: string;
  description: string;
  url: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
}

const ProfessionalHelpCenter = () => {
  const [activeTab, setActiveTab] = useState('crisis');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [appointmentForm, setAppointmentForm] = useState({
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
    reason: '',
    notes: ''
  });

  const crisisResources: CrisisResource[] = [
    {
      name: "National Suicide Prevention Lifeline",
      phone: "988",
      text: "Text 'HELLO' to 741741",
      website: "https://suicidepreventionlifeline.org",
      description: "24/7 free and confidential support for people in distress",
      availability: "24/7",
      type: 'crisis'
    },
    {
      name: "Crisis Text Line",
      phone: "Text HOME to 741741",
      website: "https://crisistextline.org",
      description: "Free, 24/7 support for those in crisis",
      availability: "24/7",
      type: 'crisis'
    },
    {
      name: "SAMHSA National Helpline",
      phone: "1-800-662-4357",
      website: "https://samhsa.gov",
      description: "Treatment referral and information service",
      availability: "24/7",
      type: 'support'
    },
    {
      name: "National Alliance on Mental Illness",
      phone: "1-800-950-6264",
      website: "https://nami.org",
      description: "Support, education and advocacy",
      availability: "Mon-Fri 10am-10pm ET",
      type: 'support'
    },
    {
      name: "BetterHelp Online Therapy",
      phone: "1-855-435-0088",
      website: "https://betterhelp.com",
      description: "Professional online therapy and counseling",
      availability: "24/7 messaging, scheduled sessions",
      type: 'therapy'
    },
    {
      name: "Psychology Today Therapist Directory",
      phone: "1-888-563-2112",
      website: "https://psychologytoday.com",
      description: "Find local mental health professionals",
      availability: "Directory available 24/7",
      type: 'therapy'
    }
  ];

  const professionalProviders: ProfessionalProvider[] = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      title: 'Licensed Clinical Psychologist',
      specialties: ['Anxiety', 'Depression', 'CBT', 'Trauma'],
      location: 'Downtown Medical Center',
      phone: '(555) 123-4567',
      email: 'sarah.johnson@example.com',
      website: 'https://drjohnsontherapy.com',
      rating: 4.9,
      acceptingPatients: true,
      insuranceAccepted: ['Aetna', 'BlueCross', 'Cigna', 'UnitedHealth'],
      sessionTypes: ['In-person', 'Telehealth'],
      bio: 'Dr. Johnson specializes in evidence-based treatments for anxiety and depression with over 15 years of experience.'
    },
    {
      id: '2',
      name: 'Michael Chen, LCSW',
      title: 'Licensed Clinical Social Worker',
      specialties: ['Stress Management', 'Workplace Issues', 'Life Transitions'],
      location: 'Wellness Center North',
      phone: '(555) 234-5678',
      email: 'mchen@wellnesscenter.com',
      website: 'https://wellnesscenter.com/mchen',
      rating: 4.7,
      acceptingPatients: true,
      insuranceAccepted: ['Medicaid', 'Medicare', 'Aetna'],
      sessionTypes: ['In-person', 'Telehealth', 'Group'],
      bio: 'Specializing in helping professionals manage stress and navigate major life changes.'
    },
    {
      id: '3',
      name: 'Dr. Emily Rodriguez',
      title: 'Psychiatrist',
      specialties: ['Medication Management', 'Bipolar Disorder', 'ADHD'],
      location: 'University Medical Plaza',
      phone: '(555) 345-6789',
      email: 'erodriguez@umplaza.com',
      website: 'https://umplaza.com/psychiatry',
      rating: 4.8,
      acceptingPatients: false,
      insuranceAccepted: ['BlueCross', 'Cigna', 'Kaiser'],
      sessionTypes: ['In-person'],
      bio: 'Board-certified psychiatrist with expertise in medication management for mood and attention disorders.'
    }
  ];

  const selfHelpResources: SelfHelpResource[] = [
    {
      id: '1',
      title: 'Deep Breathing Exercises for Anxiety',
      type: 'exercise',
      category: 'Anxiety Management',
      duration: '5-10 minutes',
      description: 'Learn effective breathing techniques to manage anxiety and stress',
      url: '#',
      difficulty: 'beginner',
      tags: ['anxiety', 'breathing', 'relaxation']
    },
    {
      id: '2',
      title: 'Mindfulness Meditation for Beginners',
      type: 'meditation',
      category: 'Mindfulness',
      duration: '15 minutes',
      description: 'Guided meditation to develop awareness and reduce stress',
      url: '#',
      difficulty: 'beginner',
      tags: ['mindfulness', 'meditation', 'stress']
    },
    {
      id: '3',
      title: 'Understanding Cognitive Behavioral Therapy',
      type: 'article',
      category: 'Education',
      duration: '10 minutes read',
      description: 'Learn how CBT can help change negative thought patterns',
      url: '#',
      difficulty: 'intermediate',
      tags: ['CBT', 'therapy', 'thoughts']
    },
    {
      id: '4',
      title: 'Mood Tracking Worksheet',
      type: 'worksheet',
      category: 'Self-Assessment',
      duration: '20 minutes',
      description: 'Track your moods and identify patterns over time',
      url: '#',
      difficulty: 'beginner',
      tags: ['mood', 'tracking', 'patterns']
    },
    {
      id: '5',
      title: 'Progressive Muscle Relaxation',
      type: 'video',
      category: 'Relaxation',
      duration: '20 minutes',
      description: 'Video guide to systematic muscle relaxation technique',
      url: '#',
      difficulty: 'beginner',
      tags: ['relaxation', 'muscle', 'tension']
    }
  ];

  const filteredProviders = professionalProviders.filter(provider => {
    const matchesSearch = searchQuery === '' || 
      provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.specialties.some(specialty => 
        specialty.toLowerCase().includes(searchQuery.toLowerCase())
      );
    
    const matchesSpecialty = selectedSpecialty === '' ||
      provider.specialties.includes(selectedSpecialty);
    
    const matchesLocation = selectedLocation === '' ||
      provider.location.toLowerCase().includes(selectedLocation.toLowerCase());
    
    return matchesSearch && matchesSpecialty && matchesLocation;
  });

  const handleAppointmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // In a real app, this would send to your backend
      console.log('Appointment request:', appointmentForm);
      alert('Appointment request submitted successfully! We will contact you within 24 hours.');
      setAppointmentForm({
        name: '',
        email: '',
        phone: '',
        preferredDate: '',
        preferredTime: '',
        reason: '',
        notes: ''
      });
    } catch (error) {
      console.error('Error submitting appointment request:', error);
      alert('Error submitting request. Please try again.');
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article': return <BookOpen className="h-4 w-4" />;
      case 'video': return <Calendar className="h-4 w-4" />;
      case 'exercise': return <Heart className="h-4 w-4" />;
      case 'meditation': return <Users className="h-4 w-4" />;
      case 'worksheet': return <BookOpen className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Professional Help Center</h1>
        <p className="text-gray-600">
          Connect with mental health professionals and access support resources
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="crisis" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Crisis Support
          </TabsTrigger>
          <TabsTrigger value="professionals" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Find Professionals
          </TabsTrigger>
          <TabsTrigger value="appointment" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Book Appointment
          </TabsTrigger>
          <TabsTrigger value="resources" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Self-Help
          </TabsTrigger>
        </TabsList>

        {/* Crisis Support */}
        <TabsContent value="crisis">
          <div className="space-y-6">
            <Alert className="border-red-200 bg-red-50">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                If you're experiencing a mental health emergency, please call 911 or go to your nearest emergency room.
                The resources below provide immediate support for crisis situations.
              </AlertDescription>
            </Alert>

            <div className="grid gap-4">
              {crisisResources.map((resource, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{resource.name}</CardTitle>
                        <CardDescription>{resource.description}</CardDescription>
                      </div>
                      <Badge 
                        variant={resource.type === 'crisis' ? 'destructive' : 
                               resource.type === 'support' ? 'default' : 'secondary'}
                      >
                        {resource.type}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-green-600" />
                          <span className="font-medium">{resource.phone}</span>
                        </div>
                        {resource.text && (
                          <div className="flex items-center gap-2">
                            <MessageSquare className="h-4 w-4 text-blue-600" />
                            <span className="text-sm">{resource.text}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-600" />
                          <span className="text-sm">{resource.availability}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-end">
                        <Button 
                          variant="outline" 
                          onClick={() => window.open(resource.website, '_blank')}
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Visit Website
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Find Professionals */}
        <TabsContent value="professionals">
          <div className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardHeader>
                <CardTitle>Find Mental Health Professionals</CardTitle>
                <CardDescription>Search for therapists, counselors, and psychiatrists in your area</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Search</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Name or specialty..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Specialty</Label>
                    <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                      <SelectTrigger>
                        <SelectValue placeholder="All specialties" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All specialties</SelectItem>
                        <SelectItem value="Anxiety">Anxiety</SelectItem>
                        <SelectItem value="Depression">Depression</SelectItem>
                        <SelectItem value="CBT">Cognitive Behavioral Therapy</SelectItem>
                        <SelectItem value="Trauma">Trauma</SelectItem>
                        <SelectItem value="Stress Management">Stress Management</SelectItem>
                        <SelectItem value="ADHD">ADHD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="City or area..."
                        value={selectedLocation}
                        onChange={(e) => setSelectedLocation(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Professional Listings */}
            <div className="grid gap-4">
              {filteredProviders.map((provider) => (
                <Card key={provider.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{provider.name}</CardTitle>
                        <CardDescription className="text-base">{provider.title}</CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 mb-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{provider.rating}</span>
                        </div>
                        <Badge variant={provider.acceptingPatients ? "default" : "secondary"}>
                          {provider.acceptingPatients ? "Accepting Patients" : "Not Accepting"}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-gray-600">{provider.bio}</p>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-medium mb-2">Specialties</h4>
                            <div className="flex flex-wrap gap-1">
                              {provider.specialties.map((specialty, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {specialty}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-medium mb-2">Session Types</h4>
                            <div className="flex flex-wrap gap-1">
                              {provider.sessionTypes.map((type, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {type}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-gray-600" />
                            <span className="text-sm">{provider.location}</span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-gray-600" />
                            <span className="text-sm">{provider.phone}</span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-gray-600" />
                            <span className="text-sm">{provider.email}</span>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Insurance Accepted:</p>
                          <div className="flex flex-wrap gap-1">
                            {provider.insuranceAccepted.slice(0, 3).map((insurance, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {insurance}
                              </Badge>
                            ))}
                            {provider.insuranceAccepted.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{provider.insuranceAccepted.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        <div className="space-x-2">
                          <Button variant="outline" size="sm">
                            View Profile
                          </Button>
                          <Button 
                            size="sm" 
                            disabled={!provider.acceptingPatients}
                            onClick={() => setActiveTab('appointment')}
                          >
                            Book Appointment
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Book Appointment */}
        <TabsContent value="appointment">
          <Card>
            <CardHeader>
              <CardTitle>Book an Appointment</CardTitle>
              <CardDescription>
                Fill out this form to request an appointment with a mental health professional
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAppointmentSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      required
                      value={appointmentForm.name}
                      onChange={(e) => setAppointmentForm(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={appointmentForm.email}
                      onChange={(e) => setAppointmentForm(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      value={appointmentForm.phone}
                      onChange={(e) => setAppointmentForm(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="reason">Reason for Visit</Label>
                    <Select 
                      value={appointmentForm.reason} 
                      onValueChange={(value) => setAppointmentForm(prev => ({ ...prev, reason: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select reason" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="anxiety">Anxiety</SelectItem>
                        <SelectItem value="depression">Depression</SelectItem>
                        <SelectItem value="stress">Stress Management</SelectItem>
                        <SelectItem value="trauma">Trauma/PTSD</SelectItem>
                        <SelectItem value="relationships">Relationship Issues</SelectItem>
                        <SelectItem value="work">Work-related Issues</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="date">Preferred Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={appointmentForm.preferredDate}
                      onChange={(e) => setAppointmentForm(prev => ({ ...prev, preferredDate: e.target.value }))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="time">Preferred Time</Label>
                    <Select 
                      value={appointmentForm.preferredTime} 
                      onValueChange={(value) => setAppointmentForm(prev => ({ ...prev, preferredTime: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="morning">Morning (9am-12pm)</SelectItem>
                        <SelectItem value="afternoon">Afternoon (12pm-5pm)</SelectItem>
                        <SelectItem value="evening">Evening (5pm-8pm)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes (optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any specific requests or information you'd like to share..."
                    value={appointmentForm.notes}
                    onChange={(e) => setAppointmentForm(prev => ({ ...prev, notes: e.target.value }))}
                  />
                </div>

                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    This is a request form. A member of our team will contact you within 24 hours to confirm your appointment.
                    For urgent matters, please call our crisis line or visit the emergency room.
                  </AlertDescription>
                </Alert>

                <Button type="submit" className="w-full">
                  <Calendar className="h-4 w-4 mr-2" />
                  Submit Appointment Request
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Self-Help Resources */}
        <TabsContent value="resources">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Self-Help Resources</CardTitle>
                <CardDescription>
                  Explore tools and resources to support your mental wellness journey
                </CardDescription>
              </CardHeader>
            </Card>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {selfHelpResources.map((resource) => (
                <Card key={resource.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(resource.type)}
                        <Badge variant="outline" className="text-xs">
                          {resource.type}
                        </Badge>
                      </div>
                      <Badge className={getDifficultyColor(resource.difficulty)}>
                        {resource.difficulty}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg leading-tight">{resource.title}</CardTitle>
                    <CardDescription>{resource.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">{resource.category}</span>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{resource.duration}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {resource.tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <Button variant="outline" className="w-full" size="sm">
                        <ExternalLink className="h-3 w-3 mr-2" />
                        Access Resource
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfessionalHelpCenter;