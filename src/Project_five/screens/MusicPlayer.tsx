import { View, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import TrackPlayer, {
  Event,
  Track,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import { FlatList } from 'react-native';
import { playListData } from '../constants';
import SongInfo from '../components/SongInfo';
import SongSlider from '../components/SongSlider';
import ControlCenter from '../components/ControlCenter';
import ArtWork from '../components/ArtWork';

const MusicPlayer = () => {
  const [track, setTrack] = useState<Track | null>();

  useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], async event => {
    switch (event.type) {
      case Event.PlaybackActiveTrackChanged:
        const playingTrack = await TrackPlayer.getTrack(event.index || 0);
        setTrack(playingTrack);
        break;
    }
  });

  useEffect(() => {
    async function getInitialTrack() {
      const playingTrack = await TrackPlayer.getTrack(0);
      setTrack(playingTrack);
    }

    if (!track) getInitialTrack();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={playListData}
        renderItem={() => <ArtWork track={track} />}
        keyExtractor={song => song.id.toString()}
      />

      <SongInfo track={track} />
      <SongSlider />
      <ControlCenter />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#001d23',
  },
});

export default MusicPlayer;
