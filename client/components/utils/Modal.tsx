import {
  Modal as RNModal,
  ModalProps,
  KeyboardAvoidingView,
  View,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

type PROPS = ModalProps & {
  isOpen: boolean;
  withInput?: boolean;
  onClose?: () => void;
};

const Modal = ({ isOpen, withInput, onClose, children, ...rest }: PROPS) => {
  const content = withInput ? (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className='items-center justify-center flex-1 p-3 bg-zinc-900/40'
    >
      {children}
    </KeyboardAvoidingView>
  ) : (
    <View className='items-center justify-center flex-1 p-3 bg-zinc-900/40'>
      {children}
    </View>
  );
  return (
    <RNModal
      visible={isOpen}
      transparent
      animationType='fade'
      statusBarTranslucent
      {...rest}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
          onClose && onClose();
        }}
      >
        {content}
      </TouchableWithoutFeedback>
    </RNModal>
  );
};

export default Modal;
