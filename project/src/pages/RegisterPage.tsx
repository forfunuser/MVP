import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, Briefcase, ArrowLeft } from 'lucide-react';
import { useUser } from '../context/UserContext';
import PageContainer from '../components/layout/PageContainer';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState<'student' | 'recruiter'>('student');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { register } = useUser();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Validate passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }
    
    try {
      const success = await register(name, email, password, userType);
      
      if (success) {
        // Redirect to profile completion based on user type
        if (userType === 'student') {
          navigate('/student/profile');
        } else {
          navigate('/recruiter/dashboard');
        }
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred during registration');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <PageContainer withFooter={false}>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
          <div>
            <div className="flex justify-center">
              <Briefcase className="h-12 w-12 text-primary-600" />
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Create your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
                Sign in
              </Link>
            </p>
          </div>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="user-type" className="block text-sm font-medium text-gray-700">
                I am a:
              </label>
              <div className="mt-2 grid grid-cols-2 gap-3">
                <div>
                  <button
                    type="button"
                    onClick={() => setUserType('student')}
                    className={`w-full py-3 px-4 rounded-md border flex justify-center items-center transition-colors ${
                      userType === 'student'
                        ? 'bg-primary-50 border-primary-600 text-primary-700'
                        : 'bg-white border-gray-300 text-gray-700'
                    }`}
                  >
                    <GraduationCap className="h-5 w-5 mr-2" />
                    Student
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => setUserType('recruiter')}
                    className={`w-full py-3 px-4 rounded-md border flex justify-center items-center transition-colors ${
                      userType === 'recruiter'
                        ? 'bg-primary-50 border-primary-600 text-primary-700'
                        : 'bg-white border-gray-300 text-gray-700'
                    }`}
                  >
                    <Briefcase className="h-5 w-5 mr-2" />
                    Recruiter
                  </button>
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="mt-1">
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="input"
                />
              </div>
            </div>
            
            <div className="flex items-center">
              <input
                id="agree-terms"
                name="agree-terms"
                type="checkbox"
                required
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-900">
                I agree to the{' '}
                <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                  Privacy Policy
                </a>
              </label>
            </div>
            
            <div>
              <button
                type="submit"
                className="btn-primary w-full py-3 flex justify-center items-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <UserPlus className="h-5 w-5 mr-2" />
                )}
                Sign up
              </button>
            </div>
          </form>
          
          <div className="mt-4 text-center">
            <Link to="/" className="inline-flex items-center text-sm text-primary-600 hover:text-primary-500">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

// Import was missing
import { GraduationCap } from 'lucide-react';

export default RegisterPage;