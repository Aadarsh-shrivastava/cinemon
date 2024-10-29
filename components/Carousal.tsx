import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Theme, useTheme} from 'contexts/themeContext';

interface CarousalProps<T> {
  renderChild: (item: T) => JSX.Element;
  data: T[];
  onEndReached?: () => {};
  isLoading?: boolean;
}
const Carousal = <T,>({
  renderChild,
  data,
  onEndReached,
  isLoading,
}: CarousalProps<T>) => {
  const {theme, toggleTheme} = useTheme();
  return (
    <View style={styles(theme).container}>
      <View style={styles(theme).carousal}>
        <FlatList
          contentContainerStyle={{gap: theme.spacing.m}}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={data}
          renderItem={({item}) => <>{renderChild(item)}</>}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={onEndReached}
          ListFooterComponent={() => (
            <View style={{flex: 1, height: 50}}>
              {isLoading && (
                <ActivityIndicator
                  color={theme.colors.primary}
                  style={{marginVertical: 60}}
                  size={40}
                />
              )}
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default Carousal;

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {},
    carousal: {flexDirection: 'row', padding: theme.spacing.sm},
  });
