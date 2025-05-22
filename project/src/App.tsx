import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import StudentDashboard from './pages/student/StudentDashboard';
import RecruiterDashboard from './pages/recruiter/RecruiterDashboard';
import ProfilePage from './pages/student/ProfilePage';
import JobDetails from './pages/student/JobDetails';
import PostJob from './pages/recruiter/PostJob';
import CandidateDetails from './pages/recruiter/CandidateDetails';
import OneTaskLibrary from './pages/student/OneTaskLibrary';
import OneTaskDetails from './pages/student/OneTaskDetails';
import OneTaskAdmin from './pages/admin/OneTaskAdmin';
import { UserProvider } from './context/UserContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate authentication check and initial data loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse-slow text-primary-600 font-semibold text-xl">
          Loading TalentBridge...
        </div>
      </div>
    );
  }

  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route 
            path="/student/dashboard" 
            element={
              <ProtectedRoute userType="student">
                <StudentDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/student/profile" 
            element={
              <ProtectedRoute userType="student">
                <ProfilePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/student/job/:id" 
            element={
              <ProtectedRoute userType="student">
                <JobDetails />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/student/onetask" 
            element={
              <ProtectedRoute userType="student">
                <OneTaskLibrary />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/student/onetask/:id" 
            element={
              <ProtectedRoute userType="student">
                <OneTaskDetails />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/recruiter/dashboard" 
            element={
              <ProtectedRoute userType="recruiter">
                <RecruiterDashboard />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/recruiter/post-job" 
            element={
              <ProtectedRoute userType="recruiter">
                <PostJob />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/recruiter/candidate/:id" 
            element={
              <ProtectedRoute userType="recruiter">
                <CandidateDetails />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/admin/onetask" 
            element={
              <ProtectedRoute userType="admin">
                <OneTaskAdmin />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;