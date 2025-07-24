import { User } from 'lucide-react';
import { User as UserType } from '@/types';
import { formatDate } from '@/utils';

interface ProfileHeaderProps {
  user: UserType;
}

export const ProfileHeader = ({ user }:ProfileHeaderProps) => {
  return (
    <div className="p-6 bg-gradient-to-br from-slateBlue/10 to-vioBlue/10 rounded-xl border-2 border-slateBlue/20">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-gradient-to-br from-slateBlue to-vioBlue rounded-full flex items-center justify-center">
          <User className="h-8 w-8 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-heading font-bold text-charcoal">{user.name}</h2>
          <p className="text-cobalt">{user.email}</p>
          <p className="text-sm text-slateBlue mt-1">
            Member since {formatDate(user.createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
};
