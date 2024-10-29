import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import {WebView} from 'react-native-webview';

interface MoviePlayerProps {
  tmdbId: string;
}

const MoviePlayer = ({tmdbId}: MoviePlayerProps) => {
  const {width, height} = useWindowDimensions();
  const [loading, setLoading] = useState(true);

  return (
    <View style={styles.container}>
      {loading && (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      )}
      <WebView
        originWhitelist={['*']}
        source={{uri: `https://vidsrc.icu/embed/movie/${tmdbId}`}}
        style={{width, height: height * 0.5}} // Adjust height as needed
        onLoadEnd={() => setLoading(false)} // Set loading to false when content is loaded
        allowsInlineMediaPlayback // Allow inline media playback
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: -25}, {translateY: -25}],
  },
});

export default MoviePlayer;
