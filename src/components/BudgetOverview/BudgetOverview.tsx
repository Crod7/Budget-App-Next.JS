import React from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useColorMode } from '@chakra-ui/react'; // Import useColorMode

const BudgetOverview = () => {
    const { user, error, isLoading } = useUser();

    const { colorMode } = useColorMode(); // Get the current color mode from useColorMode
    const isDarkMode = colorMode === 'dark'; // Check if it's dark mode



    if (user){
        return (
            <div className={`${isDarkMode ? 'dark darkModeShadow' : 'light lightModeShadow'} m-4 p-4 rounded-lg`} >
                <div>{user?.name}</div>
                {user?.nickname}
            </div>
        );
    }
    if (!user){
        return (
            <div>
                nope
            </div>
        )
    }

};

export default BudgetOverview;
