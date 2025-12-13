import { paletts } from "@styles/paletts";
import React, { forwardRef, useState } from "react";
import { TextInput, View, Text, TextInputProps, TouchableOpacity } from "react-native";

export interface InputProps extends TextInputProps {
  startElement?: React.ReactNode;
  endElement?: React.ReactNode;
  error?: string;
  hideErrorSpace?: boolean;
  disabled?: boolean;
  containerStyle?: any;
  inputStyle?: any;
  elementStyle?: any;
  onStartPress?: () => void;
  onEndPress?: () => void;
}

export const AppTextInput = forwardRef<TextInput, InputProps>(
  (
    {
      startElement,
      endElement,
      error,
      hideErrorSpace = false,
      disabled = false,
      containerStyle,
      inputStyle,
      elementStyle,
      onStartPress,
      onEndPress,
      ...rest
    },
    ref
  ) => {
    const [focused, setFocused] = useState(false);

    return (
      <View style={[{ width: "100%" }, containerStyle]}>
        <View
          style={[
            {
              flexDirection: "row",
              alignItems: "center",
              borderWidth: 1,
              borderColor: disabled ? paletts.GRAY100 : error ? "#ff4d4f" : focused ? paletts.PURPLE600 :paletts.GRAY100,
              borderRadius: 8,
              paddingHorizontal: 10,
              backgroundColor: disabled ? paletts.GRAY50 : "white",
              height: 46,
            },
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

          <TextInput
            ref={ref}
            editable={!disabled}
            style={[{ flex: 1, color: "#000" }, inputStyle]}
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
              color: "#ff4d4f",
              fontSize: 12,
              marginTop: 4,
              opacity: error ? 1 : 0,
            }}
          >
            {error || "placeholder"}
          </Text>
        )}
      </View>
    );
  }
);