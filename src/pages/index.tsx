import React, { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import LoadingScreen from '../components/Utility/Loading-Feature/LoadingScreen';
import ToggleColorMode from '../components/Utility/ToggleColorMode/ToggleColorMode'
import BudgetOverview from '../components/BudgetOverview/BudgetOverview';
import UserForm from '../components/UserForm/UserForm';
import BudgetSetup from '@/src/components/BudgetSetup';





export default function BasePage() {
  const { user, error, isLoading } = useUser();


  // While loading display loading screen
  if (isLoading) {
    return (
      <div>
        <LoadingScreen />
      </div>
    );
  }
  // If error occurs display error
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  // If user logged in
  if (user) {
    return (
      <div>
        <ToggleColorMode />
        <BudgetSetup />
      </div>
    );
  }

}
