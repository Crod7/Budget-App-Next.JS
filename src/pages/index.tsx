import React, { useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import LoadingScreen from '../components/Utility/Loading-Feature/LoadingScreen';
import BudgetSetup from '@/src/components/BudgetSetup';
import UserData from '@/src/types/UserData';
import BudgetOverview from '@/src/components/BudgetOverview';
import Navbar from '@/src/components/Navbar';

export default function BasePage() {
    const { user, error, isLoading } = useUser();
    const [userData, setUserData] = useState<UserData | null>(null);


    // While loading user data, display loading screen
    if (isLoading) {
        return (
            <div>
                <LoadingScreen />
            </div>
        );
    }


    // If error occurs, display error
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    // If user logged in and has a budget created
    if (userData && userData.budget) {
        return (
            <div>
                <Navbar userData={userData} setUserData={setUserData} />
                <BudgetOverview userData={userData} />
            </div>
        );
    }

    // If user logged in but budget hasn't been created
    if (userData && !userData.budget) {

        return (
            <div>
                <Navbar userData={userData} setUserData={setUserData} />
                <BudgetSetup userData={userData} setUserData={setUserData} />
            </div>
        );
    }

    // Default case (e.g., user is not logged in)
    return (
        <div>
            <Navbar userData={userData} setUserData={setUserData} />
        </div>
    );
}
