import { Trophy, Medal, Flame, Star } from 'lucide-react';
import { Badge } from './Badge';

interface BadgeData {
  id: string;
  name: string;
  description: string;
  icon: 'trophy' | 'medal' | 'flame' | 'star';
  color: string;
  unlocked: boolean;
}

interface ProgressCardProps {
  level: number;
  xp: number;
  xpToNextLevel: number;
  badges: BadgeData[];
  streak?: number;
  totalCourses?: number;
  className?: string;
}

const getBadgeIcon = (icon: BadgeData['icon']) => {
  const iconMap = {
    trophy: Trophy,
    medal: Medal,
    flame: Flame,
    star: Star
  };
  return iconMap[icon];
};

export const ProgressCard = ({ 
  level, 
  xp, 
  xpToNextLevel, 
  badges, 
  streak = 0,
  totalCourses = 0,
  className = '' 
}: ProgressCardProps) => {
  const progressPercentage = (xp / xpToNextLevel) * 100;
  const unlockedBadges = badges.filter(badge => badge.unlocked);

  return (
    <div className={`manabi-card ${className}`}>
      <div className="p-6">
        <h3 className="manabi-heading-3 mb-4">あなたの進捗</h3>
        
        {/* Level and XP Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-charcoal-gray">Level {level}</span>
            <span className="text-sm text-silver-gray">{xp} / {xpToNextLevel} XP</span>
          </div>
          <div className="manabi-progress-bar">
            <div 
              className="manabi-progress-fill" 
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center p-3 bg-off-white rounded-lg">
            <div className="text-2xl font-bold text-wisdom-blue">{streak}</div>
            <div className="text-sm text-silver-gray">連続学習日</div>
          </div>
          <div className="text-center p-3 bg-off-white rounded-lg">
            <div className="text-2xl font-bold text-energetic-yellow">{totalCourses}</div>
            <div className="text-sm text-silver-gray">完了コース</div>
          </div>
        </div>

        {/* Badges Section */}
        <div>
          <h4 className="font-semibold text-charcoal-gray mb-3">獲得バッジ</h4>
          <div className="flex flex-wrap gap-3">
            {unlockedBadges.length > 0 ? (
              unlockedBadges.map((badge) => {
                const IconComponent = getBadgeIcon(badge.icon);
                return (
                  <div 
                    key={badge.id}
                    className="flex items-center space-x-2 p-2 bg-off-white rounded-lg"
                    title={badge.description}
                  >
                    <IconComponent className={`w-5 h-5 ${badge.color}`} />
                    <span className="text-sm font-medium text-charcoal-gray">
                      {badge.name}
                    </span>
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-silver-gray">
                まだバッジを獲得していません。学習を続けてバッジを獲得しましょう！
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}; 