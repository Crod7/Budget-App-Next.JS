import React, { useState } from 'react';
import { useColorMode } from '@chakra-ui/react'; // Import useColorMode
import UserData from '@/src/types/UserData';

interface BudgetOverviewProps {
    userData: UserData | null;
}

const BudgetOverview: React.FC<BudgetOverviewProps> = ({ userData }) => {


    const { colorMode } = useColorMode(); // Get the current color mode from useColorMode
    const isDarkMode = colorMode === 'dark'; // Check if it's dark mode





    if (userData) {
        return (
            <div className={`${isDarkMode ? 'dark darkModeShadow' : 'light lightModeShadow'} my-16 py-4 px-12 rounded-lg min-w-[400px] max-w-[700px] mx-auto`} >
                {userData.budget.income}
            </div >

        );
    }

};

export default BudgetOverview;
