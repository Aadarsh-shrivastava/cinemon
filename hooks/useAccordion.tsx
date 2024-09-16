import {Animated, StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';

const useAccordion = (initialExpandStatus: boolean = false) => {
  const [isExpanded, setIsExpanded] = useState(initialExpandStatus);

  const animation = useRef(
    new Animated.Value(initialExpandStatus ? 1 : 0),
  ).current;

  const toggleExpand = () => {
    setIsExpanded(prev => !prev);
  };

  const expand = () => {
    setIsExpanded(true);
  };

  const collapse = () => {
    setIsExpanded(false);
  };

  return {
    isExpanded,
    toggleExpand,
    expand,
    collapse,
    animation,
  };
};

export default useAccordion;

const styles = StyleSheet.create({});
