"use client";

import { Card, CardBody, CardFooter, CardHeader, Divider } from '@heroui/react';
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
      <Card className='bg-primary-100 p-4 hover:opacity-75'>
        <CardHeader>
          {user.username}
        </CardHeader>
        <Divider/>
        <CardBody>
          @{user.name}
        </CardBody>
        <Divider/>
        <CardFooter>
          {user.email}
        </CardFooter>

      </Card>
    </a>
  );
};

export default UserCard;
