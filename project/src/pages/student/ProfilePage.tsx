import PageContainer from '../../components/layout/PageContainer';
import ProfileForm from '../../components/student/ProfileForm';

const ProfilePage = () => {
  return (
    <PageContainer>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Complete Your Profile</h1>
          <p className="mt-2 text-gray-600">
            A complete profile helps us find the best matching opportunities for you.
            The more information you provide, the better your job matches will be.
          </p>
        </div>
        
        <div className="bg-white shadow-sm rounded-lg p-6 md:p-8">
          <ProfileForm />
        </div>
      </div>
    </PageContainer>
  );
};

export default ProfilePage;