import React, { useEffect, useState } from 'react';
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
  const userData = useSelector((state: any) => state.user.userData);




  // Handles login / logout functionality
  const handleLoginClick = () => {
    dispatch(setLoadingScreen(true))
    window.location.href = '/api/auth/login';
  }
  const handleLogoutClick = () => {
    dispatch(setLoadingScreen(true))
    window.location.href = '/api/auth/logout';
  }

  // Handles Test User login
  const handleTestUserClick = async () => {
    dispatch(setLoadingScreen(true))

    const userExists = await CheckUser('test@test.com');
    if (userExists === 'userNotFound') { // If the user dosen't exists we create one
      await PostUser({
        name: 'Test User',
        email: 'test@test.com',
      });
      const newUser = await GetUser('test@test.com')
      dispatch(setUserData(newUser));
    }
    if (userExists === 'userFound') { // If user does exists, we load data to userData
      try {
        const data = await GetUser('test@test.com');
        dispatch(setUserData(data));
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }

    dispatch(setLoadingScreen(false))


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
  const handleCategoryClick = () => {
    dispatch(setPage('category'))
  }
  useEffect(() => {
    loginUser();
  }, [isLoading]);



  if (isLoading) {
    return <div></div>;
  }

  return (
    <nav className={`${customColorModeClass} p-2 h-12 flex mt-3`}>
      <ul className="flex list-none m-0 p-0 justify-between items-center">
        {(userData) ? (
          <>
            <li className="pl-3">
              <button className={`${page === 'main' ? 'bg-blue-500 text-white' : ''} button border-2 rounded-md px-2 py-1 font-bold`} onClick={() => handleOverviewClick()}>
                Overview
              </button>
            </li>
            {(userData.budget) && (
              <li className='pl-3'>
                <button className={`${page === 'budget' ? 'bg-blue-500 text-white' : ''} button border-2 rounded-md px-2 py-1 font-bold`} onClick={() => handleBudgetClick()}>
                  Budget
                </button>
              </li>
            )}
            {(userData.budget) && (
              <li className='pl-3'>
                <button className={`${page === 'category' ? 'bg-blue-500 text-white' : ''} button border-2 rounded-md px-2 py-1 font-bold`} onClick={() => handleCategoryClick()}>
                  Category
                </button>
              </li>
            )}

          </>
        ) : (
          <div className="flex items-center">
            <li className="pl-3">
              <button className="button border-2 rounded-md sm:px-8 px-2 py-1 font-bold" onClick={handleLoginClick}>
                Login / Signup
              </button>
            </li>
            <li className="pl-3">
              <button className="button border-2 rounded-md sm:px-8 px-2 py-1 font-bold" onClick={handleTestUserClick}>
                Try w/o Logging in
              </button>
            </li>
          </div>

        )}
      </ul>
      <div className='ml-auto'>
        {(userData) && (
          <div className="flex items-center">
            {user && user.picture && (
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
