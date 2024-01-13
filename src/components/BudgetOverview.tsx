import React, { useEffect, useState } from 'react';
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
    const [purchaseAmount, setPurchaseAmount] = useState<string>('');
    const [purchaseName, setPurchaseName] = useState<string>('');
    const [purchaseCategory, setPurchaseCategory] = useState<string>('');


    const [currentTotal, setCurrentTotal] = useState<number>(
        userData
            ? parseFloat(userData.budget.income) -
            parseFloat(userData.budget.housing) -
            parseFloat(userData.budget.utilities) -
            parseFloat(userData.budget.debt) -
            parseFloat(userData.budget.car) -
            parseFloat(userData.budget.phone) -
            parseFloat(userData.budget.subscriptions) -
            parseFloat(userData.budget.insurance) -
            parseFloat(userData.budget.childCare) -
            parseFloat(userData.budget.internet) -
            (userData.purchaseHistory?.filter(
                (purchase: { purchaseDate: number }) =>
                    purchase.purchaseDate === generateDateId()
            )?.reduce((total: any, purchase: { purchaseAmount: any }) => total + parseFloat(purchase.purchaseAmount), 0) || 0)
            : 0
    );
    // Convert to string and back to number with two decimal places... avoids floating point precision bug
    useEffect(() => {
        const roundedTotal = parseFloat(currentTotal.toFixed(2));
        setCurrentTotal(roundedTotal);
    }, [currentTotal]);

    // calculate user's remaining balance after calculating purchaseHistory
    if (userData.purchaseHistory) {
        for (let purchase of userData.purchaseHistory) {
            purchaseTotal += purchase.purchaseAmount
        }
    }


    // We generate a dateId when the page loads to avoid having a specific issue when a user attempts to make a purchase seconds before the begining of the next month(11:59pm).
    // This way the ID will remain consistent for the purchase being added.
    const dateId = generateDateId();

    // We grab the users timezone to use later.
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const handleAddPurchase = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(setLoadingScreen(true))

        // Ensure purchaseAmount is a valid integer
        if (purchaseAmount && purchaseName && purchaseCategory) {
            const purchaseValue = parseFloat(purchaseAmount);
            if (isNaN(purchaseValue) || purchaseValue < 0 || !/^\d+(\.\d{1,2})?$/.test(purchaseAmount)) {
                alert('Please enter a valid amount with up to two decimal places.');
                dispatch(setLoadingScreen(false))
                return;
            }



            // Update currentTotal by subtracting the purchaseAmount
            setCurrentTotal((prevTotal) => prevTotal - purchaseValue);

            // The purchase gets recorded in the user's purchase history
            const purchaseData = {
                purchaseAmount: purchaseAmount,
                purchaseDate: dateId,
                purchaseName: purchaseName,
                purchaseCategory: purchaseCategory,
                purchaseDateTime: new Date().toLocaleString("en-US", { timeZone: userTimeZone }),
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
            setPurchaseAmount('');
            setPurchaseName('');
            setPurchaseCategory('');
        } else {
            alert('Please fill in all fields.');
        }
        dispatch(setLoadingScreen(false));
    };


    if (userData) {
        return (
            <div className={`${isDarkMode ? 'dark darkModeShadow' : 'light lightModeShadow'} my-16 py-4 px-12 rounded-lg  max-w-[800px] mx-auto`}>
                <div className='text-5xl font-extrabold text-green-500 text-center'>
                    ${currentTotal}
                </div>
                <div className='py-10 flex'>
                    <div className=' w-full'>
                        <div className='text-2xl font-extrabold'>
                            Add a purchase:

                        </div>
                        <form onSubmit={handleAddPurchase}>
                            <div className="flex flex-col sm:flex-row justify-between w-[100%]">
                                <div className='py-4 font-bold'>
                                    <input
                                        type="text"
                                        placeholder='Amount($)'
                                        className='p-2 rounded-2xl shadow-xl border ml-2 sm:ml-0 sm:w-[90%]'
                                        value={purchaseAmount}
                                        onChange={(e) => setPurchaseAmount(e.target.value)}
                                    />

                                </div>
                                <div className='py-4 font-bold'>
                                    <input
                                        type="text"
                                        placeholder='Purchase Name'
                                        className='p-2 rounded-2xl shadow-xl border ml-2 sm:ml-0 sm:w-[90%]'
                                        value={purchaseName}
                                        onChange={(e) => setPurchaseName(e.target.value)} />
                                </div>
                                <div className='py-4 font-bold '>
                                    <input
                                        type="text"
                                        placeholder='Category'
                                        className='p-2 rounded-2xl shadow-xl border ml-2 sm:ml-0 sm:w-[90%]'
                                        value={purchaseCategory}
                                        onChange={(e) => setPurchaseCategory(e.target.value)} />
                                </div>
                            </div>
                            <div className='flex w-full gap-4'>
                                <button type="submit" className='font-extrabold bg-green-500 p-4 min-w-[150px] rounded-2xl '>Add Purchase</button>
                                <button type="button" onClick={() => {
                                    setPurchaseAmount('');
                                    setPurchaseName('');
                                    setPurchaseCategory('');
                                }} className='font-extrabold bg-red-500 p-4 min-w-[150px] rounded-2xl '>Clear</button>


                            </div>
                        </form>
                    </div>

                </div>
                {/* This displays user purchases for the current month */}
                {userData.purchaseHistory && userData.purchaseHistory.length > 0 && (
                    <div>
                        <h2 className='font-extrabold text-3xl'>Purchase History:</h2>
                        <ul >
                            {userData.purchaseHistory
                                .filter((purchase: any) => purchase.purchaseDate === generateDateId())
                                .reverse() // Reverse the order of the array
                                .map((purchase: any, index: number) => (
                                    <li key={`${purchase.purchaseDate}_${index}`}>
                                        <div className="border-2 p-4 flex flex-col sm:flex-row shadow-md rounded-2xl w-full my-4 justify-between">
                                            <div className='mb-2 sm:mb-0 sm:mr-2'>
                                                <div className='font-extrabold'>Name: </div>{purchase.purchaseName}
                                                <div className='text-gray-500 font-extralight'>{(purchase && purchase.purchaseDateTime) ? purchase.purchaseDateTime : 'Date not available'}</div>

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
