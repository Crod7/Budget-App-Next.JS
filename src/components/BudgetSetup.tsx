import React, { useState } from 'react';
import { useColorMode } from '@chakra-ui/react'; // Import useColorMode
import { useUser } from '@auth0/nextjs-auth0/client';


const MyForm: React.FC = () => {

    const { user, error, isLoading } = useUser();

    const { colorMode } = useColorMode(); // Get the current color mode from useColorMode
    const isDarkMode = colorMode === 'dark'; // Check if it's dark mode
    console.log(user)

    // Use state to manage the input values
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    // Handle input changes
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    // Handle form submission
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Do something with the input values, e.g., submit to a server
        console.log('Name:', name);
        console.log('Email:', email);
    };


    if (user) {
        return (
            <div className={`${isDarkMode ? 'dark darkModeShadow' : 'light lightModeShadow'} m-16 py-4 px-12 rounded-lg`} >
                <div className='text-2xl font-bold'>Welcome {user.name}!</div>
                <div className='text-lg font-bold'>Lets create your budget.</div>

                <form onSubmit={handleSubmit} >
                    <div className={`font-bold flex  my-8 ${isDarkMode ? 'dark darkModeShadow' : 'light lightModeShadow'} w-full rounded-lg`}>
                        <label htmlFor="name" className='w-[15%]  my-auto text-center'>Name:</label>
                        <input
                            className='w-full rounded-lg py-6'
                            type="text"
                            id="name"
                            value={name}
                            onChange={handleNameChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={handleEmailChange}
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
