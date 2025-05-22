import { useState, useEffect } from 'react';
import { BarChart3, Bell, Filter, ListFilter, TrendingUp, Briefcase, Search } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import PageContainer from '../../components/layout/PageContainer';
import JobCard from '../../components/student/JobCard';
import ProgressBar from '../../components/common/ProgressBar';
import { useUser } from '../../context/UserContext';

// Mock data
const mockJobs = [
  {
    id: '1',
    title: 'Software Engineer Intern',
    company: 'TechCorp',
    location: 'San Francisco, CA',
    matchScore: 92,
    effortScore: 40,
    salary: '$30/hr',
    deadline: 'Jun 30, 2025',
    requiredSkills: ['React', 'TypeScript', 'Node.js'],
    type: 'Internship' as const
  },
  {
    id: '2',
    title: 'Data Science Co-op',
    company: 'Analytics Pro',
    location: 'Boston, MA',
    matchScore: 85,
    effortScore: 70,
    deadline: 'Jul 15, 2025',
    requiredSkills: ['Python', 'SQL', 'Machine Learning'],
    type: 'Internship' as const
  },
  {
    id: '3',
    title: 'UI/UX Design Intern',
    company: 'Creative Studios',
    location: 'Remote',
    matchScore: 78,
    effortScore: 55,
    salary: '$25/hr',
    deadline: 'Jun 25, 2025',
    requiredSkills: ['Figma', 'UI Design', 'Prototyping'],
    type: 'Internship' as const
  },
  {
    id: '4',
    title: 'Junior Web Developer',
    company: 'Web Solutions',
    location: 'New York, NY',
    matchScore: 65,
    effortScore: 60,
    deadline: 'Jul 5, 2025',
    requiredSkills: ['HTML', 'CSS', 'JavaScript'],
    type: 'Full-time' as const
  },
];

const applicationStats = [
  { name: 'Applied', value: 12 },
  { name: 'In Review', value: 5 },
  { name: 'Interview', value: 2 },
  { name: 'Rejected', value: 3 },
  { name: 'Offers', value: 1 },
];

const applicationTrends = [
  { month: 'Jan', applications: 2, interviews: 0 },
  { month: 'Feb', applications: 3, interviews: 1 },
  { month: 'Mar', applications: 5, interviews: 2 },
  { month: 'Apr', applications: 4, interviews: 1 },
  { month: 'May', applications: 7, interviews: 3 },
  { month: 'Jun', applications: 8, interviews: 2 },
];

const COLORS = ['#3B82F6', '#8B5CF6', '#EC4899', '#EF4444', '#22C55E'];

const StudentDashboard = () => {
  const { currentUser } = useUser();
  const [matchedJobs, setMatchedJobs] = useState(mockJobs);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const searchJobs = (query: string) => {
    if (!query.trim()) {
      setMatchedJobs(mockJobs);
      return;
    }
    
    const filtered = mockJobs.filter(job => 
      job.title.toLowerCase().includes(query.toLowerCase()) ||
      job.company.toLowerCase().includes(query.toLowerCase()) ||
      job.requiredSkills.some(skill => skill.toLowerCase().includes(query.toLowerCase()))
    );
    
    setMatchedJobs(filtered);
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    searchJobs(e.target.value);
  };
  
  if (isLoading) {
    return (
      <PageContainer>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-6 py-1">
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="h-24 bg-gray-200 rounded"></div>
                  <div className="h-24 bg-gray-200 rounded"></div>
                  <div className="h-24 bg-gray-200 rounded"></div>
                </div>
                <div className="h-72 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    );
  }
  
  const totalSkillCompletion = 75; // Percentage of profile skills completed
  const recommendedSkillsToAdd = ['Docker', 'AWS', 'GraphQL'];
  
  return (
    <PageContainer>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome, {currentUser?.name}!</h1>
            <p className="text-gray-600">Here are your personalized job recommendations.</p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <button className="btn-outline mr-3 flex items-center">
              <Bell className="mr-2 h-4 w-4" />
              <span className="relative inline-flex">
                Notifications
                <span className="absolute -top-1 -right-2 h-4 w-4 rounded-full bg-red-500 flex items-center justify-center text-xs text-white">3</span>
              </span>
            </button>
          </div>
        </div>
        
        {/* Dashboard cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {/* Profile strength */}
          <div className="card bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-200">
            <h3 className="text-lg font-medium text-primary-900 mb-3">Profile Strength</h3>
            <ProgressBar value={totalSkillCompletion} max={100} showPercentage />
            
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Recommended skills to add:</h4>
              <div className="flex flex-wrap gap-1.5">
                {recommendedSkillsToAdd.map((skill, index) => (
                  <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white text-primary-800 border border-primary-200">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {/* Application Statistics */}
          <div className="card">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium text-gray-900">Application Status</h3>
              <BarChart3 className="h-5 w-5 text-gray-400" />
            </div>
            
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={applicationStats}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {applicationStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-1 text-xs text-center text-gray-500">
              Total Applications: {applicationStats.reduce((acc, curr) => acc + curr.value, 0)}
            </div>
          </div>
          
          {/* Application Trends */}
          <div className="card">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium text-gray-900">Monthly Activity</h3>
              <TrendingUp className="h-5 w-5 text-gray-400" />
            </div>
            
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={applicationTrends}
                  margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="applications" stroke="#3B82F6" name="Applications" />
                  <Line type="monotone" dataKey="interviews" stroke="#22C55E" name="Interviews" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        {/* Job search & filters */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-grow relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                className="input pl-10"
                placeholder="Search for jobs, skills, or companies"
              />
            </div>
            
            <div className="flex gap-3">
              <button className="btn-outline flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </button>
              
              <div className="relative">
                <select className="input pr-10 appearance-none">
                  <option value="">Sort by: Best Match</option>
                  <option value="newest">Newest</option>
                  <option value="deadline">Deadline</option>
                  <option value="effort">Effort (Low to High)</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <ListFilter className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-2 flex flex-wrap gap-2">
            <button className="px-3 py-1.5 bg-primary-50 text-primary-700 hover:bg-primary-100 rounded-full text-sm font-medium transition-colors flex items-center">
              <Briefcase className="mr-1.5 h-3.5 w-3.5" />
              Internships
            </button>
            <button className="px-3 py-1.5 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-full text-sm font-medium transition-colors">
              Remote
            </button>
            <button className="px-3 py-1.5 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-full text-sm font-medium transition-colors">
              Full-time
            </button>
            <button className="px-3 py-1.5 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-full text-sm font-medium transition-colors">
              Last 7 days
            </button>
          </div>
        </div>
        
        {/* Job listings */}
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recommended Jobs</h2>
        
        <div className="space-y-4">
          {matchedJobs.length > 0 ? (
            matchedJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))
          ) : (
            <div className="text-center py-10 bg-gray-50 rounded-lg">
              <div className="mx-auto h-12 w-12 text-gray-400">
                <Search className="h-12 w-12" />
              </div>
              <h3 className="mt-2 text-lg font-medium text-gray-900">No jobs found</h3>
              <p className="mt-1 text-gray-500">
                Try adjusting your search criteria or filters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setMatchedJobs(mockJobs);
                }}
                className="mt-4 btn-primary"
              >
                Clear search
              </button>
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  );
};

export default StudentDashboard;