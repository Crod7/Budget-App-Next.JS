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
    const [categoryName, setCategoryName] = useState<string>('');

    // Generates an ID for the category
    function getRandomInt(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const handleAddCategory = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(setLoadingScreen(true))

        // Ensure purchaseAmount is a valid integer
        if (categoryName) {

            // The purchase gets recorded in the user's purchase history
            const categoryData = {
                categoryName: categoryName,
                categoryId: getRandomInt(0, 100000)
            };
            const updatedUser = {
                ...userData,
                categories: [...(userData?.categories || []), categoryData],
            };
            try {
                await UpdatedUser(updatedUser)
                dispatch(setUserData(updatedUser));
            } catch (error) {
                console.error("UpdateUser Failed: oh no.... our table.... it's broken. Inside CategoryCreate.tsx", error)
            }
            setCategoryName('');
        } else {
            alert('Please fill in all fields.');
        }
        dispatch(setLoadingScreen(false));
    };


    if (userData) {
        return (
            <form onSubmit={handleAddCategory}>
                <div className='py-8'>
                    <input
                        type="text"
                        placeholder='Category Name'
                        className='p-2 rounded-2xl shadow-xl border w-[100%] font-extrabold'
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                    />

                </div>

                <div className='flex w-full gap-4 p-4 justify-center'>
                    <button type="submit" className='font-extrabold bg-green-500 p-4 min-w-[150px] rounded-2xl '>Add Category</button>
                    <button type="button" onClick={() => {
                        setCategoryName('');
                    }} className='font-extrabold bg-red-500 p-4 min-w-[150px] rounded-2xl '>Clear</button>

                </div>
            </form>
        );
    }

};

export default CategoryCreate;
