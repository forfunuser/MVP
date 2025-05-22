import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Briefcase, Menu, X, Bell, User, LogOut, Home, Info, Mail, BookOpen } from 'lucide-react';
import { useUser } from '../../context/UserContext';

const Navbar = () => {
  const { currentUser, logout } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'About', path: '/about', icon: Info },
    { name: 'Contact', path: '/contact', icon: Mail },
  ];

  const getStudentLinks = () => {
    if (currentUser?.role !== 'student') return [];
    return [
      {
        name: 'Dashboard',
        path: '/student/dashboard',
        icon: Briefcase
      },
      {
        name: 'OneTask Library',
        path: '/student/onetask',
        icon: BookOpen
      }
    ];
  };

  const getRecruiterLinks = () => {
    if (currentUser?.role !== 'recruiter') return [];
    return [
      {
        name: 'Dashboard',
        path: '/recruiter/dashboard',
        icon: Briefcase
      },
      {
        name: 'Post Job',
        path: '/recruiter/post-job',
        icon: BookOpen
      }
    ];
  };

  const studentLinks = getStudentLinks();
  const recruiterLinks = getRecruiterLinks();
  const roleSpecificLinks = currentUser?.role === 'student' ? studentLinks : recruiterLinks;

  return (
    <nav className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Briefcase className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">TalentBridge</span>
            </Link>

            {/* Desktop navigation */}
            <div className="hidden md:ml-6 md:flex md:space-x-4">
              {!currentUser && navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${
                    location.pathname === link.path
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <link.icon className="h-4 w-4 mr-1.5" />
                  {link.name}
                </Link>
              ))}
              {roleSpecificLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${
                    location.pathname.includes(link.path)
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <link.icon className="h-4 w-4 mr-1.5" />
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:flex md:items-center md:ml-6">
            {currentUser ? (
              <div className="flex items-center">
                <button className="p-1 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none relative">
                  <Bell className="h-6 w-6" />
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
                </button>

                <div className="ml-3 relative">
                  <div>
                    <button
                      onClick={toggleProfileDropdown}
                      className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none"
                    >
                      <div className="h-8 w-8 rounded-full bg-primary-200 flex items-center justify-center text-primary-700">
                        <User className="h-5 w-5" />
                      </div>
                    </button>
                  </div>

                  {isProfileDropdownOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                      <div className="py-1">
                        <div className="px-4 py-2 text-sm text-gray-700 border-b">
                          <p className="font-medium">{currentUser.name}</p>
                          <p className="text-gray-500 text-xs">{currentUser.email}</p>
                        </div>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Sign out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login" className="btn-outline py-1.5">
                  Sign in
                </Link>
                <Link to="/register" className="btn-primary py-1.5">
                  Sign up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {!currentUser && navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`block px-3 py-2 rounded-md text-base font-medium flex items-center ${
                  location.pathname === link.path
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <link.icon className="h-5 w-5 mr-2" />
                {link.name}
              </Link>
            ))}
            {roleSpecificLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`block px-3 py-2 rounded-md text-base font-medium flex items-center ${
                  location.pathname.includes(link.path)
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <link.icon className="h-5 w-5 mr-2" />
                {link.name}
              </Link>
            ))}
            
            {currentUser ? (
              <button
                onClick={handleLogout}
                className="w-full text-left mt-2 flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              >
                <LogOut className="mr-2 h-5 w-5" />
                Sign out
              </button>
            ) : (
              <div className="mt-4 space-y-2 px-3">
                <Link to="/login" className="btn-outline w-full justify-center">
                  Sign in
                </Link>
                <Link to="/register" className="btn-primary w-full justify-center">
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;