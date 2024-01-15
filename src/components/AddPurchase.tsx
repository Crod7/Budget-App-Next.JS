import React, { useEffect, useState } from 'react';

import UpdatedUser from '@/lib/database/apiFunctions/UpdateUser';
import { generateDateId } from '@/lib/functions/GenerateDateId';

//Redux Imports
import { setUserData } from '@/src/store/userSlice';
import { setLoadingScreen } from '@/src/store/loadingScreenSlice';
import { useDispatch, useSelector } from 'react-redux';




const AddPurchase: React.FC = () => {

    let purchaseTotal = 0;

    // Redux
    const dispatch = useDispatch();
    const userData = useSelector((state: any) => state.user.userData);

    // Calculates user's budget from monthly expenses
    const [purchaseAmount, setPurchaseAmount] = useState<string>('');
    const [purchaseName, setPurchaseName] = useState<string>('');
    const [purchaseCategory, setPurchaseCategory] = useState<string>('');


    const [currentTotal, setCurrentTotal] = useState<number>(() => {
        const parseBudgetItem = (item: string) => parseFloat(item) || 0;

        const initialIncome = parseBudgetItem(userData?.budget.income);
        const housing = parseBudgetItem(userData?.budget.housing);
        const utilities = parseBudgetItem(userData?.budget.utilities);
        const debt = parseBudgetItem(userData?.budget.debt);
        const car = parseBudgetItem(userData?.budget.car);
        const phone = parseBudgetItem(userData?.budget.phone);
        const subscriptions = parseBudgetItem(userData?.budget.subscriptions);
        const insurance = parseBudgetItem(userData?.budget.insurance);
        const childCare = parseBudgetItem(userData?.budget.childCare);
        const internet = parseBudgetItem(userData?.budget.internet);

        const purchaseHistoryTotal = (userData?.purchaseHistory || [])
            .filter((purchase: { purchaseDate: number }) =>
                purchase.purchaseDate === generateDateId()
            )
            .reduce(
                (total: any, purchase: { purchaseAmount: any }) =>
                    total + parseFloat(purchase.purchaseAmount),
                0
            ) || 0;

        return (
            initialIncome -
            housing -
            utilities -
            debt -
            car -
            phone -
            subscriptions -
            insurance -
            childCare -
            internet -
            purchaseHistoryTotal
        );
    });

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
            <div >
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

            </div>
        );
    }

};

export default AddPurchase;
