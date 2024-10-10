import React from 'react';
import {Image, Text, View} from 'react-native';

const VerticalMovieCardLoader = () => {
  return (
    <SkeletonPlaceholder>
      <>
        <View style={{width: 160, height: 200}}></View>
      </>
    </SkeletonPlaceholder>
  );
};

export default VerticalMovieCardLoader;
