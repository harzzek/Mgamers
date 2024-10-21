"use client";

import { UserCircleIcon } from '@heroicons/react/24/outline';
import React from 'react';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  avatarUrl?: string; // Optional avatar URL
}

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {

  return (
    <div className="max-w-sm w-full lg:max-w-full lg:flex mb-4 cursor-pointer">
      <div className="h-48 lg:h-auto bg-slate-500 lg:w-48 lg:rounded-l-lg flex-none bg-cover text-center overflow-hidden rounded-t lg:rounded-t-none lg:rounded-l">
        { user.avatarUrl ? 
          <img
            src={user.avatarUrl || '/default-avatar.png'}
            alt={`${user.name}'s avatar`}
            className="h-full w-full object-cover"
          /> : 
          <UserCircleIcon className="h-36 w-full object-cover text-white" />
        }
      </div>
      <div className="border-r border-b border-l border-gray-400 bg-gray-300 rounded-b lg:rounded-b-none lg:rounded-r-lg p-4 flex flex-col justify-between leading-normal w-full">
        <div className="mb-2">
          <div className="text-gray-900 font-bold text-xl mb-1">{user.name}</div>
          <div className="text-gray-600 text-sm mb-2">@{user.username}</div>
          <div className="text-gray-700 text-base">{user.email}</div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
