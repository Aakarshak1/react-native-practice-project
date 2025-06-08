import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { Track } from 'react-native-track-player';

const { width } = Dimensions.get('window');

interface ArtWorkProps {
  track?: Track | null;
}

const ArtWork = ({ track }: ArtWorkProps) => {
  return (
    <View style={styles.listArtWrapper}>
      <View style={styles.albumContainer}>
        {track?.artwork && (
          <Image
            style={styles.albumArtImg}
            source={{ uri: track?.artwork.toString() }}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listArtWrapper: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  albumContainer: {
    width: 300,
    height: 300,
  },
  albumArtImg: {
    height: '100%',
    borderRadius: 4,
  },
});

export default ArtWork;
