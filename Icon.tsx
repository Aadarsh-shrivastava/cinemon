import React from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialComunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcon from 'react-native-vector-icons/FontAwesome';
import {useTheme} from './contexts/themeContext';

const IconMap = {
  EvilIcons: EvilIcon,
  MaterialIcons: MaterialIcon,
  MaterialCommunityIcons: MaterialComunityIcon,
};

interface IconProps {
  name: string;
  type: keyof typeof IconMap;
  size?: number;
  color?: string;
  onPress?: () => void;
  style?: Object;
}

const Icon: React.FC<IconProps> = ({
  name,
  type,
  size,
  color,
  onPress,
  style,
}) => {
  const {theme, toggleTheme} = useTheme();

  const defaultSize = size ?? theme.size.xl;
  const defaultColor = color ?? theme.colors.foreground;

  const IconComponent = IconMap[type];
  return (
    <IconComponent
      style={style}
      name={name}
      size={defaultSize}
      color={defaultColor}
      {...(onPress && {onPress})}
    />
  );
};

export default Icon;
