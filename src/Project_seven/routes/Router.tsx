import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { useAppwriteContext } from '../appwrite/AppwriteContext';

import Loading from '../components/Loading';

import { AppStack } from './AppStack';
import { AuthStack } from './AuthStack';

const Router = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { appwrite, isLoggedIn, setIsLoggedIn } = useAppwriteContext();

  useEffect(() => {
    const checkIfUserIsLoggedIn = async () => {
      try {
        const user = await appwrite.getCurrentUser();
        if (user) setIsLoggedIn(true);
      } catch (error) {
        console.error(error);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };
    checkIfUserIsLoggedIn();
  }, [appwrite, setIsLoggedIn]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Router;
