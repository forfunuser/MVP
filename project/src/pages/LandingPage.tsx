import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Briefcase, GraduationCap, BarChart, Search } from 'lucide-react';
import PageContainer from '../components/layout/PageContainer';

// Mock job data for search
const mockJobs = [
  {
    id: '1',
    title: 'Frontend Developer Intern',
    company: 'Pixel Inc.',
    type: 'Internship',
    location: 'Remote'
  },
  {
    id: '2',
    title: 'Marketing Associate',
    company: 'Growthly',
    type: 'Full-time',
    location: 'New York, NY'
  },
  {
    id: '3',
    title: 'Frontend Engineer',
    company: 'TechStart',
    type: 'Full-time',
    location: 'San Francisco, CA'
  },
  {
    id: '4',
    title: 'Marketing Coordinator',
    company: 'BrandBoost',
    type: 'Internship',
    location: 'Chicago, IL'
  }
];

const LandingPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<typeof mockJobs>([]);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const filtered = mockJobs.filter(job => 
      job.title.toLowerCase().includes(query.toLowerCase()) ||
      job.company.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filtered);
  };

  const handleApply = () => {
    setShowLoginPrompt(true);
    setTimeout(() => setShowLoginPrompt(false), 3000);
  };

  return (
    <PageContainer>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary-50 to-white">
        <div className="max-w-7xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">
              Smart Internship & Job Matching Platform
            </h1>
            <p className="mt-6 text-xl text-gray-600 max-w-3xl">
              Connect with the right opportunities based on your skills and experience.
              Our AI-powered platform matches students with jobs that best fit their profile.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link to="/register" className="btn-primary text-center px-8 py-3 text-base">
                Get Started
              </Link>
              <Link to="/login" className="btn-outline text-center px-8 py-3 text-base">
                Sign In
              </Link>
            </div>
          </div>
          
          <div className="lg:w-1/2 mt-12 lg:mt-0">
            <img 
              src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="Students working together" 
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform uses advanced matching algorithms to connect students with their ideal opportunities and help recruiters find the perfect candidates.
            </p>
          </div>
          
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature cards */}
            <div className="bg-gray-50 rounded-lg p-8 transition-all duration-300 hover:shadow-lg">
              <div className="inline-flex items-center justify-center p-3 bg-primary-100 rounded-md text-primary-600">
                <GraduationCap className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-xl font-medium text-gray-900">For Students</h3>
              <p className="mt-2 text-gray-600">
                Create your profile, add your skills and experience, and get matched with relevant internships and jobs.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                  <span>Personalized job recommendations</span>
                </li>
                <li className="flex">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                  <span>Application effort scoring</span>
                </li>
                <li className="flex">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                  <span>Track application progress</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-8 transition-all duration-300 hover:shadow-lg">
              <div className="inline-flex items-center justify-center p-3 bg-secondary-100 rounded-md text-secondary-600">
                <Briefcase className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-xl font-medium text-gray-900">For Recruiters</h3>
              <p className="mt-2 text-gray-600">
                Post jobs, review filtered candidates, and find the best talent for your organization.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                  <span>AI-powered candidate matching</span>
                </li>
                <li className="flex">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                  <span>Candidate skill heatmaps</span>
                </li>
                <li className="flex">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                  <span>Automated feedback generation</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-8 transition-all duration-300 hover:shadow-lg">
              <div className="inline-flex items-center justify-center p-3 bg-accent-100 rounded-md text-accent-600">
                <BarChart className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-xl font-medium text-gray-900">Smart Matching</h3>
              <p className="mt-2 text-gray-600">
                Our AI algorithms analyze profiles and job requirements to create the perfect matches.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                  <span>Skill-based matching</span>
                </li>
                <li className="flex">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                  <span>Personalized match scores</span>
                </li>
                <li className="flex">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                  <span>Success probability estimates</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Search Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900">Browse Opportunities</h2>
            <p className="mt-4 text-xl text-gray-600">
              Looking for something specific? Search our job database.
            </p>
            <div className="mt-8 flex items-center max-w-lg mx-auto">
              <div className="relative flex-grow">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="input pl-10 pr-4 py-3 w-full"
                  placeholder="Search for jobs, skills, or companies"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              <button className="ml-4 btn-primary py-3 px-6">
                Search
              </button>
            </div>

            {/* Search Results */}
            {searchResults.length > 0 && (
              <div className="mt-8 space-y-4">
                {searchResults.map((job) => (
                  <div key={job.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-left">
                    <h3 className="text-lg font-medium text-gray-900">{job.title}</h3>
                    <p className="mt-1 text-gray-600">{job.company}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {job.type}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {job.location}
                      </span>
                    </div>
                    <button
                      onClick={handleApply}
                      className="mt-4 btn-primary text-sm py-2"
                    >
                      Apply Now
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Login Prompt */}
            {showLoginPrompt && (
              <div className="fixed bottom-4 right-4 bg-primary-600 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in">
                Please <Link to="/login" className="underline font-medium">login</Link> to apply for this position
              </div>
            )}

            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <button className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
                Software Engineer
              </button>
              <button className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
                Data Analyst
              </button>
              <button className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
                Marketing
              </button>
              <button className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
                Remote
              </button>
              <button className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
                Internship
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white">Ready to find your perfect match?</h2>
          <p className="mt-4 text-xl text-primary-100 max-w-3xl mx-auto">
            Join thousands of students and recruiters who are already using our platform to connect with opportunities.
          </p>
          <div className="mt-8">
            <Link to="/register" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </PageContainer>
  );
};

export default LandingPage;