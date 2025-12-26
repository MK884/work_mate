import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { paletts } from '@styles/paletts';
import { scale } from '@utils/scale';
import React, { forwardRef, useState } from 'react';
import {
  TextInput,
  View,
  Text,
  TextInputProps,
  TouchableOpacity,
  TextStyle,
  ViewStyle,
} from 'react-native';

export interface InputProps extends TextInputProps {
  startElement?: React.ReactNode;
  endElement?: React.ReactNode;
  error?: string;
  hideErrorSpace?: boolean;
  disabled?: boolean;
  mainContainerStyle?: ViewStyle;
  inputStyle?: any;
  elementStyle?: any;
  label?: string;
  labelStyle?: TextStyle;
  isRequired?: boolean;
  onStartPress?: () => void;
  onEndPress?: () => void;
  useBottomSheetInput?: boolean;
  containerStyle?: ViewStyle;
}

export const AppTextInput = forwardRef<any, InputProps>(
  (
    {
      startElement,
      endElement,
      error,
      hideErrorSpace = false,
      disabled = false,
      containerStyle,
      mainContainerStyle,
      inputStyle,
      elementStyle,
      onStartPress,
      onEndPress,
      label,
      labelStyle,
      isRequired = false,
      useBottomSheetInput = false,
      ...rest
    },
    ref,
  ) => {
    const [focused, setFocused] = useState(false);

    const InputComponent= useBottomSheetInput ? BottomSheetTextInput : TextInput;

    return (
      <View style={[{ width: '100%', gap: scale(4) }, mainContainerStyle]}>
        {label && (
          <Text style={[{ color: paletts.GRAY600 }, labelStyle]}>
            {label}{' '}
            {isRequired && <Text style={{ color: paletts.RED600 }}>*</Text>}
          </Text>
        )}
        <View
          style={[
            {
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: disabled
                ? paletts.GRAY100
                : error
                ? '#ff4d4f'
                : focused
                ? paletts.PURPLE600
                : paletts.GRAY100,
              borderRadius: 8,
              paddingHorizontal: 10,
              backgroundColor: disabled ? paletts.GRAY50 : 'white',
              height: 46,
            },
            containerStyle
          ]}
        >
          {startElement && (
            <TouchableOpacity
              disabled={!onStartPress}
              onPress={onStartPress}
              style={[{ marginRight: 6 }, elementStyle]}
            >
              {startElement}
            </TouchableOpacity>
          )}

          <InputComponent
            ref={ref}
            editable={!disabled}
            style={[{ flex: 1, color: '#000' }, inputStyle]}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholderTextColor="#999"
            {...rest}
          />

          {endElement && (
            <TouchableOpacity
              disabled={!onEndPress}
              onPress={onEndPress}
              style={[{ marginLeft: 6 }, elementStyle]}
            >
              {endElement}
            </TouchableOpacity>
          )}
        </View>

        {!hideErrorSpace && (
          <Text
            style={{
              color: '#ff4d4f',
              fontSize: 12,
              marginTop: 4,
              opacity: error ? 1 : 0,
            }}
          >
            {error || 'placeholder'}
          </Text>
        )}
      </View>
    );
  },
);
