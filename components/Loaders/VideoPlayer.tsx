import React from 'react';
import {StyleSheet, View} from 'react-native';
import {WebView} from 'react-native-webview';

const WebViewVideo = () => {
  const videoHtml = `
    <html>
      <body style="margin: 0; padding: 0;">
        <video width="100%" height="100%" controls>
          <source src="https://vidsrc.icu/embed/movie/945961" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={{html: videoHtml}}
        style={styles.webView}
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
  webView: {
    width: '100%',
    height: 300,
  },
});

export default WebViewVideo;
