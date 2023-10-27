import React, { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import LoadingScreen from '../components/Utility/Loading-Feature/LoadingScreen';
import ToggleColorMode from '../components/Utility/ToggleColorMode/ToggleColorMode'
import BudgetOverview from '../components/BudgetOverview/BudgetOverview';
import UserForm from '../components/UserForm/UserForm';
import clientPromise from '@/lib/database/mongodb';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'

type ConnectionStatus = {
  isConnected: boolean
}

export const getServerSideProps: GetServerSideProps<
  ConnectionStatus
> = async () => {
  try {
    await clientPromise
    return {
      props: { isConnected: true },
    }
  } catch (e) {
    console.error(e)
    return {
      props: { isConnected: false },
    }
  }
}


export default function BasePage({
  isConnected,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { user, error, isLoading } = useUser();



  if (isLoading) {
    return (
      <div>
        <LoadingScreen />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {
        isConnected ? (
          <h2 className="subtitle" > You are connected to MongoDB</h2>
        ) : (
          <h2 className="subtitle">
            You are NOT connected to MongoDB. Check the <code>README.md</code>{' '}
            for instructions.
          </h2>
        )
      }
      <div>
        <UserForm />
        <ToggleColorMode />
        <BudgetOverview />
      </div>
    </div>
  );
}
