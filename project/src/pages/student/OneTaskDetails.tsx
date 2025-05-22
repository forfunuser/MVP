import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Award, BarChart, BookOpen, CheckCircle } from 'lucide-react';
import PageContainer from '../../components/layout/PageContainer';
import ProgressBar from '../../components/common/ProgressBar';

const mockTask = {
  id: '1',
  title: 'Frontend Development Assessment',
  category: 'Web Development',
  difficulty: 'Intermediate',
  duration: '60 mins',
  skills: ['React', 'JavaScript', 'CSS'],
  description: 'Build a responsive web component using React and modern CSS techniques.',
  instructions: `
    In this assessment, you will demonstrate your frontend development skills by building a responsive web component.
    
    Requirements:
    1. Create a reusable card component with:
       - Title
       - Description
       - Image
       - Action buttons
    2. Implement responsive design
    3. Add hover animations
    4. Ensure accessibility
    
    You will be evaluated on:
    - Code quality and organization
    - Component reusability
    - Responsive design implementation
    - Accessibility considerations
  `,
  completions: 1245,
  avgScore: 72,
  timeLimit: 60,
  passingScore: 70,
  skillBadges: [
    { name: 'React Developer', requirement: 80 },
    { name: 'CSS Master', requirement: 85 },
    { name: 'JavaScript Pro', requirement: 75 }
  ]
};

const OneTaskDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [task, setTask] = useState(mockTask);
  const [isStarted, setIsStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(task.timeLimit * 60); // in seconds
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    const timer = setTimeout(() => {
      setIsLoading(false);
      // In a real app, you would fetch task details for the given ID
      // setTask(fetchedTask);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [id]);

  useEffect(() => {
    if (isStarted && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [isStarted, timeRemaining]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setIsStarted(true);
  };

  const handleSubmit = () => {
    // In a real app, this would submit the assessment
    alert('Assessment submitted successfully!');
  };

  if (isLoading) {
    return (
      <PageContainer>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/student/onetask" className="inline-flex items-center text-primary-600 hover:text-primary-900 mb-6">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Library
        </Link>

        

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center mb-2">
                <BookOpen className="h-5 w-5 text-primary-600 mr-2" />
                <span className="text-sm font-medium text-gray-600">{task.category}</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{task.title}</h1>
              <p className="text-gray-600">{task.description}</p>
            </div>
            
            {!isStarted ? (
              <button
                onClick={handleStart}
                className="btn-primary flex items-center"
              >
                Start Assessment
              </button>
            ) : (
              <div className="text-right">
                <div className="text-2xl font-bold text-primary-600">
                  {formatTime(timeRemaining)}
                </div>
                <div className="text-sm text-gray-500">Time Remaining</div>
              </div>
            )}
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <Clock className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <div className="text-sm font-medium text-gray-900">{task.duration}</div>
                <div className="text-xs text-gray-500">Duration</div>
              </div>
            </div>

            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <Award className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <div className="text-sm font-medium text-gray-900">{task.passingScore}%</div>
                <div className="text-xs text-gray-500">Passing Score</div>
              </div>
            </div>

            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <BarChart className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <div className="text-sm font-medium text-gray-900">{task.avgScore}%</div>
                <div className="text-xs text-gray-500">Average Score</div>
              </div>
            </div>
          </div>
        </div>

        {isStarted ? (
          <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
            <div className="prose max-w-none">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Instructions</h2>
              <div className="whitespace-pre-wrap text-gray-700">{task.instructions}</div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <button
                onClick={handleSubmit}
                className="btn-primary w-full justify-center py-3"
              >
                Submit Assessment
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Skills Assessed</h2>
              <div className="flex flex-wrap gap-2">
                {task.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Available Badges</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {task.skillBadges.map((badge, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 text-primary-600 mb-3">
                      <CheckCircle className="h-6 w-6" />
                    </div>
                    <h3 className="font-medium text-gray-900">{badge.name}</h3>
                    <p className="text-sm text-gray-500">Score {badge.requirement}% or higher</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </PageContainer>
  );
};

export default OneTaskDetails;