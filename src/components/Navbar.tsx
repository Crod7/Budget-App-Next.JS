import React, { useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import { useColorMode } from '@chakra-ui/react';
import PostUser from '@/lib/database/apiFunctions/PostUser';
import CheckUser from '@/lib/database/apiFunctions/CheckUser';
import ToggleColorMode from '../components/Utility/ToggleColorMode/ToggleColorMode';
import UserData from '@/src/types/UserData';
import GetUser from '@/lib/database/apiFunctions/GetUser';


interface NavbarProps {
  userData: UserData | null;
  setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
  setLoadingScreen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<NavbarProps> = ({ setUserData, setLoadingScreen }) => {

  const { user, error, isLoading } = useUser();

  const { colorMode } = useColorMode(); // Get the current color mode from useColorMode
  const isDarkMode = colorMode === 'dark'; // Check if it's dark mode
  const customColorModeClass = isDarkMode ? 'dark' : 'light'; // Determine the appropriate class

  // Handles login / logout functionality
  const handleLoginClick = () => {
    setLoadingScreen(true)
    window.location.href = '/api/auth/login';
  }
  const handleLogoutClick = () => {
    setLoadingScreen(true)
    window.location.href = '/api/auth/logout';
  }

  // We grab userData from the database by searching for it with the user from useUser
  const getUserData = async () => {
    if (user) {
      try {
        const data = await GetUser(user.email);
        setUserData(data)
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
  };

  const loginUser = async () => {
    if (user) {

      const userExists = await CheckUser(user.email);
      if (userExists === 'userNotFound') { // If the user dosen't exists we create one
        await PostUser(user);
        const newUser = await GetUser(user.email)
        setUserData(newUser)
      }
      if (userExists === 'userFound') { // If user does exists, we load data to userData
        getUserData();
      }

    }
  }

  useEffect(() => {
    loginUser();
  }, [isLoading]);



  if (isLoading) {
    return <div></div>;
  }

  return (
    <nav className={`${customColorModeClass} p-2 h-12 flex justify-between items-center`}>
      <ul className="flex list-none m-0 p-0">
        <li className="ml-6">
          <Link href="/">Home</Link>
        </li>
        {user ? (
          <>
            <li className="ml-6">
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li className="ml-6">
              <Link href="/profile">Profile</Link>
            </li>
          </>
        ) : (
          <div className="flex items-center">
            <li className="ml-6">
              <button className="border-2 rounded-md px-2 py-1 font-bold" onClick={handleLoginClick}>
                Login
              </button>
            </li>
          </div>
        )}
      </ul>
      {user && (
        <div className="flex items-center">
          {user.picture && (
            <img
              src={user.picture}
              alt={user.name || 'User'}
              className="w-10 h-10 rounded-full mr-2"
            />
          )}
          <button className="border-2 rounded-md px-2 py-1 font-bold" onClick={handleLogoutClick}>
            Logout
          </button>
        </div>
      )}
      <ToggleColorMode />
    </nav>
  );
}

export default Navbar;
