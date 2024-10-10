import {StyleSheet, TextInput, View} from 'react-native';
import React, {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import {Theme, useTheme} from 'contexts/themeContext';
import Icon from '../../../Icon';

interface SearchBarProps {
  isReadOnly?: boolean;
  value?: string;
  onTextChange?: (q: string) => void;
}

export interface SearchBarHandle {
  focus: () => void;
}

const SearchBar = forwardRef<SearchBarHandle, SearchBarProps>(
  ({isReadOnly, value, onTextChange}, ref) => {
    const {theme} = useTheme();
    const [query, setQuery] = useState();
    const searchBarRef = useRef<TextInput>(null);

    useImperativeHandle(ref, () => ({
      focus: () => searchBarRef.current?.focus(),
    }));

    return (
      <View style={styles(theme).container}>
        <Icon
          style={styles(theme).leftIcon}
          name="search"
          type="MaterialIcons"
        />
        <TextInput
          ref={searchBarRef}
          placeholder="SEARCH"
          style={{flex: 1}}
          editable={!isReadOnly}
          value={value} // Use the parent's query as the value
          onChangeText={onTextChange} // Update the parent's state on text change
        />
      </View>
    );
  },
);

export default SearchBar;

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      borderWidth: 1,
      borderColor: theme.colors.inactive,
      height: theme.size.l * 2,
      margin: theme.spacing.m,
      borderRadius: theme.spacing.sm,
      flexDirection: 'row',
      alignItems: 'center',
    },
    leftIcon: {
      margin: theme.spacing.s,
    },
  });
