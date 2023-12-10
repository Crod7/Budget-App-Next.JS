import React, { useState } from 'react';
import { useColorMode } from '@chakra-ui/react'; // Import useColorMode
import { useUser } from '@auth0/nextjs-auth0/client';


const MyForm: React.FC = () => {

    const { user, error, isLoading } = useUser();

    const { colorMode } = useColorMode(); // Get the current color mode from useColorMode
    const isDarkMode = colorMode === 'dark'; // Check if it's dark mode

    // Use state to manage the input values
    const [income, setIncome] = useState('');
    const [rent, setRent] = useState('');
    const [utilities, setUtilities] = useState('');
    const [debt, setDebt] = useState('');
    const [car, setCar] = useState('');
    const [phone, setPhone] = useState('');
    const [internet, setInternet] = useState('');
    const [subscriptions, setSubscriptions] = useState('');
    const [insurance, setInsurance] = useState('');
    const [childCare, setChildCare] = useState('');


    // Handle input changes
    const handleIncomeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIncome(event.target.value);
    };

    const handleHousingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRent(event.target.value);
    };

    const handleUtilitiesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUtilities(event.target.value);
    };

    const handleDebtChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDebt(event.target.value);
    };

    const handleCarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCar(event.target.value);
    };

    const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(event.target.value);
    };

    const handleInternetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInternet(event.target.value);
    };
    const handleSubscriptionsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSubscriptions(event.target.value);
    };
    const handleInsuranceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInsurance(event.target.value);
    };
    const handleChildCareChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChildCare(event.target.value);
    };

    // Handle form submission
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Do something with the input values, e.g., submit to a server
    };


    if (user) {
        return (
            <div className={`${isDarkMode ? 'dark darkModeShadow' : 'light lightModeShadow'} my-16 py-4 px-12 rounded-lg min-w-[400px] max-w-[700px] mx-auto`} >
                <div className='text-2xl font-bold'>Welcome {user.name}!</div>
                <div className='text-lg font-bold'>Lets create your budget.</div>

                <form onSubmit={handleSubmit} >
                    <div className={`font-bold flex  my-8 ${isDarkMode ? 'dark darkModeShadow' : 'light lightModeShadow'} w-full rounded-lg`}>
                        <label htmlFor="income" className=' mx-4 my-auto text-center'>Income:</label>
                        <input
                            className={`${isDarkMode ? '' : 'bg-gray-200 '}w-full rounded-lg p-2 my-4 mx-8`}
                            type="text"
                            id="income"
                            value={income}
                            onChange={handleIncomeChange}
                            required
                        />
                    </div>

                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div >

        );
    }

};

export default MyForm;
