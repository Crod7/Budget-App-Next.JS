import React, { useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import { useColorMode } from '@chakra-ui/react';
import PostUser from '@/lib/database/apiFunctions/PostUser';
import CheckUser from '@/lib/database/apiFunctions/CheckUser';

function Navbar() {
  const { user, error, isLoading } = useUser();

  const { colorMode } = useColorMode(); // Get the current color mode from useColorMode
  const isDarkMode = colorMode === 'dark'; // Check if it's dark mode
  const customColorModeClass = isDarkMode ? 'dark' : 'light'; // Determine the appropriate class



  const addUser = async () => {
    if (user) {
      const userExists = await CheckUser(user.email);
      if (!userExists) { // If the user dosen't exists we create one
        PostUser(user);
      }
    }
  }

  useEffect(() => {
    addUser();
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
              <Link href="/api/auth/login" className="border-2 rounded-md px-2 py-1 font-bold ">
                Login
              </Link>
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
          <Link href="/api/auth/logout" className="border-2 rounded-md px-2 py-1 font-bold">
            Logout
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
