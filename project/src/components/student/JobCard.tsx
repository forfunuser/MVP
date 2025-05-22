import { ChevronRight, Clock, Briefcase, Award, BarChart } from 'lucide-react';
import { Link } from 'react-router-dom';
import SkillTag from '../common/SkillTag';
import ProgressBar from '../common/ProgressBar';

interface JobCardProps {
  job: {
    id: string;
    title: string;
    company: string;
    location: string;
    matchScore: number;
    effortScore: number;
    salary?: string;
    deadline?: string;
    requiredSkills: string[];
    type: 'Full-time' | 'Part-time' | 'Internship' | 'Contract';
  };
}

const JobCard = ({ job }: JobCardProps) => {
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
    <div className="card group hover:border-primary-300 transition-all duration-300 border border-transparent">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <div className="flex-1">
          <h3 className="text-lg font-semibold group-hover:text-primary-600 transition-colors">
            {job.title}
          </h3>
          <div className="mt-1 text-gray-600">{job.company} • {job.location}</div>
          
          <div className="flex flex-wrap gap-2 mt-3">
            <span className="badge bg-gray-100 text-gray-800 flex items-center">
              <Briefcase className="w-3 h-3 mr-1" /> {job.type}
            </span>
            {job.salary && (
              <span className="badge bg-green-50 text-green-700">
                {job.salary}
              </span>
            )}
            {job.deadline && (
              <span className="badge bg-amber-50 text-amber-700 flex items-center">
                <Clock className="w-3 h-3 mr-1" /> Due {job.deadline}
              </span>
            )}
          </div>
          
          <div className="mt-3 flex flex-wrap gap-1.5">
            {job.requiredSkills.map((skill, index) => (
              <SkillTag key={index} name={skill} />
            ))}
          </div>
        </div>
        
        <div className="mt-4 md:mt-0 md:ml-6 flex flex-col items-start md:items-end">
          <div className="flex items-center mb-2">
            <Award className="w-4 h-4 text-primary-500 mr-1" />
            <span className="text-sm font-medium text-gray-700">Match Score:</span>
          </div>
          <ProgressBar
            value={job.matchScore}
            max={100}
            size="md"
            color={getMatchColor()}
            showPercentage
          />
          
          <div className="flex items-center mt-3 mb-1">
            <BarChart className="w-4 h-4 text-gray-500 mr-1" />
            <span className="text-sm font-medium text-gray-700">Effort Required:</span>
            <span className={`ml-2 text-sm font-medium text-${getEffortColor()}-600`}>
              {getEffortLevelText()}
            </span>
          </div>
          
          <Link
            to={`/student/job/${job.id}`}
            className="mt-3 btn-primary flex items-center"
          >
            View Details <ChevronRight className="ml-1 w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobCard;