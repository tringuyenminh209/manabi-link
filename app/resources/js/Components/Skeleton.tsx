import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
}

export const Skeleton = ({ 
  className, 
  variant = 'rectangular', 
  width, 
  height 
}: SkeletonProps) => {
  const baseClasses = 'animate-pulse bg-gray-200 rounded';
  
  const variantClasses = {
    text: 'h-4 w-full',
    circular: 'rounded-full',
    rectangular: 'rounded-md'
  };

  const style = {
    width: width,
    height: height
  };

  return (
    <div 
      className={cn(baseClasses, variantClasses[variant], className)}
      style={style}
    />
  );
};

// 特定のコンポーネント用のSkeleton
export const LessonCardSkeleton = () => (
  <div className="manabi-card overflow-hidden">
    <Skeleton variant="rectangular" className="w-full h-48" />
    <div className="p-4">
      <Skeleton variant="text" className="h-4 w-3/4 mb-4" />
      <Skeleton variant="text" className="h-4 w-1/2 mb-4" />
      <div className="flex justify-between">
        <Skeleton variant="text" className="h-6 w-1/4" />
        <Skeleton variant="text" className="h-6 w-1/3" />
      </div>
    </div>
  </div>
);

export const UserCardSkeleton = () => (
  <div className="manabi-card p-4">
    <div className="flex items-center space-x-3">
      <Skeleton variant="circular" className="w-12 h-12" />
      <div className="flex-1">
        <Skeleton variant="text" className="h-4 w-1/2 mb-2" />
        <Skeleton variant="text" className="h-3 w-3/4" />
      </div>
    </div>
  </div>
);

export const TableRowSkeleton = () => (
  <div className="flex items-center space-x-4 p-4 border-b border-light-border">
    <Skeleton variant="circular" className="w-10 h-10" />
    <div className="flex-1">
      <Skeleton variant="text" className="h-4 w-1/3 mb-2" />
      <Skeleton variant="text" className="h-3 w-1/2" />
    </div>
    <Skeleton variant="text" className="h-6 w-20" />
    <Skeleton variant="text" className="h-6 w-16" />
  </div>
); 