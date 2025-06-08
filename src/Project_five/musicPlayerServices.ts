import TrackPlayer, { Event, RepeatMode } from 'react-native-track-player';
import { playListData } from './constants';

export async function setupPlayer() {
  let isPlayerReady = false;
  try {
    await TrackPlayer.getActiveTrackIndex();
    isPlayerReady = true;
  } catch (error) {
    await TrackPlayer.setupPlayer();
    isPlayerReady = true;
    console.log(error);
  }
  return isPlayerReady;
}

export async function addTrack() {
  await TrackPlayer.add(playListData);
  await TrackPlayer.setRepeatMode(RepeatMode.Queue);
}

export async function playbackService() {
  TrackPlayer.addEventListener(Event.RemotePause, () => {
    TrackPlayer.pause();
  });

  TrackPlayer.addEventListener(Event.RemotePlay, () => {
    TrackPlayer.play();
  });

  TrackPlayer.addEventListener(Event.RemoteNext, () => {
    TrackPlayer.skipToNext();
  });

  TrackPlayer.addEventListener(Event.RemotePrevious, () => {
    TrackPlayer.skipToPrevious();
  });
}
