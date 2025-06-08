import { Pressable, StyleSheet, View } from 'react-native';
import React, { useCallback } from 'react';
import TrackPlayer, {
  PlaybackState,
  State,
  usePlaybackState,
} from 'react-native-track-player';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ControlCenter = () => {
  const playBackState = usePlaybackState();

  const skipToNext = useCallback(async () => {
    await TrackPlayer.skipToNext();
  }, []);

  const skipToPrevious = useCallback(async () => {
    await TrackPlayer.skipToPrevious();
  }, []);

  const togglePlayback = useCallback(async (playBack: State) => {
    const currentTrack = await TrackPlayer.getActiveTrack();
    if (currentTrack !== null) {
      if (playBack === State.Paused || playBack === State.Ready)
        await TrackPlayer.play();
      else await TrackPlayer.pause();
    }
  }, []);

  return (
    <View style={styles.container}>
      <Pressable onPress={skipToPrevious}>
        <Icon style={styles.icon} name="skip-previous" size={40} />
      </Pressable>
      <Pressable
        onPress={() => togglePlayback((playBackState as PlaybackState).state)}>
        <Icon
          style={styles.icon}
          name={
            (playBackState as PlaybackState).state === State.Playing
              ? 'pause'
              : 'play-arrow'
          }
          size={75}
        />
      </Pressable>
      <Pressable onPress={skipToNext}>
        <Icon style={styles.icon} name="skip-next" size={40} />
      </Pressable>
    </View>
  );
};

export default ControlCenter;

const styles = StyleSheet.create({
  container: {
    marginBottom: 56,

    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    color: '#FFFFFF',
  },
  playButton: {
    marginHorizontal: 24,
  },
});
