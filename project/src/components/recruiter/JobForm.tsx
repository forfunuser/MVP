import { useState } from 'react';
import { PlusCircle, X, Save, CheckCircle, XCircle } from 'lucide-react';

const JobForm = () => {
  const [jobData, setJobData] = useState({
    title: '',
    company: '',
    location: '',
    type: 'Full-time',
    salary: '',
    description: '',
    responsibilities: '',
    requirements: '',
    deadline: '',
    requiredSkills: [] as string[],
    optionalSkills: [] as string[]
  });
  
  const [newSkill, setNewSkill] = useState('');
  const [newOptionalSkill, setNewOptionalSkill] = useState('');
  const [formStatus, setFormStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setJobData({ ...jobData, [name]: value });
  };
  
  // Required skills handlers
  const addRequiredSkill = () => {
    if (newSkill.trim() === '') return;
    
    if (!jobData.requiredSkills.includes(newSkill)) {
      setJobData({
        ...jobData,
        requiredSkills: [...jobData.requiredSkills, newSkill]
      });
    }
    
    setNewSkill('');
  };
  
  const removeRequiredSkill = (skill: string) => {
    setJobData({
      ...jobData,
      requiredSkills: jobData.requiredSkills.filter(s => s !== skill)
    });
  };
  
  // Optional skills handlers
  const addOptionalSkill = () => {
    if (newOptionalSkill.trim() === '') return;
    
    if (!jobData.optionalSkills.includes(newOptionalSkill)) {
      setJobData({
        ...jobData,
        optionalSkills: [...jobData.optionalSkills, newOptionalSkill]
      });
    }
    
    setNewOptionalSkill('');
  };
  
  const removeOptionalSkill = (skill: string) => {
    setJobData({
      ...jobData,
      optionalSkills: jobData.optionalSkills.filter(s => s !== skill)
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('saving');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setFormStatus('success');
      setTimeout(() => {
        setFormStatus('idle');
        // Reset form after successful submission
        setJobData({
          title: '',
          company: '',
          location: '',
          type: 'Full-time',
          salary: '',
          description: '',
          responsibilities: '',
          requirements: '',
          deadline: '',
          requiredSkills: [],
          optionalSkills: []
        });
      }, 2000);
    } catch (error) {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 3000);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Information */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Job Information</h3>
        <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
          <div className="sm:col-span-2">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Job Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={jobData.title}
              onChange={handleInputChange}
              className="input mt-1"
              required
            />
          </div>
          
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700">
              Company Name
            </label>
            <input
              type="text"
              name="company"
              id="company"
              value={jobData.company}
              onChange={handleInputChange}
              className="input mt-1"
              required
            />
          </div>
          
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              name="location"
              id="location"
              value={jobData.location}
              onChange={handleInputChange}
              className="input mt-1"
              placeholder="City, State, Country or Remote"
              required
            />
          </div>
          
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">
              Job Type
            </label>
            <select
              name="type"
              id="type"
              value={jobData.type}
              onChange={handleInputChange}
              className="input mt-1"
              required
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="salary" className="block text-sm font-medium text-gray-700">
              Salary Range (Optional)
            </label>
            <input
              type="text"
              name="salary"
              id="salary"
              value={jobData.salary}
              onChange={handleInputChange}
              className="input mt-1"
              placeholder="e.g. $60,000 - $80,000"
            />
          </div>
          
          <div>
            <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">
              Application Deadline
            </label>
            <input
              type="date"
              name="deadline"
              id="deadline"
              value={jobData.deadline}
              onChange={handleInputChange}
              className="input mt-1"
            />
          </div>
        </div>
      </div>
      
      {/* Job Details */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Job Details</h3>
        <div className="mt-4 space-y-6">
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Job Description
            </label>
            <textarea
              name="description"
              id="description"
              rows={4}
              value={jobData.description}
              onChange={handleInputChange}
              className="input mt-1"
              required
            />
          </div>
          
          <div>
            <label htmlFor="responsibilities" className="block text-sm font-medium text-gray-700">
              Responsibilities
            </label>
            <textarea
              name="responsibilities"
              id="responsibilities"
              rows={4}
              value={jobData.responsibilities}
              onChange={handleInputChange}
              className="input mt-1"
              placeholder="List main responsibilities, one per line"
              required
            />
            <p className="mt-1 text-xs text-gray-500">
              Enter each responsibility on a new line. These will be formatted as bullet points.
            </p>
          </div>
          
          <div>
            <label htmlFor="requirements" className="block text-sm font-medium text-gray-700">
              Requirements
            </label>
            <textarea
              name="requirements"
              id="requirements"
              rows={4}
              value={jobData.requirements}
              onChange={handleInputChange}
              className="input mt-1"
              placeholder="List requirements, one per line"
              required
            />
            <p className="mt-1 text-xs text-gray-500">
              Enter each requirement on a new line. These will be formatted as bullet points.
            </p>
          </div>
        </div>
      </div>
      
      {/* Skills */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Skills</h3>
        
        {/* Required Skills */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Required Skills
          </label>
          <div className="flex flex-wrap gap-2 mt-2 mb-3">
            {jobData.requiredSkills.map((skill, index) => (
              <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                {skill}
                <button
                  type="button"
                  onClick={() => removeRequiredSkill(skill)}
                  className="ml-1.5 -mr-1 h-4 w-4 rounded-full inline-flex items-center justify-center text-primary-400 hover:bg-primary-200 hover:text-primary-500 focus:outline-none"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
            {jobData.requiredSkills.length === 0 && (
              <p className="text-sm text-gray-500">No required skills added yet</p>
            )}
          </div>
          <div className="flex">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              className="input flex-grow"
              placeholder="Add a required skill (e.g. JavaScript, Data Analysis)"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addRequiredSkill())}
            />
            <button
              type="button"
              onClick={addRequiredSkill}
              className="btn-primary ml-2 whitespace-nowrap"
            >
              <PlusCircle className="h-4 w-4 mr-1 inline" />
              Add Skill
            </button>
          </div>
        </div>
        
        {/* Optional Skills */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">
            Nice-to-Have Skills (Optional)
          </label>
          <div className="flex flex-wrap gap-2 mt-2 mb-3">
            {jobData.optionalSkills.map((skill, index) => (
              <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                {skill}
                <button
                  type="button"
                  onClick={() => removeOptionalSkill(skill)}
                  className="ml-1.5 -mr-1 h-4 w-4 rounded-full inline-flex items-center justify-center text-gray-400 hover:bg-gray-200 hover:text-gray-500 focus:outline-none"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
            {jobData.optionalSkills.length === 0 && (
              <p className="text-sm text-gray-500">No optional skills added yet</p>
            )}
          </div>
          <div className="flex">
            <input
              type="text"
              value={newOptionalSkill}
              onChange={(e) => setNewOptionalSkill(e.target.value)}
              className="input flex-grow"
              placeholder="Add an optional skill"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addOptionalSkill())}
            />
            <button
              type="button"
              onClick={addOptionalSkill}
              className="btn-outline ml-2 whitespace-nowrap"
            >
              <PlusCircle className="h-4 w-4 mr-1 inline" />
              Add Skill
            </button>
          </div>
        </div>
      </div>
      
      {/* Submit button */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="btn-primary flex items-center"
          disabled={formStatus === 'saving'}
        >
          {formStatus === 'saving' ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Posting Job...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Post Job
            </>
          )}
        </button>
      </div>
      
      {/* Form status messages */}
      {formStatus === 'success' && (
        <div className="p-4 bg-green-50 text-green-800 rounded-md flex items-center">
          <CheckCircle className="h-5 w-5 mr-2" />
          Job posted successfully! It will now be visible to matching candidates.
        </div>
      )}
      
      {formStatus === 'error' && (
        <div className="p-4 bg-red-50 text-red-800 rounded-md flex items-center">
          <XCircle className="h-5 w-5 mr-2" />
          There was an error posting the job. Please try again.
        </div>
      )}
    </form>
  );
};

export default JobForm;