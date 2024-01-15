import React, { useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import { useColorMode } from '@chakra-ui/react';
import PostUser from '@/lib/database/apiFunctions/PostUser';
import CheckUser from '@/lib/database/apiFunctions/CheckUser';
import ToggleColorMode from '../components/Utility/ToggleColorMode/ToggleColorMode';
import GetUser from '@/lib/database/apiFunctions/GetUser';
// Redux Imports
import { setUserData } from '@/src/store/userSlice';
import { setLoadingScreen } from '@/src/store/loadingScreenSlice';
import { setPage } from '../store/pageSlice';
import { useDispatch } from 'react-redux';
//Redux Imports
import { useSelector } from 'react-redux';


const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const { user, error, isLoading } = useUser();

  // Color Mode Imports
  const { colorMode } = useColorMode(); // Get the current color mode from useColorMode
  const isDarkMode = colorMode === 'dark'; // Check if it's dark mode
  const customColorModeClass = isDarkMode ? 'dark' : 'light'; // Determine the appropriate class

  // Redux
  const page = useSelector((state: any) => state.page.page)


  // Handles login / logout functionality
  const handleLoginClick = () => {
    dispatch(setLoadingScreen(true))
    window.location.href = '/api/auth/login';
  }
  const handleLogoutClick = () => {
    dispatch(setLoadingScreen(true))
    window.location.href = '/api/auth/logout';
  }

  // We grab userData from the database by searching for it with the user from useUser
  const getUserData = async () => {
    dispatch(setLoadingScreen(true))
    if (user) {
      try {
        const data = await GetUser(user.email);
        dispatch(setUserData(data));
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
    dispatch(setLoadingScreen(false))
  };

  const loginUser = async () => {
    dispatch(setLoadingScreen(true))
    if (user) {
      const userExists = await CheckUser(user.email);
      if (userExists === 'userNotFound') { // If the user dosen't exists we create one
        await PostUser(user);
        const newUser = await GetUser(user.email)
        dispatch(setUserData(newUser));
      }
      if (userExists === 'userFound') { // If user does exists, we load data to userData
        getUserData();
      }
    }
    dispatch(setLoadingScreen(false))
  }

  const handleBudgetClick = () => {
    dispatch(setPage('budget'))
  }
  const handleOverviewClick = () => {
    dispatch(setPage('main'))
  }
  useEffect(() => {
    loginUser();
  }, [isLoading]);



  if (isLoading) {
    return <div></div>;
  }

  return (
    <nav className={`${customColorModeClass} p-2 h-12 flex`}>
      <ul className="flex list-none m-0 p-0 justify-between items-center">
        {user ? (
          <>
            <li className="pl-3">
              <button className={`${page === 'main' ? 'bg-blue-500 text-white' : ''} button border-2 rounded-md px-2 py-1 font-bold`} onClick={() => handleOverviewClick()}>
                Overview
              </button>
            </li>
            <li className='pl-3'>

              <button className={`${page === 'budget' ? 'bg-blue-500 text-white' : ''} button border-2 rounded-md px-2 py-1 font-bold`} onClick={() => handleBudgetClick()}>
                Budget
              </button>
            </li>
          </>
        ) : (
          <div className="flex items-center">
            <li className="ml-6">
              <button className="button border-2 rounded-md px-2 py-1 font-bold" onClick={handleLoginClick}>
                Login
              </button>
            </li>
          </div>
        )}
      </ul>
      <div className='ml-auto'>
        {user && (
          <div className="flex items-center">
            {user.picture && (
              <img
                src={user.picture}
                alt={user.name || 'User'}
                className="w-10 h-10 rounded-full mr-2"
              />
            )}
            <button className="button border-2 rounded-md px-2 py-1 font-bold" onClick={handleLogoutClick}>
              Logout
            </button>
          </div>
        )}
      </div>
      <div className='pl-3'>
        <ToggleColorMode />
      </div>
    </nav>
  );
}

export default Navbar;
