"use client";
import React from 'react';
import { SimpleUser, Role } from '../interfaces/userInfo';
import { EnvelopeIcon } from '@heroicons/react/24/outline';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { Button } from '@heroui/button';


interface UserCardProps {
  user: SimpleUser;
}

const CalculateTopRole = (roles: Role[]): string | null => {
  if (!roles || roles.length === 0) return null;

  const rolePriority = ['Admin', 'User', 'Guest'];

  for (const roleName of rolePriority) {
    if (roles.some(role => role.name === roleName)) {
      return roleName;
    }
  }

  return null; // No matching role
}

const RoleBadge = ({ role }: { role: string | null }) => {
  const roleStyles: Record<string, string> = {
    Admin: 'bg-red-500/20 text-red-400 border-red-500/30',
    User: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    Guest: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  };

  if (!role || !(role in roleStyles)) return null;

  return (
    <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${roleStyles[role]}`}>
      {role}
    </span>
  );
};

const UserCard: React.FC<UserCardProps> = ({ user }) => {

  return (
    <a href={`users/${user.id}`} >
      <div className="bg-primary-200 rounded-xl p-5 shadow-lg ease-in-out hover:transition-shadow 
      transition-transform duration-300 hover:-translate-y-1 overflow-hidden hover:shadow-secondary">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <img src={`https://placehold.co/32x32/1F2937/FFFFFF?text=${user.username.charAt(0).toUpperCase()}`} className="w-16 h-16 rounded-full border-2 border-primary-500" alt="avatar" />
            <div>
              <h3 className="text-xl font-bold text-white">{user.username}</h3>
              <p className="text-sm text-gray-400">{user.name}</p>
            </div>
          </div>
          <RoleBadge role={CalculateTopRole(user.roles)} />
        </div>

        <div className="mt-4 pt-4 border-t border-primary-500 space-y-2 text-sm">
          <div className="flex items-center gap-2 text-gray-400">
            <EnvelopeIcon className='h-4 w-4' />
            <span>{user.email}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <CalendarIcon className='h-4 w-4' />
            <span>Medlem siden: {new Date(user.createdAt).toLocaleDateString()}</span>
          </div>

        </div>

        <div className="mt-5">
          <Button 
            className="w-full"
            color='secondary'
            variant='solid'
          >
            Se Profil
          </Button>
        </div>

      </div>
    </a>
  );
};

export default UserCard;
