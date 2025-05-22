import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, MapPin, Mail, Phone, ExternalLink, Download, Briefcase, GraduationCap, Calendar, UserCheck, UserX } from 'lucide-react';
import PageContainer from '../../components/layout/PageContainer';
import SkillTag from '../../components/common/SkillTag';
import RatingStars from '../../components/common/RatingStars';
import ProgressBar from '../../components/common/ProgressBar';
import FeedbackForm from '../../components/recruiter/FeedbackForm';

// Mock candidate data
const candidateData = {
  id: '1',
  name: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  phone: '+1 (555) 123-4567',
  location: 'San Francisco, CA',
  title: 'Computer Science Student',
  about: 'Highly motivated Computer Science student with a passion for web development and machine learning. Looking for opportunities to apply my skills in a real-world setting and grow as a developer.',
  education: [
    {
      school: 'University of California, Berkeley',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startYear: '2022',
      endYear: '2026',
      gpa: '3.8/4.0'
    }
  ],
  experience: [
    {
      company: 'Tech Startup XYZ',
      title: 'Software Engineering Intern',
      location: 'San Francisco, CA',
      startDate: 'May 2024',
      endDate: 'August 2024',
      description: 'Developed and maintained web applications using React and Node.js. Collaborated with senior developers to implement new features and fix bugs.'
    },
    {
      company: 'University Computer Lab',
      title: 'Teaching Assistant',
      location: 'Berkeley, CA',
      startDate: 'January 2023',
      endDate: 'Present',
      description: 'Assist professors in teaching introductory programming courses. Help students understand key concepts and debug their code.'
    }
  ],
  skills: [
    { name: 'JavaScript', level: 'advanced' },
    { name: 'TypeScript', level: 'intermediate' },
    { name: 'React', level: 'advanced' },
    { name: 'Node.js', level: 'intermediate' },
    { name: 'Python', level: 'advanced' },
    { name: 'SQL', level: 'intermediate' },
    { name: 'Git', level: 'intermediate' },
    { name: 'HTML/CSS', level: 'advanced' }
  ],
  projects: [
    {
      name: 'E-commerce Platform',
      description: 'Developed a full-stack e-commerce platform using React, Node.js, and MongoDB. Implemented user authentication, product catalog, shopping cart, and payment processing.',
      link: 'https://github.com/example/ecommerce'
    },
    {
      name: 'Machine Learning Image Classifier',
      description: 'Built an image classification system using TensorFlow and Keras. Trained the model on a dataset of 10,000 images with 98% accuracy.',
      link: 'https://github.com/example/image-classifier'
    }
  ],
  links: {
    resume: 'https://example.com/resume.pdf',
    github: 'https://github.com/alexjohnson',
    linkedin: 'https://linkedin.com/in/alexjohnson',
    portfolio: 'https://alexjohnson.dev'
  },
  matchScore: 92,
  applicationDate: '2025-06-05',
  status: 'reviewing' as 'reviewing' | 'shortlisted' | 'rejected',
  notes: ''
};

const CandidateDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const jobId = searchParams.get('jobId');
  const navigate = useNavigate();
  
  const [candidate, setCandidate] = useState(candidateData);
  const [isLoading, setIsLoading] = useState(true);
  const [notes, setNotes] = useState('');
  const [rating, setRating] = useState(4);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  
  useEffect(() => {
    // Simulate API fetch
    const timer = setTimeout(() => {
      setIsLoading(false);
      // In a real app, you would fetch candidate details for the given ID
      setNotes(candidateData.notes);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [id]);
  
  const handleShortlist = () => {
    setCandidate({ ...candidate, status: 'shortlisted' });
  };
  
  const handleReject = () => {
    setCandidate({ ...candidate, status: 'rejected' });
    setShowFeedbackForm(true);
  };
  
  const handleSendFeedback = (feedback: string) => {
    // In a real app, this would send the feedback to the API
    console.log('Sending feedback:', feedback);
    
    // Show success message and close form
    alert('Feedback sent successfully!');
    setShowFeedbackForm(false);
  };
  
  const goBack = () => {
    if (jobId) {
      navigate(`/recruiter/candidate?jobId=${jobId}`);
    } else {
      navigate('/recruiter/dashboard');
    }
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
  
  return (
    <PageContainer>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button onClick={goBack} className="inline-flex items-center text-primary-600 hover:text-primary-900 mb-6">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to candidates
        </button>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="md:col-span-2 space-y-6">
            {/* Header with match score */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{candidate.name}</h1>
                  <p className="text-gray-600">{candidate.title}</p>
                  <div className="flex flex-wrap items-center mt-2 text-sm text-gray-600">
                    <div className="flex items-center mr-4">
                      <MapPin className="mr-1 h-4 w-4 text-gray-400" />
                      {candidate.location}
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 md:mt-0 flex flex-col items-end">
                  <div className="text-sm text-gray-600">Match Score</div>
                  <div className="text-3xl font-bold text-primary-600">{candidate.matchScore}%</div>
                  <div className="text-xs text-gray-500">Applied {new Date(candidate.applicationDate).toLocaleDateString()}</div>
                </div>
              </div>
              
              {/* Contact information */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-gray-100 pt-4">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-400 mr-2" />
                  <a href={`mailto:${candidate.email}`} className="text-primary-600 hover:text-primary-900">
                    {candidate.email}
                  </a>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-gray-400 mr-2" />
                  <a href={`tel:${candidate.phone}`} className="text-primary-600 hover:text-primary-900">
                    {candidate.phone}
                  </a>
                </div>
              </div>
            </div>
            
            {/* About */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About</h2>
              <p className="text-gray-700">{candidate.about}</p>
            </div>
            
            {/* Skills */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.map((skill, index) => (
                  <SkillTag key={index} name={skill.name} level={skill.level} />
                ))}
              </div>
              
              {/* Skill match visualization */}
              <div className="mt-6 border-t border-gray-100 pt-4">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Skill Match to Job Requirements</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Technical Skills</span>
                      <span className="text-sm font-medium text-primary-600">Strong</span>
                    </div>
                    <ProgressBar value={88} max={100} color="primary" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Relevant Experience</span>
                      <span className="text-sm font-medium text-primary-600">Good</span>
                    </div>
                    <ProgressBar value={75} max={100} color="primary" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Education Requirements</span>
                      <span className="text-sm font-medium text-success-600">Excellent</span>
                    </div>
                    <ProgressBar value={95} max={100} color="success" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Experience */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Experience</h2>
              
              <div className="space-y-6">
                {candidate.experience.map((exp, index) => (
                  <div key={index} className={index > 0 ? 'pt-6 border-t border-gray-100' : ''}>
                    <div className="flex items-start">
                      <div className="bg-gray-100 p-2 rounded-md">
                        <Briefcase className="h-5 w-5 text-gray-600" />
                      </div>
                      <div className="ml-4">
                        <h3 className="font-medium text-gray-900">{exp.title}</h3>
                        <div className="text-gray-600">{exp.company}</div>
                        <div className="text-sm text-gray-500 flex items-center mt-1">
                          <MapPin className="h-3.5 w-3.5 mr-1" /> 
                          {exp.location}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center mt-1">
                          <Calendar className="h-3.5 w-3.5 mr-1" /> 
                          {exp.startDate} - {exp.endDate}
                        </div>
                      </div>
                    </div>
                    <p className="mt-3 text-gray-700 pl-11">{exp.description}</p>
                  </div>
                ))}
                
                {candidate.experience.length === 0 && (
                  <p className="text-gray-500 italic">No experience listed</p>
                )}
              </div>
            </div>
            
            {/* Education */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Education</h2>
              
              <div className="space-y-6">
                {candidate.education.map((edu, index) => (
                  <div key={index} className={index > 0 ? 'pt-6 border-t border-gray-100' : ''}>
                    <div className="flex items-start">
                      <div className="bg-gray-100 p-2 rounded-md">
                        <GraduationCap className="h-5 w-5 text-gray-600" />
                      </div>
                      <div className="ml-4">
                        <h3 className="font-medium text-gray-900">{edu.degree} in {edu.field}</h3>
                        <div className="text-gray-600">{edu.school}</div>
                        <div className="text-sm text-gray-500 flex items-center mt-1">
                          <Calendar className="h-3.5 w-3.5 mr-1" /> 
                          {edu.startYear} - {edu.endYear}
                        </div>
                        {edu.gpa && (
                          <div className="text-sm text-gray-500 mt-1">
                            GPA: {edu.gpa}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                {candidate.education.length === 0 && (
                  <p className="text-gray-500 italic">No education listed</p>
                )}
              </div>
            </div>
            
            {/* Projects */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Projects</h2>
              
              <div className="space-y-6">
                {candidate.projects.map((project, index) => (
                  <div key={index} className={index > 0 ? 'pt-6 border-t border-gray-100' : ''}>
                    <div className="flex justify-between">
                      <h3 className="font-medium text-gray-900">{project.name}</h3>
                      {project.link && (
                        <a 
                          href={project.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary-600 hover:text-primary-900 flex items-center text-sm"
                        >
                          View Project <ExternalLink className="ml-1 h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                    <p className="mt-2 text-gray-700">{project.description}</p>
                  </div>
                ))}
                
                {candidate.projects.length === 0 && (
                  <p className="text-gray-500 italic">No projects listed</p>
                )}
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Candidate actions */}
            <div className="sticky top-24">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-medium text-gray-900 mb-4">Candidate Actions</h3>
                
                {candidate.status === 'reviewing' ? (
                  <div className="space-y-3">
                    <button 
                      onClick={handleShortlist}
                      className="w-full btn bg-success-500 text-white hover:bg-success-600 focus:ring-success-400 flex items-center justify-center"
                    >
                      <UserCheck className="mr-2 h-4 w-4" />
                      Shortlist Candidate
                    </button>
                    
                    <button 
                      onClick={handleReject}
                      className="w-full btn-outline flex items-center justify-center border-red-300 text-red-700 hover:bg-red-50"
                    >
                      <UserX className="mr-2 h-4 w-4" />
                      Reject Candidate
                    </button>
                  </div>
                ) : (
                  <div className="bg-gray-50 p-4 rounded-md">
                    {candidate.status === 'shortlisted' ? (
                      <div className="flex items-center text-success-600">
                        <UserCheck className="mr-2 h-5 w-5" />
                        <span className="font-medium">Candidate Shortlisted</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-gray-600">
                        <UserX className="mr-2 h-5 w-5 text-red-500" />
                        <span className="font-medium">Candidate Rejected</span>
                      </div>
                    )}
                    
                    {candidate.status === 'rejected' && !showFeedbackForm && (
                      <button 
                        onClick={() => setShowFeedbackForm(true)}
                        className="mt-3 w-full btn-outline text-sm py-1.5"
                      >
                        Send Feedback
                      </button>
                    )}
                  </div>
                )}
                
                <div className="border-t border-gray-100 mt-4 pt-4">
                  <div className="mb-2 flex justify-between items-center">
                    <label className="block text-sm font-medium text-gray-700">
                      Candidate Rating
                    </label>
                    <span className="text-xs text-gray-500">{rating}/5</span>
                  </div>
                  <RatingStars 
                    rating={rating} 
                    onClick={setRating} 
                    size="md"
                  />
                </div>
                
                <div className="border-t border-gray-100 mt-4 pt-4">
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                    Notes
                  </label>
                  <textarea
                    id="notes"
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add private notes about this candidate..."
                    className="input"
                  />
                  <button className="mt-2 text-sm text-primary-600 hover:text-primary-900">
                    Save Notes
                  </button>
                </div>
              </div>
              
              {/* Links */}
              <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-medium text-gray-900 mb-4">Links</h3>
                
                <div className="space-y-3">
                  {candidate.links.resume && (
                    <a
                      href={candidate.links.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-primary-600 hover:text-primary-900"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download Resume
                    </a>
                  )}
                  
                  {candidate.links.linkedin && (
                    <a
                      href={candidate.links.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-primary-600 hover:text-primary-900"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      LinkedIn Profile
                    </a>
                  )}
                  
                  {candidate.links.github && (
                    <a
                      href={candidate.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-primary-600 hover:text-primary-900"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      GitHub Profile
                    </a>
                  )}
                  
                  {candidate.links.portfolio && (
                    <a
                      href={candidate.links.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-primary-600 hover:text-primary-900"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Portfolio Website
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Feedback Form */}
        {showFeedbackForm && (
          <div className="mt-8">
            <FeedbackForm 
              candidateName={candidate.name}
              candidateEmail={candidate.email}
              jobTitle="Software Engineer Intern"
              onSend={handleSendFeedback}
            />
          </div>
        )}
      </div>
    </PageContainer>
  );
};

export default CandidateDetails;