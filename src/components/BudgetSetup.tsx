import React, { useEffect, useState } from 'react';
import UpdatedUser from '@/lib/database/apiFunctions/UpdateUser';
//Redux Imports
import { setUserData } from '@/src/store/userSlice';
import { setLoadingScreen } from '@/src/store/loadingScreenSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '../store/pageSlice';


const BudgetSetup: React.FC = () => {
    // Redux
    const dispatch = useDispatch();
    const userData = useSelector((state: any) => state.user.userData);
    const page = useSelector((state: any) => state.page.page);

    // Use state to manage the input values depending on if a budget already exists or not
    const [income, setIncome] = useState<string>('');
    const [housing, setHousing] = useState<string>('');
    const [utilities, setUtilities] = useState<string>('');
    const [debt, setDebt] = useState<string>('');
    const [car, setCar] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [internet, setInternet] = useState<string>('');
    const [subscriptions, setSubscriptions] = useState<string>('');
    const [insurance, setInsurance] = useState<string>('');
    const [childCare, setChildCare] = useState<string>('');

    // Handle form submission
    const handleSubmit = async (event: React.FormEvent) => {

        dispatch(setLoadingScreen(true))

        event.preventDefault();
        const budgetData = {
            income,
            housing,
            utilities,
            debt,
            car,
            phone,
            internet,
            subscriptions,
            insurance,
            childCare,
        };
        const updatedUser = {
            ...userData,
            budget: budgetData,
        };
        try {
            await UpdatedUser(updatedUser)
            dispatch(setUserData(updatedUser));
            dispatch(setPage('main'))
        } catch (error) {
            console.error("UpdateUser Failed: oh no.... our table.... it's broken.", error)
        }
        dispatch(setLoadingScreen(false))
    };



    useEffect(() => {
        if (userData && userData.budget) {
            console.log(userData.budget)
            setIncome(userData.budget.income || '');
            setHousing(userData.budget.housing || '');
            setUtilities(userData.budget.utilities || '');
            setDebt(userData.budget.debt || '');
            setCar(userData.budget.car || '');
            setPhone(userData.budget.phone || '');
            setInternet(userData.budget.internet || '');
            setSubscriptions(userData.budget.subscriptions || '');
            setInsurance(userData.budget.insurance || '');
            setChildCare(userData.budget.childCare || '');
        }
    }, [userData]);

    if (userData) {
        return (
            <div>
                <div className='text-2xl font-bold'>Welcome {userData.name}!</div>
                <div className='text-lg font-bold'>Lets create your budget.</div>

                <div className='w-full flex font-extrabold py-4'>
                    <label htmlFor="income" className=' mx-4 my-auto text-center'>Income:</label>
                    <input
                        className={`p-2 rounded-2xl shadow-xl border ml-auto sm:w-[50%] w-[100px]`}
                        type="text"
                        placeholder='Income'
                        id="income"
                        value={income}
                        onChange={(e) => setIncome(e.target.value)}
                        required
                    />
                </div>
                <div className='w-full flex font-extrabold py-4'>
                    <label htmlFor="housing" className=' mx-4 my-auto text-center'>Rent/ Mortgage:</label>
                    <input
                        className={`p-2 rounded-2xl shadow-xl border ml-auto sm:w-[50%] w-[100px]`}
                        type="text"
                        placeholder='Housing'
                        id="housing"
                        value={housing}
                        onChange={(e) => setHousing(e.target.value)}
                        required
                    />
                </div>
                <div className='w-full flex font-extrabold py-4'>
                    <label htmlFor="utilities" className=' mx-4 my-auto text-center'>Utilities:</label>
                    <input
                        className={`p-2 rounded-2xl shadow-xl border ml-auto sm:w-[50%] w-[100px]`}
                        type="text"
                        placeholder='Utilities'
                        id="utilities"
                        value={utilities}
                        onChange={(e) => setUtilities(e.target.value)}
                        required
                    />
                </div>
                <div className='w-full flex font-extrabold py-4'>
                    <label htmlFor="debt" className=' mx-4 my-auto text-center'>Debt:</label>
                    <input
                        className={`p-2 rounded-2xl shadow-xl border ml-auto sm:w-[50%] w-[100px]`}
                        type="text"
                        placeholder='Debt Payments'
                        id="debt"
                        value={debt}
                        onChange={(e) => setDebt(e.target.value)}
                        required
                    />
                </div>
                <div className='w-full flex font-extrabold py-4'>
                    <label htmlFor="car" className=' mx-4 my-auto text-center'>Car:</label>
                    <input
                        className={`p-2 rounded-2xl shadow-xl border ml-auto sm:w-[50%] w-[100px]`}
                        type="text"
                        placeholder='Car Payments'
                        id="car"
                        value={car}
                        onChange={(e) => setCar(e.target.value)}
                        required
                    />
                </div>
                <div className='w-full flex font-extrabold py-4'>
                    <label htmlFor="phone" className=' mx-4 my-auto text-center'>Phone:</label>
                    <input
                        className={`p-2 rounded-2xl shadow-xl border ml-auto sm:w-[50%] w-[100px]`}
                        type="text"
                        placeholder='Phone'
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>
                <div className='w-full flex font-extrabold py-4'>
                    <label htmlFor="internet" className=' mx-4 my-auto text-center'>Internet:</label>
                    <input
                        className={`p-2 rounded-2xl shadow-xl border ml-auto sm:w-[50%] w-[100px]`}
                        type="text"
                        placeholder='Internet'
                        id="internet"
                        value={internet}
                        onChange={(e) => setInternet(e.target.value)}
                        required
                    />
                </div>
                <div className='w-full flex font-extrabold py-4'>
                    <label htmlFor="subscriptions" className=' mx-4 my-auto text-center'>Subscriptions:</label>
                    <input
                        className={`p-2 rounded-2xl shadow-xl border ml-auto sm:w-[50%] w-[100px]`}
                        type="text"
                        placeholder='Subscriptions'
                        id="subscriptions"
                        value={subscriptions}
                        onChange={(e) => setSubscriptions(e.target.value)}
                        required
                    />
                </div>
                <div className='w-full flex font-extrabold py-4'>
                    <label htmlFor="insurance" className=' mx-4 my-auto text-center'>Insurance:</label>
                    <input
                        className={`p-2 rounded-2xl shadow-xl border ml-auto sm:w-[50%] w-[100px]`}
                        type="text"
                        placeholder='Insurance'
                        id="insurance"
                        value={insurance}
                        onChange={(e) => setInsurance(e.target.value)}
                        required
                    />
                </div>
                <div className='w-full flex font-extrabold py-4'>
                    <label htmlFor="childCare" className=' mx-4 my-auto text-center'>Child Care:</label>
                    <input
                        className={`p-2 rounded-2xl shadow-xl border ml-auto sm:w-[50%] w-[100px]`}
                        type="text"
                        placeholder='Child Care'
                        id="childCare"
                        value={childCare}
                        onChange={(e) => setChildCare(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <button type="button" className='font-extrabold border-2 p-3 rounded-lg' onClick={handleSubmit}>Submit</button>
                </div>


            </div>

        );
    }

};

export default BudgetSetup;
