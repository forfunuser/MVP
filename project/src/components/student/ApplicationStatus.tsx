import { Circle, CheckCircle, Clock, XCircle, AlertCircle } from 'lucide-react';

type StatusType = 'pending' | 'submitted' | 'reviewed' | 'interview' | 'offer' | 'rejected';

interface ApplicationStatusProps {
  status: StatusType;
  date?: string;
  feedback?: string;
}

const ApplicationStatus = ({ status, date, feedback }: ApplicationStatusProps) => {
  const getStatusInfo = () => {
    switch (status) {
      case 'pending':
        return {
          label: 'Not Applied',
          color: 'text-gray-400',
          bgColor: 'bg-gray-100',
          icon: Circle,
          description: 'You have not applied to this position yet'
        };
      case 'submitted':
        return {
          label: 'Application Submitted',
          color: 'text-blue-500',
          bgColor: 'bg-blue-50',
          icon: Clock,
          description: 'Your application is being reviewed'
        };
      case 'reviewed':
        return {
          label: 'Application Reviewed',
          color: 'text-amber-500',
          bgColor: 'bg-amber-50',
          icon: AlertCircle,
          description: 'Your application has been reviewed'
        };
      case 'interview':
        return {
          label: 'Interview Scheduled',
          color: 'text-purple-500',
          bgColor: 'bg-purple-50',
          icon: Clock,
          description: 'You have been selected for an interview'
        };
      case 'offer':
        return {
          label: 'Offer Received',
          color: 'text-green-500',
          bgColor: 'bg-green-50',
          icon: CheckCircle,
          description: 'Congratulations! You received an offer'
        };
      case 'rejected':
        return {
          label: 'Application Rejected',
          color: 'text-red-500',
          bgColor: 'bg-red-50',
          icon: XCircle,
          description: 'Your application was not selected'
        };
      default:
        return {
          label: 'Unknown Status',
          color: 'text-gray-500',
          bgColor: 'bg-gray-50',
          icon: Circle,
          description: 'Status unknown'
        };
    }
  };

  const statusInfo = getStatusInfo();
  const Icon = statusInfo.icon;

  return (
    <div className={`rounded-lg p-4 ${statusInfo.bgColor}`}>
      <div className="flex items-center">
        <Icon className={`h-5 w-5 ${statusInfo.color}`} />
        <h3 className={`ml-2 text-sm font-medium ${statusInfo.color}`}>
          {statusInfo.label}
        </h3>
      </div>
      
      <p className="mt-1 text-sm text-gray-600">
        {statusInfo.description}
      </p>
      
      {date && (
        <p className="mt-1 text-xs text-gray-500">
          {status === 'pending' ? 'Application deadline' : 'Last updated'}: {date}
        </p>
      )}
      
      {feedback && status === 'rejected' && (
        <div className="mt-3 border-t border-red-100 pt-2">
          <p className="text-xs font-medium text-gray-700">Feedback:</p>
          <p className="text-sm text-gray-600">{feedback}</p>
        </div>
      )}
    </div>
  );
};

export default ApplicationStatus;