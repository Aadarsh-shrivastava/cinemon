import {Children, ReactNode, useCallback, useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Theme, useTheme} from '../contexts/themeContext';

interface UseModalReturn {
  isVisible: boolean;
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
  ModalComponentWrapper: () => JSX.Element | null;
}
export const useModal = (): UseModalReturn => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [content, setContent] = useState<ReactNode | null>();

  const openModal = useCallback((modalContent: ReactNode) => {
    setContent(modalContent);
    setIsVisible(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsVisible(false);
    setContent(null);
  }, []);

  const ModalComponentWrapper = () => {
    if (!isVisible) return null;

    return (
      <ModalComponent isVisible={isVisible} onClose={closeModal}>
        {content}
      </ModalComponent>
    );
  };
  return {isVisible, openModal, closeModal, ModalComponentWrapper};
};

interface ModalComponentProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const ModalComponent = ({
  isVisible,
  onClose,
  children,
}: ModalComponentProps) => {
  const {theme, toggleTheme} = useTheme();
  return (
    <Modal
      visible={isVisible}
      transparent
      onRequestClose={onClose}
      animationType="slide">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles(theme).modalOverlay}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles(theme).modalContent}>{children}</View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.8  )',
      width: '100%',
    },
    modalContent: {
      backgroundColor: theme.colors.background,
      padding: 20,
      margin: theme.spacing.xl,
      width: '90%',
      borderRadius: 10,
      borderColor: theme.colors.primary,
      borderWidth: 0.3,
    },
  });
