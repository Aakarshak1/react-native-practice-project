import React from 'react';
import { SafeAreaView, StatusBar, useColorScheme } from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';

import _ProjectOne from './Project_one';
import _ProjectTwo from './Project_two';
import _ProjectThree from './Project_three';
import _ProjectFour from './Project_four';

import ProjectFive from './Project_five';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ProjectFive />
    </SafeAreaView>
  );
}

export default App;
