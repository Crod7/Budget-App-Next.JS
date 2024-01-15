import React from 'react';
import { generateDateId } from '@/lib/functions/GenerateDateId';
//Redux Imports
import { useSelector } from 'react-redux';




const PurchaseHistory: React.FC = () => {

    // Redux
    const userData = useSelector((state: any) => state.user.userData);

    return (
        <div>
            {
                userData.purchaseHistory && userData.purchaseHistory.length > 0 && (
                    <div>
                        <h2 className='font-extrabold text-3xl'>Purchase History:</h2>
                        <ul >
                            {userData.purchaseHistory
                                .filter((purchase: any) => purchase.purchaseDate === generateDateId())
                                .reverse() // Reverse the order of the array
                                .map((purchase: any, index: number) => (
                                    <li key={`${purchase.purchaseDate}_${index}`}>
                                        <div className="border-2 p-4 flex sm:flex-row shadow-md rounded-2xl w-full my-4 justify-between px-10">
                                            <div className='mb-2 sm:mb-0 sm:mr-2'>
                                                <div className='font-extrabold'>{purchase.purchaseName}</div>
                                                <div className='text-gray-500 font-extralight'>{(purchase && purchase.purchaseDateTime) ? purchase.purchaseDateTime : 'Date not available'}</div>

                                            </div>
                                            <div className='mb-2 sm:mb-0 sm:mr-2'>
                                                <div className='font-extrabold text-green-500 text-xl'>${purchase.purchaseAmount} </div>
                                            </div>

                                        </div>
                                    </li>
                                ))}
                        </ul>
                    </div>
                )
            }
        </div>)
};


export default PurchaseHistory;
