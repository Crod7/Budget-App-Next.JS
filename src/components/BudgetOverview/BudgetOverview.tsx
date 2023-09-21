import React from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useColorMode } from '@chakra-ui/react'; // Import useColorMode

const BudgetOverview = () => {
  const { user, error, isLoading } = useUser();
  const { colorMode } = useColorMode(); // Get the current color mode
  const isDarkMode = colorMode === 'dark'; // Check if it's dark mode
  const customColorModeClass = isDarkMode ? 'dark' : 'light'; // Determine the appropriate class


  return (
    <div className={`${customColorModeClass}`} >
      <div>{user?.name}</div>
      {user?.nickname}
      {customColorModeClass}
    </div>
  );
};

export default BudgetOverview;
