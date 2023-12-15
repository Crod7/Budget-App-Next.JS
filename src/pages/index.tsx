import React, { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import LoadingScreen from '../components/Utility/Loading-Feature/LoadingScreen';
import BudgetSetup from '@/src/components/BudgetSetup';
import GetUser from '@/lib/database/apiFunctions/GetUser';
import UserData from '@/src/types/UserData';
import BudgetOverview from '@/src/components/BudgetOverview';
import Navbar from '@/src/components/Navbar';

export default function BasePage() {
    const { user, error, isLoading } = useUser();
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loadingUserData, setLoadingUserData] = useState(true);

    // We grab userData from the database by searching for it with the user from useUser
    const getUserData = async () => {
        if (user) {
            try {
                console.log(user.email)

                const data = await GetUser(user.email);
                console.log(data)
                setUserData(data);
                setLoadingUserData(false); // Set loading to false once data is fetched
                console.log("this is the user data", data);
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

    if (user) {
        // While loading user data, display loading screen
        if (isLoading || loadingUserData) {
            return (
                <div>
                    <LoadingScreen />
                </div>
            );
        }
    }


    // If error occurs, display error
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    // If user logged in and has a budget created
    if (userData && userData.budget) {
        return (
            <div>
                <Navbar userData={userData} />
                <BudgetOverview userData={userData} />
            </div>
        );
    }

    // If user logged in but budget hasn't been created
    if (userData && !userData.budget) {

        return (
            <div>
                <Navbar userData={userData} />
                <BudgetSetup userData={userData} />
            </div>
        );
    }

    // Default case (e.g., user is not logged in)
    return (
        <div>
            <Navbar userData={userData} />
        </div>
    );
}
