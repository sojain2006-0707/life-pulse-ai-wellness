import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/lib/auth-context";
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User, 
  Phone, 
  Calendar,
  AlertCircle,
  CheckCircle,
  Loader2
} from 'lucide-react';

// Social login icons
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

interface SignUpForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
  agreeToPrivacy: boolean;
  subscribeNewsletter: boolean;
}

interface SignInForm {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface ForgotPasswordForm {
  email: string;
}

const AuthenticationPages = () => {
  const { login, signup, socialLogin } = useAuth();
  const [activeTab, setActiveTab] = useState('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info', text: string } | null>(null);

  const [signUpForm, setSignUpForm] = useState<SignUpForm>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    agreeToPrivacy: false,
    subscribeNewsletter: false
  });

  const [signInForm, setSignInForm] = useState<SignInForm>({
    email: '',
    password: '',
    rememberMe: false
  });

  const [forgotPasswordForm, setForgotPasswordForm] = useState<ForgotPasswordForm>({
    email: ''
  });

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return phoneRegex.test(phone);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    // Validation
    if (!signUpForm.firstName.trim() || !signUpForm.lastName.trim()) {
      setMessage({ type: 'error', text: 'First name and last name are required.' });
      return;
    }

    if (!validateEmail(signUpForm.email)) {
      setMessage({ type: 'error', text: 'Please enter a valid email address.' });
      return;
    }

    if (signUpForm.phone && !validatePhoneNumber(signUpForm.phone)) {
      setMessage({ type: 'error', text: 'Please enter a valid phone number.' });
      return;
    }

    if (!validatePassword(signUpForm.password)) {
      setMessage({ 
        type: 'error', 
        text: 'Password must be at least 8 characters with uppercase, lowercase, and number.' 
      });
      return;
    }

    if (signUpForm.password !== signUpForm.confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match.' });
      return;
    }

    if (!signUpForm.agreeToTerms || !signUpForm.agreeToPrivacy) {
      setMessage({ type: 'error', text: 'Please agree to the Terms of Service and Privacy Policy.' });
      return;
    }

    setLoading(true);

    try {
      await signup({
        firstName: signUpForm.firstName,
        lastName: signUpForm.lastName,
        email: signUpForm.email,
        // phone: signUpForm.phone,  // Add if needed in User interface
        // dateOfBirth: signUpForm.dateOfBirth,  // Add if needed in User interface
        id: '', // This will be generated by the backend
        joinDate: new Date().toISOString()
      }, signUpForm.password);
      
      setMessage({ 
        type: 'success', 
        text: 'Account created successfully! Welcome to LifePulse!' 
      });
      
      // Reset form
      setSignUpForm({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false,
        agreeToPrivacy: false,
        subscribeNewsletter: false
      });
    } catch (error: any) {
      console.error('Sign up error:', error);
      setMessage({ type: 'error', text: error.message || 'Failed to create account. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!validateEmail(signInForm.email)) {
      setMessage({ type: 'error', text: 'Please enter a valid email address.' });
      return;
    }

    if (!signInForm.password) {
      setMessage({ type: 'error', text: 'Password is required.' });
      return;
    }

    setLoading(true);

    try {
      await login(signInForm.email, signInForm.password);
      setMessage({ type: 'success', text: 'Welcome back! Logging you in...' });
    } catch (error: any) {
      console.error('Sign in error:', error);
      setMessage({ type: 'error', text: error.message || 'Invalid email or password. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!validateEmail(forgotPasswordForm.email)) {
      setMessage({ type: 'error', text: 'Please enter a valid email address.' });
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // In a real app, make API call to send reset email
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotPasswordForm.email })
      });

      if (response.ok) {
        setMessage({ 
          type: 'success', 
          text: 'Password reset instructions have been sent to your email.' 
        });
        setForgotPasswordForm({ email: '' });
      } else {
        throw new Error('Failed to send reset email');
      }
    } catch (error) {
      console.error('Forgot password error:', error);
      setMessage({ type: 'error', text: 'Failed to send reset email. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setMessage(null);

    try {
      // In a real app, integrate with Google OAuth
      // For now, simulate the process
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Simulate Google OAuth response
      const mockGoogleUser = {
        id: 'google-user-123',
        email: 'user@gmail.com',
        firstName: 'John',
        lastName: 'Doe',
        profilePicture: 'https://via.placeholder.com/150',
        provider: 'google' as const,
        joinDate: new Date().toISOString()
      };

      await socialLogin('google', mockGoogleUser);
      setMessage({ type: 'success', text: 'Successfully signed in with Google!' });
    } catch (error: any) {
      console.error('Google sign in error:', error);
      setMessage({ type: 'error', text: error.message || 'Failed to sign in with Google. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleFacebookSignIn = async () => {
    setLoading(true);
    setMessage(null);

    try {
      // In a real app, integrate with Facebook OAuth
      // For now, simulate the process
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Simulate Facebook OAuth response
      const mockFacebookUser = {
        id: 'facebook-user-456',
        email: 'user@facebook.com',
        firstName: 'Jane',
        lastName: 'Smith',
        profilePicture: 'https://via.placeholder.com/150',
        provider: 'facebook' as const,
        joinDate: new Date().toISOString()
      };

      await socialLogin('facebook', mockFacebookUser);
      setMessage({ type: 'success', text: 'Successfully signed in with Facebook!' });
    } catch (error: any) {
      console.error('Facebook sign in error:', error);
      setMessage({ type: 'error', text: error.message || 'Failed to sign in with Facebook. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;

    if (strength <= 2) return { level: 'Weak', color: 'bg-red-500' };
    if (strength <= 3) return { level: 'Fair', color: 'bg-yellow-500' };
    if (strength <= 4) return { level: 'Good', color: 'bg-blue-500' };
    return { level: 'Strong', color: 'bg-green-500' };
  };

  const passwordStrength = getPasswordStrength(signUpForm.password);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">LifePulse</h1>
          <p className="text-gray-600">Your Mental Wellness Journey Starts Here</p>
        </div>

        {message && (
          <Alert className={`border-l-4 ${
            message.type === 'success' ? 'border-green-500 bg-green-50' :
            message.type === 'error' ? 'border-red-500 bg-red-50' :
            'border-blue-500 bg-blue-50'
          }`}>
            {message.type === 'success' ? <CheckCircle className="h-4 w-4" /> :
             message.type === 'error' ? <AlertCircle className="h-4 w-4" /> :
             <AlertCircle className="h-4 w-4" />}
            <AlertDescription>{message.text}</AlertDescription>
          </Alert>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          {/* Sign In */}
          <TabsContent value="signin">
            <Card>
              <CardHeader>
                <CardTitle>Welcome Back</CardTitle>
                <CardDescription>Sign in to your LifePulse account</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="signin-email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={signInForm.email}
                        onChange={(e) => setSignInForm(prev => ({ ...prev, email: e.target.value }))}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="signin-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={signInForm.password}
                        onChange={(e) => setSignInForm(prev => ({ ...prev, password: e.target.value }))}
                        className="pl-10 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember-me"
                        checked={signInForm.rememberMe}
                        onCheckedChange={(checked) => 
                          setSignInForm(prev => ({ ...prev, rememberMe: checked as boolean }))
                        }
                      />
                      <Label htmlFor="remember-me" className="text-sm">Remember me</Label>
                    </div>
                    
                    <button
                      type="button"
                      onClick={() => setActiveTab('forgot')}
                      className="text-sm text-blue-600 hover:text-blue-500"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Signing In...
                      </>
                    ) : (
                      'Sign In'
                    )}
                  </Button>

                  <div className="relative my-6">
                    <Separator />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="bg-white px-2 text-sm text-gray-500">Or continue with</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleGoogleSignIn}
                      disabled={loading}
                      className="w-full"
                    >
                      <GoogleIcon />
                      <span className="ml-2">Google</span>
                    </Button>
                    
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleFacebookSignIn}
                      disabled={loading}
                      className="w-full"
                    >
                      <FacebookIcon />
                      <span className="ml-2">Facebook</span>
                    </Button>
                  </div>
                </form>

                <div className="mt-6">
                  <Separator />
                  <div className="text-center text-sm text-gray-600 mt-4">
                    Don't have an account?{' '}
                    <button
                      onClick={() => setActiveTab('signup')}
                      className="text-blue-600 hover:text-blue-500 font-medium"
                    >
                      Sign up here
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sign Up */}
          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle>Create Your Account</CardTitle>
                <CardDescription>Join LifePulse and start your wellness journey</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="firstName"
                          type="text"
                          placeholder="John"
                          value={signUpForm.firstName}
                          onChange={(e) => setSignUpForm(prev => ({ ...prev, firstName: e.target.value }))}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        type="text"
                        placeholder="Doe"
                        value={signUpForm.lastName}
                        onChange={(e) => setSignUpForm(prev => ({ ...prev, lastName: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={signUpForm.email}
                        onChange={(e) => setSignUpForm(prev => ({ ...prev, email: e.target.value }))}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number (optional)</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="(555) 123-4567"
                        value={signUpForm.phone}
                        onChange={(e) => setSignUpForm(prev => ({ ...prev, phone: e.target.value }))}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth (optional)</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={signUpForm.dateOfBirth}
                        onChange={(e) => setSignUpForm(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password *</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="signup-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        value={signUpForm.password}
                        onChange={(e) => setSignUpForm(prev => ({ ...prev, password: e.target.value }))}
                        className="pl-10 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    
                    {signUpForm.password && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span>Password strength:</span>
                          <span className="font-medium">{passwordStrength.level}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                            style={{ 
                              width: `${Math.min(
                                (getPasswordStrength(signUpForm.password).level === 'Weak' ? 25 :
                                 getPasswordStrength(signUpForm.password).level === 'Fair' ? 50 :
                                 getPasswordStrength(signUpForm.password).level === 'Good' ? 75 : 100)
                              )}%` 
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password *</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={signUpForm.confirmPassword}
                        onChange={(e) => setSignUpForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        className="pl-10 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="agreeToTerms"
                        checked={signUpForm.agreeToTerms}
                        onCheckedChange={(checked) => 
                          setSignUpForm(prev => ({ ...prev, agreeToTerms: checked as boolean }))
                        }
                        required
                      />
                      <Label htmlFor="agreeToTerms" className="text-sm leading-tight">
                        I agree to the{' '}
                        <a href="/terms" className="text-blue-600 hover:text-blue-500">
                          Terms of Service
                        </a>
                      </Label>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="agreeToPrivacy"
                        checked={signUpForm.agreeToPrivacy}
                        onCheckedChange={(checked) => 
                          setSignUpForm(prev => ({ ...prev, agreeToPrivacy: checked as boolean }))
                        }
                        required
                      />
                      <Label htmlFor="agreeToPrivacy" className="text-sm leading-tight">
                        I agree to the{' '}
                        <a href="/privacy" className="text-blue-600 hover:text-blue-500">
                          Privacy Policy
                        </a>
                      </Label>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="subscribeNewsletter"
                        checked={signUpForm.subscribeNewsletter}
                        onCheckedChange={(checked) => 
                          setSignUpForm(prev => ({ ...prev, subscribeNewsletter: checked as boolean }))
                        }
                      />
                      <Label htmlFor="subscribeNewsletter" className="text-sm leading-tight">
                        Subscribe to our wellness newsletter (optional)
                      </Label>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      'Create Account'
                    )}
                  </Button>

                  <div className="relative my-6">
                    <Separator />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="bg-white px-2 text-sm text-gray-500">Or sign up with</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleGoogleSignIn}
                      disabled={loading}
                      className="w-full"
                    >
                      <GoogleIcon />
                      <span className="ml-2">Google</span>
                    </Button>
                    
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleFacebookSignIn}
                      disabled={loading}
                      className="w-full"
                    >
                      <FacebookIcon />
                      <span className="ml-2">Facebook</span>
                    </Button>
                  </div>
                </form>

                <div className="mt-6">
                  <Separator />
                  <div className="text-center text-sm text-gray-600 mt-4">
                    Already have an account?{' '}
                    <button
                      onClick={() => setActiveTab('signin')}
                      className="text-blue-600 hover:text-blue-500 font-medium"
                    >
                      Sign in here
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Forgot Password (as overlay or separate state) */}
          {activeTab === 'forgot' && (
            <Card>
              <CardHeader>
                <CardTitle>Reset Your Password</CardTitle>
                <CardDescription>
                  Enter your email address and we'll send you a link to reset your password
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="forgot-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="forgot-email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={forgotPasswordForm.email}
                        onChange={(e) => setForgotPasswordForm(prev => ({ ...prev, email: e.target.value }))}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Sending Instructions...
                      </>
                    ) : (
                      'Send Reset Instructions'
                    )}
                  </Button>
                </form>

                <div className="mt-6">
                  <Separator />
                  <div className="text-center text-sm text-gray-600 mt-4">
                    Remember your password?{' '}
                    <button
                      onClick={() => setActiveTab('signin')}
                      className="text-blue-600 hover:text-blue-500 font-medium"
                    >
                      Back to Sign In
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default AuthenticationPages;