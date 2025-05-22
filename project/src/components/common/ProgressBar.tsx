interface ProgressBarProps {
  value: number;
  max: number;
  label?: string;
  showPercentage?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error';
}

const ProgressBar = ({
  value,
  max,
  label,
  showPercentage = false,
  size = 'md',
  color = 'primary'
}: ProgressBarProps) => {
  const percentage = Math.round((value / max) * 100);
  
  const getHeightClass = () => {
    switch (size) {
      case 'sm': return 'h-1.5';
      case 'lg': return 'h-4';
      default: return 'h-2.5';
    }
  };
  
  const getColorClass = () => {
    switch (color) {
      case 'secondary': return 'bg-secondary-500';
      case 'accent': return 'bg-accent-500';
      case 'success': return 'bg-success-500';
      case 'warning': return 'bg-warning-500';
      case 'error': return 'bg-error-500';
      default: return 'bg-primary-500';
    }
  };
  
  return (
    <div>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-1">
          {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
          {showPercentage && <span className="text-sm font-medium text-gray-500">{percentage}%</span>}
        </div>
      )}
      <div className={`w-full bg-gray-200 rounded-full ${getHeightClass()}`}>
        <div
          className={`${getHeightClass()} ${getColorClass()} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;