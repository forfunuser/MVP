import { Link } from 'react-router-dom';
import { MapPin, Briefcase, GraduationCap, Star, UserCheck, UserX } from 'lucide-react';
import SkillTag from '../common/SkillTag';
import ProgressBar from '../common/ProgressBar';

interface CandidateCardProps {
  candidate: {
    id: string;
    name: string;
    location: string;
    title: string;
    education: string;
    matchScore: number;
    skills: Array<{ name: string; level?: 'beginner' | 'intermediate' | 'advanced' }>;
    status?: 'shortlisted' | 'rejected' | 'reviewing';
  };
  jobId: string;
  onShortlist: (candidateId: string) => void;
  onReject: (candidateId: string) => void;
}

const CandidateCard = ({ candidate, jobId, onShortlist, onReject }: CandidateCardProps) => {
  const getMatchColor = () => {
    if (candidate.matchScore >= 85) return 'success';
    if (candidate.matchScore >= 70) return 'primary';
    if (candidate.matchScore >= 50) return 'warning';
    return 'error';
  };

  const isShortlisted = candidate.status === 'shortlisted';
  const isRejected = candidate.status === 'rejected';

  return (
    <div className={`card group border ${
      isShortlisted 
        ? 'border-success-500 bg-success-50' 
        : isRejected 
          ? 'border-gray-300 bg-gray-50 opacity-70' 
          : 'border-transparent hover:border-primary-300'
    } transition-all duration-300`}>
      <div className="flex flex-col md:flex-row md:items-start">
        <div className="flex-1">
          <div className="flex items-start">
            <div className="mr-3 bg-gray-100 rounded-full h-10 w-10 flex items-center justify-center text-gray-700 font-semibold">
              {candidate.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-lg font-semibold group-hover:text-primary-600 transition-colors">
                {candidate.name}
              </h3>
              <div className="mt-1 text-gray-600 flex items-center">
                <Briefcase className="w-3.5 h-3.5 mr-1" />
                {candidate.title}
              </div>
              <div className="mt-1 text-gray-600 flex items-center">
                <MapPin className="w-3.5 h-3.5 mr-1" />
                {candidate.location}
              </div>
              <div className="mt-1 text-gray-600 flex items-center">
                <GraduationCap className="w-3.5 h-3.5 mr-1" />
                {candidate.education}
              </div>
            </div>
          </div>
          
          <div className="mt-3">
            <div className="flex items-center mb-1">
              <Star className="w-4 h-4 text-primary-500 mr-1" />
              <span className="text-sm font-medium text-gray-700">Match Score:</span>
            </div>
            <ProgressBar
              value={candidate.matchScore}
              max={100}
              size="md"
              color={getMatchColor()}
              showPercentage
            />
          </div>
          
          <div className="mt-3 flex flex-wrap gap-1.5">
            {candidate.skills.map((skill, index) => (
              <SkillTag key={index} name={skill.name} level={skill.level} />
            ))}
          </div>
        </div>
        
        <div className="mt-4 md:mt-0 md:ml-6 flex flex-col items-center md:items-end gap-2">
          <Link
            to={`/recruiter/candidate/${candidate.id}?jobId=${jobId}`}
            className="btn-primary flex items-center w-full md:w-auto justify-center"
          >
            View Profile
          </Link>
          
          {!isShortlisted && !isRejected && (
            <>
              <button
                onClick={() => onShortlist(candidate.id)}
                className="btn bg-success-500 text-white hover:bg-success-600 focus:ring-success-400 flex items-center w-full md:w-auto justify-center"
              >
                <UserCheck className="mr-1 h-4 w-4" />
                Shortlist
              </button>
              
              <button
                onClick={() => onReject(candidate.id)}
                className="btn-outline flex items-center border-red-300 text-red-700 hover:bg-red-50 w-full md:w-auto justify-center"
              >
                <UserX className="mr-1 h-4 w-4" />
                Reject
              </button>
            </>
          )}
          
          {isShortlisted && (
            <span className="badge-success flex items-center">
              <UserCheck className="mr-1 h-3 w-3" />
              Shortlisted
            </span>
          )}
          
          {isRejected && (
            <span className="badge-error flex items-center">
              <UserX className="mr-1 h-3 w-3" />
              Rejected
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CandidateCard;