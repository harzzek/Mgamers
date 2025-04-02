"use client";

import { Card, CardBody, CardFooter, CardHeader } from '@heroui/react';
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
    <a href={`users/${user.id}`} >
      <Card className='bg-primary-100 p-4'>
        <CardHeader>
          {user.username}
        </CardHeader>
        <CardBody>
          @{user.name}
        </CardBody>
        <CardFooter>
          {user.email}
        </CardFooter>

      </Card>
    </a>
  );
};

export default UserCard;
