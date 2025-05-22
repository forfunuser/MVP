import { Link } from 'react-router-dom';
import { Briefcase, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center">
              <Briefcase className="h-8 w-8 text-primary-400" />
              <span className="ml-2 text-xl font-bold">TalentBridge</span>
            </div>
            <p className="mt-4 text-sm text-gray-300">
              Connecting talented students with the right opportunities through
              smart matching and personalized recommendations.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Students</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/" className="text-base text-gray-300 hover:text-white">
                  Find Internships
                </Link>
              </li>
              <li>
                <Link to="/" className="text-base text-gray-300 hover:text-white">
                  Build Profile
                </Link>
              </li>
              <li>
                <Link to="/" className="text-base text-gray-300 hover:text-white">
                  Career Resources
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Recruiters</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/" className="text-base text-gray-300 hover:text-white">
                  Post Jobs
                </Link>
              </li>
              <li>
                <Link to="/" className="text-base text-gray-300 hover:text-white">
                  Find Candidates
                </Link>
              </li>
              <li>
                <Link to="/" className="text-base text-gray-300 hover:text-white">
                  Recruitment Solutions
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Contact</h3>
            <ul className="mt-4 space-y-4">
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-gray-400" />
                <span className="text-gray-300">contact@talentbridge.com</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-gray-400" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-gray-400 mt-0.5" />
                <span className="text-gray-300">
                  123 Innovation Way<br />
                  San Francisco, CA 94103
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between">
          <p className="text-base text-gray-400">
            &copy; {new Date().getFullYear()} TalentBridge. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link to="/" className="text-gray-400 hover:text-gray-300">
              Privacy Policy
            </Link>
            <Link to="/" className="text-gray-400 hover:text-gray-300">
              Terms of Service
            </Link>
            <Link to="/" className="text-gray-400 hover:text-gray-300">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;