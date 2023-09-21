import React, { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import router from 'next/router';
import LoadingScreen from '../components/LoadingScreen';
import ToggleColorMode from '../components/ToggleColorMode'

export default function BasePage() {
  const { user, error, isLoading } = useUser();

  // If user is already authenticated, redirect to the dashboard or another page
  /*
  useEffect(() => {
  
    if (user) {
      router.push('/home');
    } else {
      router.push('/login');
    }
  }, [user]);
  */

  if (isLoading) {
    return (
      <div>
        <LoadingScreen />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <ToggleColorMode/>
      
    </div>
  );
}
