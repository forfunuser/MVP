import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Briefcase, Calendar, DollarSign, ArrowLeft, Send, ExternalLink, BarChart, Award } from 'lucide-react';
import PageContainer from '../../components/layout/PageContainer';
import SkillTag from '../../components/common/SkillTag';
import ApplicationStatus from '../../components/student/ApplicationStatus';
import ProgressBar from '../../components/common/ProgressBar';

// Mock job data - in a real app, you would fetch this from an API
const jobData = {
  id: '1',
  title: 'Software Engineer Intern',
  company: 'TechCorp',
  companyLogo: 'https://via.placeholder.com/150',
  location: 'San Francisco, CA',
  type: 'Internship',
  salary: '$30/hr',
  postedDate: '2 weeks ago',
  deadline: 'Jun 30, 2025',
  description: 'TechCorp is seeking a talented Software Engineer Intern to join our dynamic team. In this role, you will work alongside experienced engineers to develop and improve our core products. This is a great opportunity to gain hands-on experience in a fast-paced tech environment.',
  responsibilities: [
    'Collaborate with cross-functional teams to define, design, and ship new features',
    'Write clean, maintainable code with comprehensive unit tests',
    'Work with product managers and designers to implement UI/UX designs',
    'Participate in code reviews and contribute to engineering best practices',
    'Debug production issues and implement fixes'
  ],
  requirements: [
    'Currently pursuing a degree in Computer Science or related field',
    'Knowledge of JavaScript, TypeScript, and React',
    'Familiarity with Node.js and RESTful APIs',
    'Ability to write clean, well-documented code',
    'Strong problem-solving skills and attention to detail'
  ],
  requiredSkills: ['JavaScript', 'TypeScript', 'React', 'Node.js'],
  optionalSkills: ['GraphQL', 'MongoDB', 'AWS', 'Docker'],
  matchScore: 92,
  effortScore: 40,
  status: 'pending' as const,
  companyInfo: {
    name: 'TechCorp',
    website: 'https://example.com',
    employees: '500-1000',
    industry: 'Software & Technology',
    about: 'TechCorp is a leading technology company specializing in innovative software solutions. We are committed to creating products that transform how businesses operate and succeed in the digital age.'
  }
};

const JobDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState(jobData);
  const [isLoading, setIsLoading] = useState(true);
  const [applyStatus, setApplyStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  
  useEffect(() => {
    // Simulate API fetch
    const timer = setTimeout(() => {
      setIsLoading(false);
      // In a real app, you would fetch job details for the given ID
      // setJob(fetchedJob);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [id]);
  
  const handleApply = () => {
    setApplyStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setApplyStatus('success');
      setJob({
        ...job,
        status: 'submitted'
      });
    }, 1500);
  };
  
  if (isLoading) {
    return (
      <PageContainer>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </PageContainer>
    );
  }
  
  const getMatchColor = () => {
    if (job.matchScore >= 85) return 'success';
    if (job.matchScore >= 70) return 'primary';
    if (job.matchScore >= 50) return 'warning';
    return 'error';
  };
  
  const getEffortLevelText = () => {
    if (job.effortScore >= 80) return 'High';
    if (job.effortScore >= 50) return 'Medium';
    return 'Low';
  };
  
  const getEffortColor = () => {
    if (job.effortScore >= 80) return 'error';
    if (job.effortScore >= 50) return 'warning';
    return 'success';
  };
  
  return (
    <PageContainer>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/student/dashboard" className="inline-flex items-center text-primary-600 hover:text-primary-900 mb-6">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to jobs
        </Link>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
                  <div className="mt-2 flex flex-wrap items-center text-sm text-gray-600 gap-y-1">
                    <div className="flex items-center mr-4">
                      <Briefcase className="mr-1 h-4 w-4 text-gray-400" />
                      {job.company}
                    </div>
                    <div className="flex items-center mr-4">
                      <MapPin className="mr-1 h-4 w-4 text-gray-400" />
                      {job.location}
                    </div>
                    <div className="flex items-center mr-4">
                      <Calendar className="mr-1 h-4 w-4 text-gray-400" />
                      Posted {job.postedDate}
                    </div>
                    {job.salary && (
                      <div className="flex items-center">
                        <DollarSign className="mr-1 h-4 w-4 text-gray-400" />
                        {job.salary}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="mt-4 md:mt-0">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                    {job.type}
                  </span>
                </div>
              </div>
              
              {/* Match & Effort score */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Award className="w-5 h-5 text-primary-500 mr-2" />
                    <span className="font-medium">Match Score</span>
                  </div>
                  <ProgressBar
                    value={job.matchScore}
                    max={100}
                    color={getMatchColor()}
                    showPercentage
                  />
                  <p className="mt-2 text-sm text-gray-600">
                    Your profile is a strong match for this position.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <BarChart className="w-5 h-5 text-gray-500 mr-2" />
                    <span className="font-medium">Application Effort</span>
                    <span className={`ml-2 text-sm font-medium text-${getEffortColor()}-600`}>
                      {getEffortLevelText()}
                    </span>
                  </div>
                  <ProgressBar
                    value={job.effortScore}
                    max={100}
                    color={getEffortColor()}
                    showPercentage
                  />
                  <p className="mt-2 text-sm text-gray-600">
                    This job requires a relatively low application effort.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Job Description */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Description</h2>
              <div className="text-gray-700 space-y-4">
                <p>{job.description}</p>
                
                <div>
                  <h3 className="font-medium text-gray-900 mt-4 mb-2">Responsibilities:</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {job.responsibilities.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mt-4 mb-2">Requirements:</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {job.requirements.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mt-4 mb-2">Required Skills:</h3>
                  <div className="flex flex-wrap gap-2">
                    {job.requiredSkills.map((skill, index) => (
                      <SkillTag key={index} name={skill} />
                    ))}
                  </div>
                </div>
                
                {job.optionalSkills && job.optionalSkills.length > 0 && (
                  <div>
                    <h3 className="font-medium text-gray-900 mt-4 mb-2">Nice to Have:</h3>
                    <div className="flex flex-wrap gap-2">
                      {job.optionalSkills.map((skill, index) => (
                        <SkillTag key={index} name={skill} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Company Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About {job.companyInfo.name}</h2>
              <p className="text-gray-700">{job.companyInfo.about}</p>
              
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Industry:</span>
                  <p className="font-medium">{job.companyInfo.industry}</p>
                </div>
                <div>
                  <span className="text-gray-500">Company Size:</span>
                  <p className="font-medium">{job.companyInfo.employees} employees</p>
                </div>
              </div>
              
              <div className="mt-4">
                <a
                  href={job.companyInfo.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary-600 hover:text-primary-900"
                >
                  Visit company website
                  <ExternalLink className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Application status */}
            <div className="sticky top-24">
              <ApplicationStatus
                status={job.status}
                date={job.deadline}
                feedback={job.status === 'rejected' ? "Your experience level didn't match our current requirements." : undefined}
              />
              
              <div className="mt-4">
                {job.status === 'pending' ? (
                  <button
                    onClick={handleApply}
                    disabled={applyStatus !== 'idle'}
                    className="w-full btn-primary flex items-center justify-center"
                  >
                    {applyStatus === 'loading' ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Applying...
                      </>
                    ) : applyStatus === 'success' ? (
                      'Applied Successfully!'
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Apply Now
                      </>
                    )}
                  </button>
                ) : (
                  <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded border border-gray-200">
                    {job.status === 'submitted' && (
                      <p>You have already applied to this position. We'll notify you of any updates.</p>
                    )}
                  </div>
                )}
              </div>
              
              <div className="mt-4 text-sm text-gray-500">
                <p>Application deadline: {job.deadline}</p>
              </div>
            </div>
            
            {/* Skill Match */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-medium text-gray-900 mb-3">Your Skill Match</h3>
              
              <div className="space-y-3">
                {job.requiredSkills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{skill}</span>
                      <span className="text-primary-600 font-medium">
                        {['Strong', 'Intermediate', 'Beginner'][Math.floor(Math.random() * 3)]}
                      </span>
                    </div>
                    <ProgressBar
                      value={Math.floor(Math.random() * 50) + 50}
                      max={100}
                      size="sm"
                    />
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-3 border-t border-gray-100">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Missing Skills:</h4>
                {job.optionalSkills.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {job.optionalSkills.filter((_, i) => i < 2).map((skill, index) => (
                      <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {skill}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-600">
                    Great job! You have all the required skills.
                  </p>
                )}
              </div>
            </div>
            
            {/* Similar Jobs */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-medium text-gray-900 mb-3">Similar Jobs</h3>
              <div className="space-y-4">
                <div className="group">
                  <h4 className="font-medium text-gray-900 group-hover:text-primary-600">
                    <Link to="/student/job/2">Frontend Developer Intern</Link>
                  </h4>
                  <p className="text-sm text-gray-600">WebTech Solutions</p>
                  <div className="mt-1 flex items-center">
                    <Award className="h-4 w-4 text-primary-500 mr-1" />
                    <span className="text-sm">Match: 88%</span>
                  </div>
                </div>
                
                <div className="pt-3 border-t border-gray-100 group">
                  <h4 className="font-medium text-gray-900 group-hover:text-primary-600">
                    <Link to="/student/job/3">JavaScript Developer</Link>
                  </h4>
                  <p className="text-sm text-gray-600">SoftDev Inc.</p>
                  <div className="mt-1 flex items-center">
                    <Award className="h-4 w-4 text-primary-500 mr-1" />
                    <span className="text-sm">Match: 85%</span>
                  </div>
                </div>
                
                <div className="pt-3 border-t border-gray-100 group">
                  <h4 className="font-medium text-gray-900 group-hover:text-primary-600">
                    <Link to="/student/job/4">Web App Developer</Link>
                  </h4>
                  <p className="text-sm text-gray-600">InnoTech</p>
                  <div className="mt-1 flex items-center">
                    <Award className="h-4 w-4 text-primary-500 mr-1" />
                    <span className="text-sm">Match: 82%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default JobDetails;