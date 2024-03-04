import React, { useState } from 'react';
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

    return (
        <div>
            {
                userData.purchaseHistory && userData.purchaseHistory.length > 0 && (
                    <div>
                        <div className='font-extrabold text-center text-2xl py-4'>
                            <div>
                                Remaining Budget:
                            </div>
                            <div>
                                {currentTotal} / {currentTotal}
                            </div>

                        </div>
                        <h2 className='font-extrabold text-3xl'>Categories:</h2>
                        <div>
                            {userData.categories.map((category: any) => (
                                <div key={category.categoryId} className='font-extrabold flex p-2'>
                                    <div>
                                        {category.categoryName}
                                    </div>
                                    <div className='ml-auto'>
                                        {generateRemainingBalance(category.categoryAmount, category)} / {category.categoryAmount}
                                    </div>
                                    <button type="submit" className='font-extrabold bg-gray-500 p-4 ml-4 min-w-[50px] rounded-2xl '>Modify</button>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            }
        </div>)
};


export default CategoryList;
