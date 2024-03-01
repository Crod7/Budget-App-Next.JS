import React from 'react';
import LoadingScreen from '../components/Utility/Loading-Feature/LoadingScreen';
import Navbar from '@/src/components/Navbar';
import MainWithBudget from '../containers/MainWithBudget';
import MainWithoutBudget from '../containers/MainWithoutBudget';
import Category from '../containers/Category';
//Redux Imports
import { useSelector } from 'react-redux';

export default function BasePage() {
    // Redux
    const userData = useSelector((state: any) => state.user.userData);
    const loadingScreen = useSelector((state: any) => state.loadingScreen.loadingScreen);
    const page = useSelector((state: any) => state.page.page)

    return (
        <div>
            {loadingScreen && (
                <LoadingScreen />
            )}
            <Navbar />
            {(page === 'main' && userData && userData.budget) && (
                <MainWithBudget />
            )}
            {(page === 'main' && userData && !userData.budget) && (
                <MainWithoutBudget />
            )}
            {(page === 'budget' && userData && userData.budget) && (
                <MainWithoutBudget />
            )}
            {(page === 'category' && userData) && (
                <Category />
            )}
        </div>
    );
}
