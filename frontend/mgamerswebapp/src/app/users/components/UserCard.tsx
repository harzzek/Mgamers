"use client";

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
    <div className="w-full lg:max-w-full lg:flex mb-4 cursor-pointer">
      <div className="flex border-gray-400 bg-gray-300 p-4 w-full">
        <div className="aspect-auto mb-2">
          <div className="text-gray-900 font-bold text-xl mb-1">{user.username}</div>
          <div className="text-gray-600 text-sm mb-1">@{user.name}</div>
          <div className="text-gray-700 text-base">{user.email}</div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
