import React, { useState } from 'react';
import { useColorMode } from '@chakra-ui/react'; // Import useColorMode

import UpdatedUser from '@/lib/database/apiFunctions/UpdateUser';
import { generateDateId } from '@/lib/functions/GenerateDateId';
//Redux Imports
import { setUserData } from '@/src/store/userSlice';
import { setLoadingScreen } from '@/src/store/loadingScreenSlice';
import { useDispatch, useSelector } from 'react-redux';




const BudgetOverview: React.FC = () => {

    let purchaseTotal = 0;

    // Redux
    const dispatch = useDispatch();
    const userData = useSelector((state: any) => state.user.userData);
    // Color Mode
    const { colorMode } = useColorMode(); // Get the current color mode from useColorMode
    const isDarkMode = colorMode === 'dark'; // Check if it's dark mode

    // calculates user's budget from monthly expenses
    const [purchaseAmount, setPurchaseAmount] = useState<number>(0);
    const [purchaseName, setPurchaseName] = useState<string>('');
    const [purchaseCategory, setPurchaseCategory] = useState<string>('');


    const [currentTotal, setCurrentTotal] = useState<number>(
        userData
            ? userData.budget.income -
            userData.budget.housing -
            userData.budget.utilities -
            userData.budget.debt -
            userData.budget.car -
            userData.budget.phone -
            userData.budget.internet -
            userData.budget.subscriptions -
            userData.budget.insurance -
            userData.budget.childCare -
            userData.budget.internet -
            (userData.purchaseHistory?.filter((purchase: { purchaseDate: number; }) => purchase.purchaseDate === generateDateId())?.reduce((total: any, purchase: { purchaseAmount: any; }) => total + purchase.purchaseAmount, 0) || 0)
            : 0
    );

    // calculate user's remaining balance after calculating purchaseHistory
    if (userData.purchaseHistory) {
        for (let purchase of userData.purchaseHistory) {
            purchaseTotal += purchase.purchaseAmount
        }
    }


    // We generate a dateId when the page loads to avoid having a specific issue when a user attempts to make a purchase seconds before the begining of the next month(11:59pm).
    // This way the ID will remain consistent for the purchase being added.
    const dateId = generateDateId();

    const handleAddPurchase = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(setLoadingScreen(true))

        // Ensure purchaseAmount is a valid integer
        const purchaseValue = parseInt(purchaseAmount.toString(), 10); if (isNaN(purchaseValue)) {
            alert('Please enter a valid integer for the purchase amount.');
            return;
        }

        // Update currentTotal by subtracting the purchaseAmount
        setCurrentTotal((prevTotal) => prevTotal - purchaseValue);

        // The purchase gets recorded in the user's purchase history
        const purchaseData = {
            purchaseAmount: purchaseAmount,
            purchaseDate: dateId,
            purchaseName: purchaseName,
            purchaseCategory: purchaseCategory
        };
        const updatedUser = {
            ...userData,
            purchaseHistory: [...(userData?.purchaseHistory || []), purchaseData],
        };
        try {
            await UpdatedUser(updatedUser)
            dispatch(setUserData(updatedUser));
        } catch (error) {
            console.error("UpdateUser Failed: oh no.... our table.... it's broken. Inside BudgetOverview.tsx", error)
        }
        setPurchaseAmount(0);
        setPurchaseName('');
        setPurchaseCategory('');
        dispatch(setLoadingScreen(false));

    };


    if (userData) {
        return (
            <div className={`${isDarkMode ? 'dark darkModeShadow' : 'light lightModeShadow'} my-16 py-4 px-12 rounded-lg  max-w-[800px] mx-auto`}>
                <div  >
                    {currentTotal}
                </div>
                <div className='py-10'>
                    <div className='text-2xl font-extrabold'>
                        Add a purchase:

                    </div>
                    <form onSubmit={handleAddPurchase}>
                        <div className="flex flex-col sm:flex-row justify-between">
                            <div className='py-4 font-bold'>
                                Amount($):
                                <input
                                    type="number"
                                    className='p-2 rounded-2xl shadow-xl border ml-2 sm:ml-0'
                                    value={purchaseAmount}
                                    onChange={(e) => setPurchaseAmount(parseInt(e.target.value, 10) || 0)}
                                />
                            </div>
                            <div className='py-4 font-bold'>
                                Item name:
                                <input
                                    type="text"
                                    className='p-2 rounded-2xl shadow-xl border ml-2 sm:ml-0'
                                    value={purchaseName}
                                    onChange={(e) => setPurchaseName(e.target.value)} />
                            </div>
                            <div className='py-4 font-bold'>
                                Category:
                                <input
                                    type="text"
                                    className='p-2 rounded-2xl shadow-xl border ml-5 sm:ml-0'
                                    value={purchaseCategory}
                                    onChange={(e) => setPurchaseCategory(e.target.value)} />
                            </div>
                        </div>
                        <button type="submit" className='font-extrabold bg-green-600 p-4 rounded-2xl'>Add Purchase</button>
                    </form>
                </div>
                {/* This displays user purchases for the current month */}
                {userData.purchaseHistory && userData.purchaseHistory.length > 0 && (
                    <div>
                        <h2>Purchase History:</h2>
                        <ul >
                            {userData.purchaseHistory
                                .filter((purchase: any) => purchase.purchaseDate === generateDateId())
                                .reverse() // Reverse the order of the array
                                .map((purchase: any, index: number) => (
                                    <li key={`${purchase.purchaseDate}_${index}`}>
                                        <div className="border-2 p-4 flex flex-col sm:flex-row shadow-md rounded-2xl w-full my-4 justify-between">
                                            <div className='mb-2 sm:mb-0 sm:mr-2'>
                                                <div className='font-extrabold'>Name: </div>{purchase.purchaseName}
                                            </div>
                                            <div className='mb-2 sm:mb-0 sm:mr-2'>
                                                <div className='font-extrabold'>Purchase Amount: </div>{purchase.purchaseAmount}
                                            </div>
                                            <div>
                                                <div className='font-extrabold'>Category: </div>{purchase.purchaseCategory}
                                            </div>
                                        </div>
                                    </li>
                                ))}
                        </ul>
                    </div>
                )}
            </div>
        );
    }

};

export default BudgetOverview;
