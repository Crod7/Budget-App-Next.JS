import React, { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import LoadingScreen from '../components/Utility/Loading-Feature/LoadingScreen';
import ToggleColorMode from '../components/Utility/ToggleColorMode/ToggleColorMode'
import BudgetOverview from '../components/BudgetOverview/BudgetOverview';
import UserForm from '../components/UserForm/UserForm';





export default function BasePage() {
  const { user, error, isLoading } = useUser();



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
      <div>
        <UserForm />
        <ToggleColorMode />
        <BudgetOverview />
      </div>
    </div>
  );
}
