import React, { useEffect, useState } from 'react';

import UpdatedUser from '@/lib/database/apiFunctions/UpdateUser';
import { generateDateId } from '@/lib/functions/GenerateDateId';

//Redux Imports
import { setUserData } from '@/src/store/userSlice';
import { setLoadingScreen } from '@/src/store/loadingScreenSlice';
import { useDispatch, useSelector } from 'react-redux';




const CategoryCreate: React.FC = () => {

    // Redux
    const dispatch = useDispatch();
    const userData = useSelector((state: any) => state.user.userData);

    // Calculates user's budget from monthly expenses
    const [purchaseAmount, setPurchaseAmount] = useState<string>('');


    const handleAddPurchase = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(setLoadingScreen(true))

        // Ensure purchaseAmount is a valid integer
        if (purchaseAmount) {
            const purchaseValue = parseFloat(purchaseAmount);
            if (isNaN(purchaseValue) || purchaseValue < 0 || !/^\d+(\.\d{1,2})?$/.test(purchaseValue.toString())) {
                alert('Please enter a valid amount with up to two decimal places.');
                dispatch(setLoadingScreen(false))
                return;
            }


            // The purchase gets recorded in the user's purchase history
            const purchaseData = {
                purchaseAmount: purchaseAmount,
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
        } else {
            alert('Please fill in all fields.');
        }
        dispatch(setLoadingScreen(false));
    };


    if (userData) {
        return (
            <div >

            </div>
        );
    }

};

export default CategoryCreate;
