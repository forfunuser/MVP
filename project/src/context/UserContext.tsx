import React, { createContext, useContext, useState, ReactNode } from 'react';

type UserRole = 'student' | 'recruiter' | null;

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profileComplete: boolean;
  username: string;
}

interface UserContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUserProfile: (userData: Partial<User>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Mock user data
const mockUsers = {
  student_demo: {
    id: 'student-1',
    name: 'Alex Johnson',
    email: 'alex.j@student.edu',
    role: 'student' as UserRole,
    profileComplete: false,
    username: 'student_demo',
    password: 'talent123'
  },
  recruiter_demo: {
    id: 'recruiter-1',
    name: 'Sarah Smith',
    email: 'sarah.s@techcorp.com',
    role: 'recruiter' as UserRole,
    profileComplete: true,
    username: 'recruiter_demo',
    password: 'bridge456'
  }
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const isAuthenticated = !!currentUser;

  const login = async (username: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const user = mockUsers[username as keyof typeof mockUsers];
    
    if (user && user.password === password) {
      const { password: _, ...userData } = user;
      setCurrentUser(userData);
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const updateUserProfile = (userData: Partial<User>) => {
    if (currentUser) {
      setCurrentUser({ ...currentUser, ...userData });
    }
  };

  return (
    <UserContext.Provider value={{ 
      currentUser, 
      isAuthenticated, 
      login, 
      logout,
      updateUserProfile
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};