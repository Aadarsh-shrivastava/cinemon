import {Theme, useTheme} from 'contexts/themeContext';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';

export type button = {
  label: string;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  onPress?: (() => void) | ((arg: any) => void);
  buttonStyle?: Object;
};

interface useButtonBarProps {
  buttons: button[];
  containerStyle?: Object;
  buttonsStyle?: Object;
  buttonSpacing?: number;
  paddingHorizontal?: number;
}
const useButtonBar = ({
  buttons,
  containerStyle,
  buttonSpacing = 10,
  paddingHorizontal = 20,
  buttonsStyle,
}: useButtonBarProps) => {
  const {width: screenWidth} = useWindowDimensions();
  const buttonWidth =
    (screenWidth -
      paddingHorizontal * 2 -
      buttonSpacing * (buttons.length - 1)) /
    buttons.length;
  const {theme} = useTheme();
  const ButtonBar = () => (
    <View
      style={[styles(theme).container, containerStyle, {paddingHorizontal}]}>
      {buttons.map((button, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles(theme).button,
            {width: buttonWidth},
            buttonsStyle,
            button.buttonStyle,
          ]}
          onPress={button.onPress}>
          <View style={styles(theme).contentContainer}>
            <View style={styles(theme).iconContainer}>
              {/* Left Icon */}
              {button.leftIcon ? (
                button.leftIcon
              ) : (
                <View style={styles(theme).iconPlaceholder} />
              )}
            </View>

            <Text style={styles(theme).buttonText}>{button.label}</Text>

            <View style={styles(theme).iconContainer}>
              {/* Right Icon */}
              {button.rightIcon ? (
                button.rightIcon
              ) : (
                <View style={styles(theme).iconPlaceholder} />
              )}
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  return {ButtonBar};
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    button: {
      padding: 10,
      backgroundColor: theme.colors.primary, // Dynamic color from theme
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      color: theme.colors.foreground,
      fontSize: 16,
    },
    contentContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    iconContainer: {
      // width: 24, // Fixed width for the icon
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 20,
    },
    iconPlaceholder: {
      // width: 24, // Same width as icon, for consistency
      // height: 24,
      marginRight: 20,
      opacity: 0, // Invisible but takes up space
    },
  });

export default useButtonBar;
