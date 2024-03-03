import React from 'react';
import { generateDateId } from '@/lib/functions/GenerateDateId';
//Redux Imports
import { useSelector } from 'react-redux';




const CategoryList: React.FC = () => {

    // Redux
    const userData = useSelector((state: any) => state.user.userData);

    return (
        <div>
            {
                userData.purchaseHistory && userData.purchaseHistory.length > 0 && (
                    <div>
                        <h2 className='font-extrabold text-3xl'>Categories:</h2>
                        <ul >
                            {userData.categories.map((category: any) => (
                                <div className='font-extrabold'>
                                    {category.categoryName}
                                    {
                                        userData.purchaseHistory
                                            .filter((purchase: any) => purchase.purchaseDate === generateDateId())
                                            .filter((purchase: any) => purchase.purchaseCategory === category.categoryName)
                                            .map((purchase: any, index: number) => (
                                                <li key={`${index}`}>
                                                    {purchase.purchaseName}
                                                </li>
                                            ))
                                    }
                                </div>

                            ))}

                        </ul>
                    </div>
                )
            }
        </div>)
};


export default CategoryList;
