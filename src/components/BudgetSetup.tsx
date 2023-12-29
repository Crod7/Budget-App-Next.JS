import React, { useState } from 'react';
import { useColorMode } from '@chakra-ui/react'; // Import useColorMode
import UpdatedUser from '@/lib/database/apiFunctions/UpdateUser';
//Redux Imports
import { setUserData } from '@/src/store/userSlice';
import { setLoadingScreen } from '@/src/store/loadingScreenSlice';
import { useDispatch, useSelector } from 'react-redux';


const BudgetSetup: React.FC = () => {
    // Redux
    const dispatch = useDispatch();
    const userData = useSelector((state: any) => state.user.userData);

    // Color Mode
    const { colorMode } = useColorMode(); // Get the current color mode from useColorMode
    const isDarkMode = colorMode === 'dark'; // Check if it's dark mode

    // Use state to manage the input values
    const [income, setIncome] = useState<number>(0);
    const [housing, setHousing] = useState<number>(0);
    const [utilities, setUtilities] = useState<number>(0);
    const [debt, setDebt] = useState<number>(0);
    const [car, setCar] = useState<number>(0);
    const [phone, setPhone] = useState<number>(0);
    const [internet, setInternet] = useState<number>(0);
    const [subscriptions, setSubscriptions] = useState<number>(0);
    const [insurance, setInsurance] = useState<number>(0);
    const [childCare, setChildCare] = useState<number>(0);



    // Handle input changes
    const handleIncomeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIncome(parseFloat(event.target.value) || 0);
    };

    const handleHousingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHousing(parseFloat(event.target.value) || 0);
    };

    const handleUtilitiesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUtilities(parseFloat(event.target.value) || 0);
    };

    const handleDebtChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDebt(parseFloat(event.target.value) || 0);
    };

    const handleCarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCar(parseFloat(event.target.value) || 0);
    };

    const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(parseFloat(event.target.value) || 0);
    };

    const handleInternetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInternet(parseFloat(event.target.value) || 0);
    };
    const handleSubscriptionsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSubscriptions(parseFloat(event.target.value) || 0);
    };
    const handleInsuranceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInsurance(parseFloat(event.target.value) || 0);
    };
    const handleChildCareChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChildCare(parseFloat(event.target.value) || 0);
    };

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
        } catch (error) {
            console.error("UpdateUser Failed: oh no.... our table.... it's broken.", error)
        }
        dispatch(setLoadingScreen(false))
    };


    if (userData) {
        return (
            <div className={`${isDarkMode ? 'dark darkModeShadow' : 'light lightModeShadow'} my-16 py-4 px-12 rounded-lg min-w-[800px] max-w-[80vw] mx-auto`} >
                <div className='text-2xl font-bold'>Welcome {userData.name}!</div>
                <div className='text-lg font-bold'>Lets create your budget.</div>

                <div className={`font-bold flex  my-8 ${isDarkMode ? 'dark darkModeShadow' : 'light lightModeShadow'} w-full rounded-lg`}>
                    <label htmlFor="income" className=' mx-4 my-auto text-center'>Income:</label>
                    <input
                        className={`${isDarkMode ? '' : 'bg-gray-200 '}w-full rounded-lg p-2 my-4 mx-8`}
                        type="number"
                        id="income"
                        value={income}
                        onChange={handleIncomeChange}
                        required
                    />
                </div>
                <div className={`font-bold flex  my-8 ${isDarkMode ? 'dark darkModeShadow' : 'light lightModeShadow'} w-full rounded-lg`}>
                    <label htmlFor="housing" className=' mx-4 my-auto text-center'>Rent/ Mortgage:</label>
                    <input
                        className={`${isDarkMode ? '' : 'bg-gray-200 '}w-full rounded-lg p-2 my-4 mx-8`}
                        type="number"
                        id="housing"
                        value={housing}
                        onChange={handleHousingChange}
                        required
                    />
                </div>
                <div className={`font-bold flex  my-8 ${isDarkMode ? 'dark darkModeShadow' : 'light lightModeShadow'} w-full rounded-lg`}>
                    <label htmlFor="utilities" className=' mx-4 my-auto text-center'>Utilities:</label>
                    <input
                        className={`${isDarkMode ? '' : 'bg-gray-200 '}w-full rounded-lg p-2 my-4 mx-8`}
                        type="number"
                        id="utilities"
                        value={utilities}
                        onChange={handleUtilitiesChange}
                        required
                    />
                </div>
                <div className={`font-bold flex  my-8 ${isDarkMode ? 'dark darkModeShadow' : 'light lightModeShadow'} w-full rounded-lg`}>
                    <label htmlFor="debt" className=' mx-4 my-auto text-center'>Debt:</label>
                    <input
                        className={`${isDarkMode ? '' : 'bg-gray-200 '}w-full rounded-lg p-2 my-4 mx-8`}
                        type="number"
                        id="debt"
                        value={debt}
                        onChange={handleDebtChange}
                        required
                    />
                </div>
                <div className={`font-bold flex  my-8 ${isDarkMode ? 'dark darkModeShadow' : 'light lightModeShadow'} w-full rounded-lg`}>
                    <label htmlFor="car" className=' mx-4 my-auto text-center'>Car:</label>
                    <input
                        className={`${isDarkMode ? '' : 'bg-gray-200 '}w-full rounded-lg p-2 my-4 mx-8`}
                        type="number"
                        id="car"
                        value={car}
                        onChange={handleCarChange}
                        required
                    />
                </div>
                <div className={`font-bold flex  my-8 ${isDarkMode ? 'dark darkModeShadow' : 'light lightModeShadow'} w-full rounded-lg`}>
                    <label htmlFor="phone" className=' mx-4 my-auto text-center'>Phone:</label>
                    <input
                        className={`${isDarkMode ? '' : 'bg-gray-200 '}w-full rounded-lg p-2 my-4 mx-8`}
                        type="number"
                        id="phone"
                        value={phone}
                        onChange={handlePhoneChange}
                        required
                    />
                </div>
                <div className={`font-bold flex  my-8 ${isDarkMode ? 'dark darkModeShadow' : 'light lightModeShadow'} w-full rounded-lg`}>
                    <label htmlFor="internet" className=' mx-4 my-auto text-center'>Internet:</label>
                    <input
                        className={`${isDarkMode ? '' : 'bg-gray-200 '}w-full rounded-lg p-2 my-4 mx-8`}
                        type="number"
                        id="internet"
                        value={internet}
                        onChange={handleInternetChange}
                        required
                    />
                </div>
                <div className={`font-bold flex  my-8 ${isDarkMode ? 'dark darkModeShadow' : 'light lightModeShadow'} w-full rounded-lg`}>
                    <label htmlFor="subscriptions" className=' mx-4 my-auto text-center'>Subscriptions:</label>
                    <input
                        className={`${isDarkMode ? '' : 'bg-gray-200 '}w-full rounded-lg p-2 my-4 mx-8`}
                        type="number"
                        id="subscriptions"
                        value={subscriptions}
                        onChange={handleSubscriptionsChange}
                        required
                    />
                </div>
                <div className={`font-bold flex  my-8 ${isDarkMode ? 'dark darkModeShadow' : 'light lightModeShadow'} w-full rounded-lg`}>
                    <label htmlFor="insurance" className=' mx-4 my-auto text-center'>Insurance:</label>
                    <input
                        className={`${isDarkMode ? '' : 'bg-gray-200 '}w-full rounded-lg p-2 my-4 mx-8`}
                        type="number"
                        id="insurance"
                        value={insurance}
                        onChange={handleInsuranceChange}
                        required
                    />
                </div>
                <div className={`font-bold flex  my-8 ${isDarkMode ? 'dark darkModeShadow' : 'light lightModeShadow'} w-full rounded-lg`}>
                    <label htmlFor="childCare" className=' mx-4 my-auto text-center'>Child Care:</label>
                    <input
                        className={`${isDarkMode ? '' : 'bg-gray-200 '}w-full rounded-lg p-2 my-4 mx-8`}
                        type="number"
                        id="childCare"
                        value={childCare}
                        onChange={handleChildCareChange}
                        required
                    />
                </div>
                <div>
                    <button type="button" onClick={handleSubmit}>Submit</button>
                </div>


            </div >

        );
    }

};

export default BudgetSetup;
