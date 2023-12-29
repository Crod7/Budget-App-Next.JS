import React, { useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import LoadingScreen from '../components/Utility/Loading-Feature/LoadingScreen';
import BudgetSetup from '@/src/components/BudgetSetup';
import UserData from '@/src/types/UserData';
import BudgetOverview from '@/src/components/BudgetOverview';
import Navbar from '@/src/components/Navbar';
import MainWithBudget from '../containers/MainWithBudget';
import MainWithoutBudget from '../containers/MainWithoutBudget';
//Redux Imports
import { setUserData } from '@/src/store/userSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function BasePage() {
    // Redux
    const userData = useSelector((state: any) => state.user.userData);

    const { user, error, isLoading } = useUser();
    const [loadingScreen, setLoadingScreen] = useState<boolean>(false);


    const props = {
        setLoadingScreen,
    };

    // While loading user data, display loading screen
    if (loadingScreen) {
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
                <MainWithBudget {...props} />
            </div>
        );
    }

    // If user logged in but budget hasn't been created
    if (userData && !userData.budget) {

        return (
            <div>
                <MainWithoutBudget {...props} />
            </div>
        );
    }

    // Default case (e.g., user is not logged in)
    return (
        <div>
            <Navbar {...props} />
        </div>
    );
}
