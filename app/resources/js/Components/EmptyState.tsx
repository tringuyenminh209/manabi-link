import { LucideIcon } from 'lucide-react';
import { Button } from './Button';

interface EmptyStateProps {
  Icon: LucideIcon;
  title: string;
  description: string;
  actionText?: string;
  onActionClick?: () => void;
  variant?: 'default' | 'compact';
}

export const EmptyState = ({ 
  Icon, 
  title, 
  description, 
  actionText, 
  onActionClick,
  variant = 'default' 
}: EmptyStateProps) => {
  return (
    <div className={`manabi-card text-center ${variant === 'compact' ? 'py-8' : 'py-12'}`}>
      <Icon className={`mx-auto text-silver-gray mb-4 ${variant === 'compact' ? 'w-12 h-12' : 'w-16 h-16'}`} />
      <h3 className={`font-semibold text-charcoal-gray mb-2 ${variant === 'compact' ? 'text-base' : 'text-lg'}`}>
        {title}
      </h3>
      <p className={`text-silver-gray mb-6 ${variant === 'compact' ? 'text-sm' : 'text-base'}`}>
        {description}
      </p>
      {actionText && onActionClick && (
        <Button variant="primary" onClick={onActionClick}>
          {actionText}
        </Button>
      )}
    </div>
  );
}; 