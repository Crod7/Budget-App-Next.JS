import React, { useEffect, useState } from 'react';
import { generateDateId } from '@/lib/functions/GenerateDateId';
//Redux Imports
import { useSelector } from 'react-redux';



// This component will allow users to create custom categories in their budgets to help
// them remain in their budget for each spending category.
const CategoryList: React.FC = () => {

    // Redux
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
        let purchases = userData.purchaseHistory
            .filter((purchase: any) => purchase.purchaseDate === generateDateId())
            .filter((purchase: any) => purchase.purchaseCategory === category.categoryName)
        const parseBudgetItem = (item: string) => parseFloat(item) || 0;

        for (let purchase of purchases) {
            amount = parseBudgetItem(amount) - parseBudgetItem(purchase.purchaseAmount)
        }
        return amount.toFixed(2)
    }



    // Below is the code needed to modify existing categories
    const [showModal, setShowModal] = useState(false);
    const [category, setCategory] = useState(Object)

    // Below is the code needed to keep unused budget up to date.
    useEffect(() => {
        let temp = 0;
        for (let item of userData.categories) {
            temp = temp + item.categoryAmount;
        }
        setUnusedTotal(currentTotal - temp);
    }, [category, userData]);

    return (
        <div>
            {(showModal) && (
                <div className='fixed top-0 left-0 w-full h-full bg-opacity-50 bg-black flex justify-center items-center z-40'>
                    <div className='bg-gray-500 w-[700px] h-[500px] py-2 px-2 rounded-xl'>
                        <button className="ml-[97%] font-extrabold text-xl" onClick={() => {
                            setShowModal(false);
                        }}>
                            x
                        </button>
                        <div>
                            Cow
                        </div>
                    </div>

                </div>
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
                        <div>
                            {userData.categories && (userData.categories.map((category: any) => (
                                <div key={category.categoryId} className='font-extrabold flex p-2'>
                                    <div>
                                        {category.categoryName}
                                    </div>
                                    <div className='ml-auto'>
                                        {generateRemainingBalance(category.categoryAmount, category)} / {category.categoryAmount}
                                    </div>
                                    <button type="submit" onClick={() => {
                                        setCategory(category);
                                        setShowModal(true);
                                    }} className='font-extrabold bg-gray-500 p-4 ml-4 min-w-[50px] rounded-2xl'>Modify</button>
                                </div>
                            )))}
                        </div>
                    </div>
                )
            }
        </div>)
};


export default CategoryList;
