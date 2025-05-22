import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Filter, Search, Users, Briefcase, PlusCircle, List, Grid } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import PageContainer from '../../components/layout/PageContainer';
import { useUser } from '../../context/UserContext';

// Mock data for job listings
const jobListings = [
  {
    id: '1',
    title: 'Software Engineer',
    applicants: 42,
    qualified: 18,
    deadline: '2025-07-15',
    status: 'active',
    daysLeft: 30
  },
  {
    id: '2',
    title: 'UX Designer',
    applicants: 28,
    qualified: 12,
    deadline: '2025-06-25',
    status: 'active',
    daysLeft: 10
  },
  {
    id: '3',
    title: 'Data Analyst Intern',
    applicants: 64,
    qualified: 22,
    deadline: '2025-06-15',
    status: 'active',
    daysLeft: 0
  },
  {
    id: '4',
    title: 'Product Manager',
    applicants: 37,
    qualified: 15,
    deadline: '2025-05-30',
    status: 'closed',
    daysLeft: 0
  }
];

// Mock data for application stats
const applicationStats = [
  { name: 'Software Engineer', total: 42, qualified: 18, interviewed: 8, hired: 2 },
  { name: 'UX Designer', total: 28, qualified: 12, interviewed: 6, hired: 1 },
  { name: 'Data Analyst', total: 64, qualified: 22, interviewed: 10, hired: 3 },
  { name: 'Product Manager', total: 37, qualified: 15, interviewed: 7, hired: 2 },
];

const RecruiterDashboard = () => {
  const { currentUser } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
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
  
  return (
    <PageContainer>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome, {currentUser?.name}!</h1>
            <p className="text-gray-600">Manage your job postings and review candidates.</p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <Link to="/recruiter/post-job" className="btn-primary flex items-center">
              <Plus className="mr-2 h-4 w-4" />
              Post New Job
            </Link>
          </div>
        </div>
        
        {/* Dashboard cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {/* Total Applications */}
          <div className="card flex items-center">
            <div className="bg-primary-100 p-3 rounded-lg">
              <Users className="h-6 w-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Total Applications</h3>
              <p className="text-2xl font-semibold text-primary-600">171</p>
              <p className="text-sm text-gray-500">+12% from last month</p>
            </div>
          </div>
          
          {/* Active Jobs */}
          <div className="card flex items-center">
            <div className="bg-secondary-100 p-3 rounded-lg">
              <Briefcase className="h-6 w-6 text-secondary-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Active Jobs</h3>
              <p className="text-2xl font-semibold text-secondary-600">3</p>
              <p className="text-sm text-gray-500">1
              job closing soon</p>
            </div>
          </div>
          
          {/* Candidate Matches */}
          <div className="card flex items-center">
            <div className="bg-accent-100 p-3 rounded-lg">
              <PlusCircle className="h-6 w-6 text-accent-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">New Qualified Candidates</h3>
              <p className="text-2xl font-semibold text-accent-600">52</p>
              <p className="text-sm text-gray-500">In the last 7 days</p>
            </div>
          </div>
        </div>
        
        {/* Application Status Chart */}
        <div className="card mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Application Statistics</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={applicationStats}
                margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  angle={-45} 
                  textAnchor="end" 
                  height={70} 
                  tick={{ fontSize: 12 }}
                />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" name="Total Applications" fill="#3B82F6" />
                <Bar dataKey="qualified" name="Qualified" fill="#14B8A6" />
                <Bar dataKey="interviewed" name="Interviewed" fill="#8B5CF6" />
                <Bar dataKey="hired" name="Hired" fill="#22C55E" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Job Listings */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Your Job Postings</h2>
            
            <div className="mt-3 md:mt-0 flex items-center space-x-2">
              <div className="relative flex-grow md:w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="input pl-10"
                  placeholder="Search jobs..."
                />
              </div>
              
              <button className="btn-outline flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </button>
              
              <div className="border border-gray-300 rounded-md flex">
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-gray-100 text-gray-800' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  <List className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-gray-100 text-gray-800' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  <Grid className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
          
          {viewMode === 'list' ? (
            <div className="bg-white shadow-sm overflow-hidden rounded-md">
              <ul className="divide-y divide-gray-200">
                {jobListings.map(job => (
                  <li key={job.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <Link
                          to={`/recruiter/candidate?jobId=${job.id}`}
                          className="text-lg font-medium text-gray-900 hover:text-primary-600 transition-colors"
                        >
                          {job.title}
                        </Link>
                        <div className="flex items-center mt-1">
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            job.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {job.status === 'active' ? 'Active' : 'Closed'}
                          </span>
                          {job.status === 'active' && job.daysLeft <= 14 && (
                            <span className="ml-2 text-xs text-amber-600">
                              {job.daysLeft === 0 
                                ? 'Closing today'
                                : job.daysLeft === 1
                                  ? 'Closes tomorrow'
                                  : `${job.daysLeft} days left`
                              }
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="mt-3 md:mt-0 grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center px-3">
                          <div className="text-sm font-medium text-gray-500">Applicants</div>
                          <div className="text-xl font-semibold text-gray-900">{job.applicants}</div>
                        </div>
                        <div className="text-center px-3">
                          <div className="text-sm font-medium text-gray-500">Qualified</div>
                          <div className="text-xl font-semibold text-primary-600">{job.qualified}</div>
                        </div>
                        <div className="text-center px-3">
                          <div className="text-sm font-medium text-gray-500">Shortlisted</div>
                          <div className="text-xl font-semibold text-success-600">{Math.floor(job.qualified * 0.4)}</div>
                        </div>
                        <div className="flex items-center justify-center">
                          <Link 
                            to={`/recruiter/candidate?jobId=${job.id}`}
                            className="btn-primary text-sm py-1.5"
                          >
                            View Candidates
                          </Link>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobListings.map(job => (
                <div key={job.id} className="card hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <Link
                        to={`/recruiter/candidate?jobId=${job.id}`}
                        className="text-lg font-medium text-gray-900 hover:text-primary-600 transition-colors"
                      >
                        {job.title}
                      </Link>
                      <div className="flex items-center mt-1">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          job.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {job.status === 'active' ? 'Active' : 'Closed'}
                        </span>
                        {job.status === 'active' && job.daysLeft <= 14 && (
                          <span className="ml-2 text-xs text-amber-600">
                            {job.daysLeft === 0 
                              ? 'Closing today'
                              : job.daysLeft === 1
                                ? 'Closes tomorrow'
                                : `${job.daysLeft} days left`
                            }
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <button className="text-gray-400 hover:text-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                    <div className="bg-gray-50 rounded p-2">
                      <div className="text-sm font-medium text-gray-500">Applicants</div>
                      <div className="text-lg font-semibold text-gray-900">{job.applicants}</div>
                    </div>
                    <div className="bg-gray-50 rounded p-2">
                      <div className="text-sm font-medium text-gray-500">Qualified</div>
                      <div className="text-lg font-semibold text-primary-600">{job.qualified}</div>
                    </div>
                    <div className="bg-gray-50 rounded p-2">
                      <div className="text-sm font-medium text-gray-500">Shortlisted</div>
                      <div className="text-lg font-semibold text-success-600">{Math.floor(job.qualified * 0.4)}</div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <Link 
                      to={`/recruiter/candidate?jobId=${job.id}`}
                      className="btn-primary text-sm py-1.5 w-full text-center"
                    >
                      View Candidates
                    </Link>
                  </div>
                </div>
              ))}
              
              {/* Add new job card */}
              <Link 
                to="/recruiter/post-job"
                className="border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center p-6 h-full min-h-[200px] hover:border-primary-300 hover:bg-primary-50 transition-colors"
              >
                <div className="text-center">
                  <Plus className="h-12 w-12 text-gray-400 mx-auto" />
                  <span className="mt-2 block text-sm font-medium text-gray-900">Post New Job</span>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  );
};

export default RecruiterDashboard;