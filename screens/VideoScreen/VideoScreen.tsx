import {
  ActivityIndicator,
  Alert,
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {Theme, useTheme} from 'contexts/themeContext';
import {FlatList} from 'react-native-gesture-handler';
import useApi from 'hooks/useApi';
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';
import {MovieStackParamList} from 'navigation/MovieStackNavigator';
import YoutubePlayer from 'react-native-youtube-iframe';
import VideoPlayer from 'components/VideoPlayer';
import Icon from '../../Icon';

type VideoScreenProps = StackScreenProps<MovieStackParamList, 'VideoScreen'>;
const VideoScreen = ({route}: VideoScreenProps) => {
  const {tmdbId} = route.params;
  const {theme, toggleTheme} = useTheme();
  const {data: videos, isLoading} = useApi(
    `/3/movie/${tmdbId}/videos`,
    'GET',
    'videos',
  );

  const [playing, setPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const onStateChange = useCallback((state: string) => {
    if (state === 'ended') {
      setPlaying(false);
      //   Alert.alert('Video has finished playing!');
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying(prev => !prev);
  }, []);

  const selectVideo = useCallback((index: number) => {
    setCurrentIndex(index);
    setPlaying(true);
  }, []);

  const renderItem = ({item, index}) => (
    <TouchableOpacity
      style={styles(theme).videoItem}
      onPress={() => selectVideo(index)}>
      {index === currentIndex ? (
        <Icon name={'arrow-right'} type={'MaterialIcons'} size={30} />
      ) : null}
      <Image
        style={{borderRadius: 10}}
        source={{uri: `https://img.youtube.com/vi/${item.key}/hqdefault.jpg`}}
        height={100}
        width={150}
      />
      <Text
        style={{
          color: 'black',
          width: '60%',
          alignSelf: 'flex-start',
          padding: 10,
        }}
        numberOfLines={2}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
  if (isLoading) return <ActivityIndicator />;
  return (
    <View>
      {videos && (
        <>
          <YoutubePlayer
            webViewStyle={{
              elevation: 18,
              borderRadius: 15,
            }}
            height={240}
            play={playing}
            videoId={videos.results[currentIndex].key}
            // videoId={'p32aDrA3pjs'}
            onChangeState={onStateChange}
          />
          <FlatList data={videos.results} renderItem={renderItem} />
        </>
      )}
    </View>
  );
};

export default VideoScreen;

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 20,
    },
    flatList: {
      marginTop: 20,
      width: '100%',
    },
    contentContainer: {
      alignItems: 'center',
    },
    videoItem: {
      flexDirection: 'row',
      gap: theme.spacing.s,
      padding: 10,
      backgroundColor: '#f0f0f0',
      marginBottom: 10,
      borderRadius: 10,
      width: '95%',
      borderWidth: 1,
      borderColor: theme.colors.primary,
      alignItems: 'center',
      margin: 'auto',
      elevation: 12,
    },
    videoTitle: {
      color: '#333',
      fontSize: 16,
    },
  });
