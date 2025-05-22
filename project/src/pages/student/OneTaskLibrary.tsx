import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, BookOpen, Award, Clock, ChevronRight, BarChart } from 'lucide-react';
import PageContainer from '../../components/layout/PageContainer';
import ProgressBar from '../../components/common/ProgressBar';

// Mock data for OneTask assignments
const mockTasks = [
  {
    id: '1',
    title: 'Frontend Development Assessment',
    category: 'Web Development',
    difficulty: 'Intermediate',
    duration: '60 mins',
    skills: ['React', 'JavaScript', 'CSS'],
    completions: 1245,
    avgScore: 72,
    description: 'Build a responsive web component using React and modern CSS techniques.',
  },
  {
    id: '2',
    title: 'Marketing Strategy Case Study',
    category: 'Marketing',
    difficulty: 'Advanced',
    duration: '90 mins',
    skills: ['Digital Marketing', 'Analytics', 'Strategy'],
    completions: 856,
    avgScore: 68,
    description: 'Analyze a real-world marketing campaign and propose improvements.',
  },
  {
    id: '3',
    title: 'Data Analysis with Python',
    category: 'Data Science',
    difficulty: 'Beginner',
    duration: '45 mins',
    skills: ['Python', 'Pandas', 'Data Visualization'],
    completions: 2134,
    avgScore: 75,
    description: 'Analyze a dataset using Python and create meaningful visualizations.',
  },
  {
    id: '4',
    title: 'UI/UX Design Challenge',
    category: 'Design',
    difficulty: 'Intermediate',
    duration: '120 mins',
    skills: ['Figma', 'UI Design', 'User Research'],
    completions: 967,
    avgScore: 70,
    description: 'Design a mobile app interface based on user requirements.',
  },
];

// Mock data for completed tasks
const completedTasks = [
  {
    id: '1',
    title: 'Frontend Development Assessment',
    score: 85,
    completedDate: '2025-02-15',
    percentile: 92,
  },
];

const OneTaskLibrary = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);

  const categories = ['Web Development', 'Marketing', 'Data Science', 'Design'];
  const difficulties = ['Beginner', 'Intermediate', 'Advanced'];

  const filteredTasks = mockTasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = !selectedCategory || task.category === selectedCategory;
    const matchesDifficulty = !selectedDifficulty || task.difficulty === selectedDifficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-blue-100 text-blue-800';
      case 'advanced': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <PageContainer>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">OneTask Library</h1>
            <p className="text-gray-600">Complete verified assessments to showcase your skills.</p>
          </div>
        </div>

        {/* Completed Tasks Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <div className="card bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-200">
            <div className="flex items-center">
              <div className="bg-white p-3 rounded-lg">
                <Award className="h-6 w-6 text-primary-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-primary-900">Your Performance</h3>
                <p className="text-2xl font-semibold text-primary-600">
                  {completedTasks.length} Tasks Completed
                </p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="bg-secondary-100 p-3 rounded-lg">
                <BarChart className="h-6 w-6 text-secondary-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Average Score</h3>
                <p className="text-2xl font-semibold text-secondary-600">
                  {completedTasks.length > 0 
                    ? `${completedTasks.reduce((acc, task) => acc + task.score, 0) / completedTasks.length}%`
                    : 'N/A'}
                </p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="bg-accent-100 p-3 rounded-lg">
                <Clock className="h-6 w-6 text-accent-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Time Invested</h3>
                <p className="text-2xl font-semibold text-accent-600">
                  {completedTasks.length * 60} mins
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-grow relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input pl-10"
                placeholder="Search for skills or assessments..."
              />
            </div>
            
            <div className="flex gap-3">
              <select
                value={selectedCategory || ''}
                onChange={(e) => setSelectedCategory(e.target.value || null)}
                className="input"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              <select
                value={selectedDifficulty || ''}
                onChange={(e) => setSelectedDifficulty(e.target.value || null)}
                className="input"
              >
                <option value="">All Difficulties</option>
                {difficulties.map(difficulty => (
                  <option key={difficulty} value={difficulty}>{difficulty}</option>
                ))}
              </select>

              <button className="btn-outline flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                More Filters
              </button>
            </div>
          </div>
        </div>

        {/* Task Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map((task) => (
            <div key={task.id} className="card hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <BookOpen className="h-5 w-5 text-primary-600 mr-2" />
                    <span className="text-sm font-medium text-gray-600">{task.category}</span>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{task.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{task.description}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {task.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(task.difficulty)}`}>
                  {task.difficulty}
                </span>
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {task.duration}
                </span>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <div className="flex justify-between items-center text-sm mb-2">
                  <span className="text-gray-600">Completion Rate</span>
                  <span className="font-medium text-primary-600">{task.avgScore}%</span>
                </div>
                <ProgressBar
                  value={task.avgScore}
                  max={100}
                  size="sm"
                  color="primary"
                />
                
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {task.completions.toLocaleString()} completions
                  </span>
                  <Link
                    to={`/student/onetask/${task.id}`}
                    className="btn-primary text-sm py-1.5 px-3 flex items-center"
                  >
                    Start Task
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTasks.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No tasks found</h3>
            <p className="mt-1 text-gray-500">
              Try adjusting your search criteria or filters
            </p>
          </div>
        )}
      </div>
    </PageContainer>
  );
};

export default OneTaskLibrary;