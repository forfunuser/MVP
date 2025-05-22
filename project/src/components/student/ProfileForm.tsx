import { useState } from 'react';
import { PlusCircle, Trash2, Save } from 'lucide-react';
import SkillTag from '../common/SkillTag';
import { useUser } from '../../context/UserContext';

interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  startYear: string;
  endYear: string;
}

interface Experience {
  id: string;
  company: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
}

interface Skill {
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced';
}

const ProfileForm = () => {
  const { currentUser, updateUserProfile } = useUser();
  
  const [profileData, setProfileData] = useState({
    fullName: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: '',
    location: '',
    bio: '',
    resumeUrl: '',
    linkedinUrl: '',
    githubUrl: '',
    portfolioUrl: '',
    skills: [] as Skill[],
    education: [] as Education[],
    experience: [] as Experience[]
  });
  
  const [newSkill, setNewSkill] = useState({ name: '', level: 'intermediate' as const });
  const [formStatus, setFormStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  
  // Education handlers
  const addEducation = () => {
    setProfileData({
      ...profileData,
      education: [
        ...profileData.education,
        {
          id: Date.now().toString(),
          school: '',
          degree: '',
          field: '',
          startYear: '',
          endYear: ''
        }
      ]
    });
  };
  
  const updateEducation = (id: string, field: string, value: string) => {
    setProfileData({
      ...profileData,
      education: profileData.education.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    });
  };
  
  const removeEducation = (id: string) => {
    setProfileData({
      ...profileData,
      education: profileData.education.filter(edu => edu.id !== id)
    });
  };
  
  // Experience handlers
  const addExperience = () => {
    setProfileData({
      ...profileData,
      experience: [
        ...profileData.experience,
        {
          id: Date.now().toString(),
          company: '',
          title: '',
          description: '',
          startDate: '',
          endDate: ''
        }
      ]
    });
  };
  
  const updateExperience = (id: string, field: string, value: string) => {
    setProfileData({
      ...profileData,
      experience: profileData.experience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    });
  };
  
  const removeExperience = (id: string) => {
    setProfileData({
      ...profileData,
      experience: profileData.experience.filter(exp => exp.id !== id)
    });
  };
  
  // Skills handlers
  const addSkill = () => {
    if (newSkill.name.trim() === '') return;
    
    setProfileData({
      ...profileData,
      skills: [
        ...profileData.skills.filter(skill => skill.name.toLowerCase() !== newSkill.name.toLowerCase()),
        { ...newSkill }
      ]
    });
    
    setNewSkill({ name: '', level: 'intermediate' });
  };
  
  const removeSkill = (skillName: string) => {
    setProfileData({
      ...profileData,
      skills: profileData.skills.filter(skill => skill.name !== skillName)
    });
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('saving');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update user profile
      updateUserProfile({ 
        name: profileData.fullName,
        profileComplete: true
      });
      
      setFormStatus('success');
      setTimeout(() => setFormStatus('idle'), 3000);
    } catch (error) {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 3000);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Personal Information */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Personal Information</h3>
        <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              value={profileData.fullName}
              onChange={handleInputChange}
              className="input mt-1"
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={profileData.email}
              onChange={handleInputChange}
              className="input mt-1 bg-gray-50"
              disabled
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={profileData.phone}
              onChange={handleInputChange}
              className="input mt-1"
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
              value={profileData.location}
              onChange={handleInputChange}
              className="input mt-1"
              placeholder="City, State, Country"
            />
          </div>
          
          <div className="sm:col-span-2">
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
              Bio
            </label>
            <textarea
              name="bio"
              id="bio"
              rows={3}
              value={profileData.bio}
              onChange={handleInputChange}
              className="input mt-1"
              placeholder="Tell us about yourself"
            />
          </div>
        </div>
      </div>
      
      {/* Skills */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Skills</h3>
        <div className="mt-4">
          <div className="flex flex-wrap gap-2 mb-3">
            {profileData.skills.map((skill, index) => (
              <SkillTag
                key={index}
                name={skill.name}
                level={skill.level}
                onRemove={() => removeSkill(skill.name)}
              />
            ))}
            {profileData.skills.length === 0 && (
              <p className="text-sm text-gray-500">No skills added yet</p>
            )}
          </div>
          
          <div className="flex">
            <input
              type="text"
              value={newSkill.name}
              onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
              className="input flex-grow"
              placeholder="Add a skill (e.g. React, Python)"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
            />
            
            <select
              value={newSkill.level}
              onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value as any })}
              className="input ml-2 w-40"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
            
            <button
              type="button"
              onClick={addSkill}
              className="btn-primary ml-2"
            >
              Add
            </button>
          </div>
        </div>
      </div>
      
      {/* Education */}
      <div>
        <div className="flex justify-between items-center border-b pb-2">
          <h3 className="text-lg font-medium text-gray-900">Education</h3>
          <button
            type="button"
            onClick={addEducation}
            className="text-primary-600 hover:text-primary-900 flex items-center text-sm font-medium"
          >
            <PlusCircle className="h-4 w-4 mr-1" />
            Add Education
          </button>
        </div>
        
        <div className="mt-4 space-y-6">
          {profileData.education.map((edu) => (
            <div key={edu.id} className="p-4 bg-gray-50 rounded-lg relative">
              <button
                type="button"
                onClick={() => removeEducation(edu.id)}
                className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
              >
                <Trash2 className="h-5 w-5" />
              </button>
              
              <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">School/University</label>
                  <input
                    type="text"
                    value={edu.school}
                    onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                    className="input mt-1"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Degree</label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                    className="input mt-1"
                    placeholder="Bachelor's, Master's, etc."
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Field of Study</label>
                  <input
                    type="text"
                    value={edu.field}
                    onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                    className="input mt-1"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-x-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Start Year</label>
                    <input
                      type="text"
                      value={edu.startYear}
                      onChange={(e) => updateEducation(edu.id, 'startYear', e.target.value)}
                      className="input mt-1"
                      placeholder="YYYY"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">End Year</label>
                    <input
                      type="text"
                      value={edu.endYear}
                      onChange={(e) => updateEducation(edu.id, 'endYear', e.target.value)}
                      className="input mt-1"
                      placeholder="YYYY or Present"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {profileData.education.length === 0 && (
            <p className="text-sm text-gray-500">No education added yet</p>
          )}
        </div>
      </div>
      
      {/* Experience */}
      <div>
        <div className="flex justify-between items-center border-b pb-2">
          <h3 className="text-lg font-medium text-gray-900">Work Experience</h3>
          <button
            type="button"
            onClick={addExperience}
            className="text-primary-600 hover:text-primary-900 flex items-center text-sm font-medium"
          >
            <PlusCircle className="h-4 w-4 mr-1" />
            Add Experience
          </button>
        </div>
        
        <div className="mt-4 space-y-6">
          {profileData.experience.map((exp) => (
            <div key={exp.id} className="p-4 bg-gray-50 rounded-lg relative">
              <button
                type="button"
                onClick={() => removeExperience(exp.id)}
                className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
              >
                <Trash2 className="h-5 w-5" />
              </button>
              
              <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Company</label>
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                    className="input mt-1"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Job Title</label>
                  <input
                    type="text"
                    value={exp.title}
                    onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
                    className="input mt-1"
                    required
                  />
                </div>
                
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={exp.description}
                    onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                    rows={3}
                    className="input mt-1"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Start Date</label>
                  <input
                    type="text"
                    value={exp.startDate}
                    onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                    className="input mt-1"
                    placeholder="MM/YYYY"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">End Date</label>
                  <input
                    type="text"
                    value={exp.endDate}
                    onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                    className="input mt-1"
                    placeholder="MM/YYYY or Present"
                  />
                </div>
              </div>
            </div>
          ))}
          
          {profileData.experience.length === 0 && (
            <p className="text-sm text-gray-500">No experience added yet</p>
          )}
        </div>
      </div>
      
      {/* Links */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Online Presence</h3>
        <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
          <div>
            <label htmlFor="resumeUrl" className="block text-sm font-medium text-gray-700">
              Resume URL
            </label>
            <input
              type="url"
              name="resumeUrl"
              id="resumeUrl"
              value={profileData.resumeUrl}
              onChange={handleInputChange}
              className="input mt-1"
              placeholder="Link to your resume (Google Drive, Dropbox, etc.)"
            />
          </div>
          
          <div>
            <label htmlFor="linkedinUrl" className="block text-sm font-medium text-gray-700">
              LinkedIn
            </label>
            <input
              type="url"
              name="linkedinUrl"
              id="linkedinUrl"
              value={profileData.linkedinUrl}
              onChange={handleInputChange}
              className="input mt-1"
              placeholder="https://linkedin.com/in/yourusername"
            />
          </div>
          
          <div>
            <label htmlFor="githubUrl" className="block text-sm font-medium text-gray-700">
              GitHub
            </label>
            <input
              type="url"
              name="githubUrl"
              id="githubUrl"
              value={profileData.githubUrl}
              onChange={handleInputChange}
              className="input mt-1"
              placeholder="https://github.com/yourusername"
            />
          </div>
          
          <div>
            <label htmlFor="portfolioUrl" className="block text-sm font-medium text-gray-700">
              Portfolio
            </label>
            <input
              type="url"
              name="portfolioUrl"
              id="portfolioUrl"
              value={profileData.portfolioUrl}
              onChange={handleInputChange}
              className="input mt-1"
              placeholder="https://yourportfolio.com"
            />
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
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Profile
            </>
          )}
        </button>
      </div>
      
      {/* Form status messages */}
      {formStatus === 'success' && (
        <div className="p-4 bg-green-50 text-green-800 rounded-md flex items-center">
          <CheckCircle className="h-5 w-5 mr-2" />
          Profile saved successfully!
        </div>
      )}
      
      {formStatus === 'error' && (
        <div className="p-4 bg-red-50 text-red-800 rounded-md flex items-center">
          <XCircle className="h-5 w-5 mr-2" />
          There was an error saving your profile. Please try again.
        </div>
      )}
    </form>
  );
};

export default ProfileForm;