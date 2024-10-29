import {Alert, Button, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {Theme, useTheme} from 'contexts/themeContext';
import YoutubePlayer from 'react-native-youtube-iframe';

interface VideoPlayerProps {}
const VideoPlayer = ({}: VideoPlayerProps) => {
  const {theme, toggleTheme} = useTheme();

  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state: string) => {
    if (state === 'ended') {
      setPlaying(false);
      Alert.alert('video has finished playing!');
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying(prev => !prev);
  }, []);

  return (
    <View style={styles(theme).container}>
      <YoutubePlayer
        height={300}
        play={playing}
        videoId={'l27q7VnWgis'}
        onChangeState={onStateChange}
        initialPlayerParams={{controls: false}}
      />
      {/* <Button title={playing ? 'pause' : 'play'} onPress={togglePlaying} /> */}
    </View>
  );
};

export default VideoPlayer;

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {},
  });
