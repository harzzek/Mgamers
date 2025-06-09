"use client";

import { Card, CardBody, CardFooter, CardHeader, Divider } from '@heroui/react';
import React from 'react';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {

  return (
    <a href={`users/${user.id}`} >
      <Card className='bg-primary-200 p-4 hover:opacity-75'>
        <CardHeader className="gap-3">
          <div>
            <p className="text-md text-default-600">
              {user.username}
            </p>
          </div>
        </CardHeader>
        <Divider/>
        <CardBody>
          Navn: {user.name}
        </CardBody>
        <Divider/>
        <CardFooter>
          Email: {user.email}
        </CardFooter>

      </Card>
    </a>
  );
};

export default UserCard;
