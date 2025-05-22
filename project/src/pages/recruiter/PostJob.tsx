import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import PageContainer from '../../components/layout/PageContainer';
import JobForm from '../../components/recruiter/JobForm';

const PostJob = () => {
  return (
    <PageContainer>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/recruiter/dashboard" className="inline-flex items-center text-primary-600 hover:text-primary-900 mb-6">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to dashboard
        </Link>
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Post a New Job</h1>
          <p className="mt-2 text-gray-600">
            Fill out the form below to create a new job posting. Be as detailed as possible to attract the best candidates.
          </p>
        </div>
        
        <div className="bg-white shadow-sm rounded-lg p-6 md:p-8">
          <JobForm />
        </div>
      </div>
    </PageContainer>
  );
};

export default PostJob;