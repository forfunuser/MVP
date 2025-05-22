import { X } from 'lucide-react';

interface SkillTagProps {
  name: string;
  level?: 'beginner' | 'intermediate' | 'advanced';
  onRemove?: () => void;
  className?: string;
}

const SkillTag = ({ name, level, onRemove, className = '' }: SkillTagProps) => {
  const getLevelColor = () => {
    switch (level) {
      case 'beginner':
        return 'bg-blue-100 text-blue-800';
      case 'intermediate':
        return 'bg-purple-100 text-purple-800';
      case 'advanced':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getLevelColor()} ${className}`}>
      {name}
      {level && <span className="ml-1 text-xs opacity-70">({level.substring(0, 3)})</span>}
      {onRemove && (
        <button
          type="button"
          className="ml-1 -mr-1 h-4 w-4 rounded-full inline-flex items-center justify-center text-gray-400 hover:bg-gray-200 hover:text-gray-500 focus:outline-none"
          onClick={onRemove}
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </span>
  );
};

export default SkillTag;