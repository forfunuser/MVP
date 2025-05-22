import { useState } from 'react';
import { Send, Save, RefreshCw } from 'lucide-react';

interface FeedbackFormProps {
  candidateName: string;
  candidateEmail: string;
  jobTitle: string;
  onSend: (feedback: string) => void;
}

const FeedbackForm = ({ candidateName, candidateEmail, jobTitle, onSend }: FeedbackFormProps) => {
  const [feedback, setFeedback] = useState('');
  const [generatedFeedback, setGeneratedFeedback] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  const generateFeedback = async () => {
    setIsGenerating(true);
    
    // Simulate AI-generated feedback
    setTimeout(() => {
      const templates = [
        `Dear ${candidateName},\n\nThank you for applying to the ${jobTitle} position. After careful consideration, we regret to inform you that we will not be moving forward with your application at this time. While your background is impressive, we are looking for candidates with more experience in specific technical areas required for this role.\n\nWe appreciate your interest in our company and encourage you to apply for future positions that may better align with your skill set.\n\nBest regards,\nRecruitment Team`,
        
        `Dear ${candidateName},\n\nThank you for your interest in the ${jobTitle} role. After reviewing your application, we have decided to proceed with other candidates whose qualifications more closely match our current requirements. Specifically, we were looking for someone with more hands-on experience in the key technologies mentioned in the job description.\n\nWe encourage you to continue developing your skills in these areas and consider applying for other positions with us in the future.\n\nBest regards,\nRecruitment Team`,
        
        `Dear ${candidateName},\n\nWe appreciate your application for the ${jobTitle} position. Unfortunately, we have decided not to move forward with your candidacy at this time. The role requires extensive experience with specific technologies that weren't apparent from your application.\n\nWe value your interest in our company and would be happy to reconsider you for future roles that better match your experience and skills.\n\nBest regards,\nRecruitment Team`
      ];
      
      const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
      setGeneratedFeedback(randomTemplate);
      setIsGenerating(false);
    }, 1500);
  };
  
  const useSuggestedFeedback = () => {
    setFeedback(generatedFeedback);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (feedback.trim()) {
      onSend(feedback);
    }
  };
  
  return (
    <div className="bg-white p-5 rounded-lg shadow border border-gray-100">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Send Feedback</h3>
      
      <div className="mb-4">
        <div className="flex justify-between">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            To: {candidateName} ({candidateEmail})
          </label>
          
          <button
            type="button"
            onClick={generateFeedback}
            className="text-sm text-primary-600 hover:text-primary-900 flex items-center"
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <RefreshCw className="h-3 w-3 mr-1" />
                Generate Feedback
              </>
            )}
          </button>
        </div>
        
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          rows={6}
          className="input"
          placeholder="Write your feedback to the candidate here..."
        ></textarea>
      </div>
      
      {generatedFeedback && (
        <div className="mb-4 p-3 bg-gray-50 rounded border border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-sm font-medium text-gray-700">Suggested Feedback</h4>
            <button
              type="button"
              onClick={useSuggestedFeedback}
              className="text-xs text-primary-600 hover:text-primary-900"
            >
              <Save className="h-3 w-3 inline mr-1" />
              Use this
            </button>
          </div>
          <p className="text-sm text-gray-600 whitespace-pre-line">{generatedFeedback}</p>
        </div>
      )}
      
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleSubmit}
          className="btn-primary flex items-center"
        >
          <Send className="h-4 w-4 mr-2" />
          Send Feedback
        </button>
      </div>
    </div>
  );
};

export default FeedbackForm;