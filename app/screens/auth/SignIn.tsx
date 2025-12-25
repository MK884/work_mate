import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Pressable,
  Platform,
} from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { useNavigation } from '@react-navigation/native';
import { goBack } from '@utils/navigation';

const { height } = Dimensions.get('window');

const MODAL_HEIGHT = height * 0.8;

const SignIn = () => {

  return (
    <View style={styles.container}>
      {/* Blurred background */}
      <Pressable style={[StyleSheet.absoluteFill]} onPress={() => {
        console.log("click on back")
        goBack()
      }}>
        {Platform.OS === 'ios' ? (
          <BlurView
            style={StyleSheet.absoluteFill}
            blurType="chromeMaterialDark"
            blurAmount={12}
          />
        ) : (
          <View style={styles.androidOverlay} />
        )}
      </Pressable>

      {/* Modal Sheet */}
      <View style={styles.sheet}>
        {/* drag indicator */}
        <View style={styles.handle} />

        {/* your sign in content */}
      </View>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  sheet: {
    height: MODAL_HEIGHT,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
  },
  handle: {
    width: 40,
    height: 5,
    borderRadius: 10,
    backgroundColor: '#ccc',
    alignSelf: 'center',
    marginBottom: 12,
  },
  androidOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
});
