import React, { useState, useEffect } from 'react';

import { ActivityIndicator } from 'react-native';

import { setupPlayer, addTrack } from './musicPlayerServices';
import MusicPlayer from './screens/MusicPlayer';

function App(): JSX.Element {
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  async function setup() {
    let isSetup = await setupPlayer();

    if (isSetup) {
      await addTrack();
    }

    setIsPlayerReady(isSetup);
  }

  useEffect(() => {
    setup();
  }, []);

  if (!isPlayerReady) return <ActivityIndicator />;

  return <MusicPlayer />;
}

export default App;
