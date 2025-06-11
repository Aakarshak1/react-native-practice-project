import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Snackbar from 'react-native-snackbar';
import { FAB } from '@rneui/themed';

import { useAppwriteContext } from '../appwrite/AppwriteContext';

type UserObj = {
  name: string;
  email: string;
};

const Home = () => {
  const [userData, setUserData] = useState<UserObj | null>(null);
  const { appwrite, setIsLoggedIn } = useAppwriteContext();

  const handleLogout = async () => {
    try {
      const res = await appwrite.logout();
      if (res) {
        setIsLoggedIn(false);
        Snackbar.show({
          text: 'Logout Successful',
          duration: Snackbar.LENGTH_SHORT,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    async function getCurrentUser() {
      try {
        const res = await appwrite.getCurrentUser();
        if (res) {
          setUserData({
            name: res.name,
            email: res.email,
          });
        }
      } catch (error) {
        console.error(error);
      }
    }

    if (!userData) getCurrentUser();
  }, [appwrite]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.welcomeContainer}>
        {userData && (
          <View style={styles.userContainer}>
            <Text style={styles.userDetails}>{userData.name}</Text>
            <Text style={styles.userDetails}>{userData.email}</Text>
          </View>
        )}
      </View>
      <FAB
        placement="right"
        color="#F02E65"
        size="large"
        title="logout"
        icon={{ name: 'logout', color: '#FFFFFF' }}
        onPress={handleLogout}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0D32',
  },
  welcomeContainer: {
    padding: 12,

    flex: 1,
    alignItems: 'center',
  },
  message: {
    fontSize: 26,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  userContainer: {
    marginTop: 24,
  },
  userDetails: {
    fontSize: 20,
    color: '#FFFFFF',
  },
});

export default Home;
