import React, { useEffect, useState } from 'react';
import { generateDateId } from '@/lib/functions/GenerateDateId';
import UpdatedUser from '@/lib/database/apiFunctions/UpdateUser';



//Redux Imports
import { setUserData } from '@/src/store/userSlice';
import { setLoadingScreen } from '@/src/store/loadingScreenSlice';
import { useDispatch, useSelector } from 'react-redux';



// This component will allow users to create custom categories in their budgets to help
// them remain in their budget for each spending category.
const CategoryList: React.FC = () => {

    // Redux
    const dispatch = useDispatch();
    const userData = useSelector((state: any) => state.user.userData);

    // We want the user's budget after they have paid their fixed bills
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
            internet
        );
    });

    const [unusedTotal, setUnusedTotal] = useState<number>(0)


    function generateRemainingBalance(amount: any, category: any) {
        if (userData.purchaseHistory) {
            let purchases = userData.purchaseHistory
                .filter((purchase: any) => purchase.purchaseDate === generateDateId())
                .filter((purchase: any) => purchase.purchaseCategory === category.categoryName)


            const parseBudgetItem = (item: string) => parseFloat(item) || 0;

            for (let purchase of purchases) {
                amount = parseBudgetItem(amount) - parseBudgetItem(purchase.purchaseAmount)
            }
            return amount.toFixed(2)
        } else {
            return amount.toFixed(2)
        }
    }



    // Below is the code needed to modify existing categories
    const [showModal, setShowModal] = useState(false); // Opens the modal
    const [category, setCategory] = useState(Object) // Sets the category that will be modified
    const [newCategoryName, setNewCategoryName] = useState<string>('');
    const [newCategoryAmount, setNewCategoryAmount] = useState<string>('');
    const [selectedCategoryID, setSelectedCategoryID] = useState<Number>(0);

    // Below is the code needed to keep unused budget up to date.

    useEffect(() => {
        if (userData.categories && userData.categories.length > 0) {
            let temp = 0;
            for (let item of userData.categories) {
                temp = temp + item.categoryAmount;
            }
            setUnusedTotal(currentTotal - temp);
        }
        else {
            setUnusedTotal(currentTotal)
        }

    }, [category, userData]);
    console.log(userData)


    const handleUpdateCategory = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(setLoadingScreen(true))

        // Ensure newCategoryAmount is a valid integer
        if (newCategoryName && newCategoryAmount) {
            // Verify amount is a number
            const categoryValue = parseFloat(newCategoryAmount);
            if (isNaN(categoryValue) || categoryValue < 0 || !/^\d+(\.\d{1,2})?$/.test(categoryValue.toString())) {
                alert('Please enter a valid amount with up to two decimal places.');
                dispatch(setLoadingScreen(false))
                return;
            }
            // Find the index of the category to be updated
            const categoryIndex = userData.categories.findIndex((cat: any) => cat.categoryId === selectedCategoryID);
            // If the category exists, update it
            if (categoryIndex !== -1) {
                const updatedCategories = [...userData.categories];
                updatedCategories[categoryIndex] = {
                    categoryName: newCategoryName,
                    categoryId: selectedCategoryID,
                    categoryAmount: parseFloat(newCategoryAmount)
                };

                const updatedUser = {
                    ...userData,
                    categories: updatedCategories,
                };

                try {
                    await UpdatedUser(updatedUser);
                    dispatch(setUserData(updatedUser));
                } catch (error) {
                    console.error("UpdateUser Failed: oh no.... our table.... it's broken. Inside CategoryCreate.tsx", error);
                }
            } else {
                alert('Category not found for update.');
            }
            setNewCategoryName('');
            setNewCategoryAmount('');
        } else {
            alert('Please fill in all fields.');
        }
        setShowModal(false)
        dispatch(setLoadingScreen(false));

    };

    return (
        <div>
            {/** This modal will manage the update of the category by displaying all improtant information the user needs to know to update the category. */}
            {(showModal) && (
                <form onSubmit={handleUpdateCategory}>

                    <div className='fixed top-0 left-0 w-full h-full bg-opacity-50 bg-black flex justify-center items-center z-40'>
                        <div className='bg-gray-500 w-[700px] h-[500px] py-2 px-2 rounded-xl'>
                            <button className="ml-[97%] font-extrabold text-xl" onClick={() => {
                                setShowModal(false);
                            }}>
                                x
                            </button>
                            <div>
                                <div className='font-extrabold py-4 min-w-[150px] rounded-2xl'>
                                    Current Category ID: {category.categoryId}
                                </div>

                                <div className='font-extrabold py-4 min-w-[150px] rounded-2xl'>
                                    Current Category Name: {category.categoryName}
                                </div>

                                <input
                                    type="text"
                                    placeholder='Category Name'
                                    className='p-2 my-2 rounded-2xl shadow-xl border w-[100%] font-extrabold'
                                    value={newCategoryName}
                                    onChange={(e) => setNewCategoryName(e.target.value)}
                                />
                                <div className='font-extrabold py-4 min-w-[150px] rounded-2xl'>
                                    Current Category Amount: {category.categoryAmount}
                                </div>
                                <input
                                    type="text"
                                    placeholder='Amount in this budget'
                                    className='p-2 my-2 rounded-2xl shadow-xl border w-[100%] font-extrabold'
                                    value={newCategoryAmount}
                                    onChange={(e) => setNewCategoryAmount(e.target.value)}
                                />
                                <button type="submit" className='font-extrabold bg-green-500 p-4 min-w-[150px] rounded-2xl'>Submit Changes</button>

                            </div>
                        </div>

                    </div>
                </form>
            )}
            {
                userData.purchaseHistory && userData.purchaseHistory.length > 0 && (
                    <div>
                        <div className='font-extrabold text-center text-2xl py-4'>
                            <div>
                                Unused Budget:
                            </div>
                            <div>
                                {unusedTotal.toFixed(2)} / {currentTotal.toFixed(2)}
                            </div>

                        </div>
                        <h2 className='font-extrabold text-3xl'>Categories:</h2>

                    </div>
                )
            }
            {
                !userData.purchaseHistory && (
                    <div>
                        <div className='font-extrabold text-center text-2xl py-4'>
                            <div>
                                Unused Budget:
                            </div>
                            <div>
                                {unusedTotal.toFixed(2)} / {currentTotal.toFixed(2)}
                            </div>

                        </div>
                        <h2 className='font-extrabold text-3xl'>Categories:</h2>

                    </div>
                )
            }
            <div>
                {userData.categories && (userData.categories.map((category: any) => (
                    <div key={category.categoryId} className='font-extrabold flex p-2'>
                        <div>
                            {category.categoryName}
                        </div>
                        <div className='ml-auto'>
                            {generateRemainingBalance(category.categoryAmount, category)} / {category.categoryAmount}
                        </div>
                        {/** When the user selects the modify button we open the modal with the category's information loaded in. */}
                        <button type="submit" onClick={() => {
                            setCategory(category); // We set the category to the one we are trying to modify
                            setNewCategoryAmount(category.categoryAmount) // This sets the current value as the default value
                            setNewCategoryName(category.categoryName) // This sets the current value as the default value
                            setSelectedCategoryID(category.categoryId)
                            setShowModal(true);
                        }} className='font-extrabold bg-gray-500 p-4 ml-4 min-w-[50px] rounded-2xl'>Modify</button>
                    </div>
                )))}
            </div>
        </div>)
};


export default CategoryList;
