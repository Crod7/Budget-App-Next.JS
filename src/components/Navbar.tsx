import React from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';

function Navbar() {
  const { user, error, isLoading } = useUser();

  if (isLoading) {
    return <div></div>;
  }

  return (
    <nav className="bg-gradient-to-b from-blue-500 to-blue-900 text-white p-2 h-12 flex justify-between items-center">
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
              <Link href="/api/auth/login" className="text-white border border-white border-opacity-50 rounded-md px-2 py-1 font-bold hover:border-opacity-100 transition">
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
          <Link href="/api/auth/logout" className="text-white border border-white border-opacity-50 rounded-md px-2 py-1 font-bold hover:border-opacity-100 transition">
            Logout
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
