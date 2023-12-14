import React, { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import LoadingScreen from '../components/Utility/Loading-Feature/LoadingScreen';
import BudgetSetup from '@/src/components/BudgetSetup';
import GetUser from '@/lib/database/apiFunctions/GetUser';

interface UserData {
    budget?: any;               // The user may or may not have a budget created
}

export default function BasePage() {
    const { user, error, isLoading } = useUser();
    const [userData, setUserData] = useState<UserData | null>(null);

    const getUserData = async () => {
        if (user) {
            try {
                const data = await GetUser(user.email);
                setUserData(data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }

    };

    useEffect(() => {
        if (user) {
            getUserData();
        }
    }, [user]);

    // While loading or waiting for data, display loading screen
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
        return <div>Hi</div>;
    }

    // If user logged in but budge hasn't been created
    if (userData && !userData.budget) {
        return <BudgetSetup />;
    }
}
