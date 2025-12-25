import TodayTask from "@assets/images/TodayTask.svg";
import WorkingPeriod from "@assets/images/WorkingPeriod.svg";
import CustomBottomSheet from "@components/CustomBottomSheet";
import EyeIcon from "@components/icons/EyeIcon";
import EyeOffIcon from "@components/icons/EyeOffIcon";
import MailIcon from "@components/icons/MailIcon";
import PhoneCallIcon from "@components/icons/PhoneCallIcon";
import ScanIcon from "@components/icons/ScanIcon";
import Screen from "@components/Screen";
import { AppTextInput } from "@components/ui/AppTextInput";
import { Button } from "@components/ui/Button";
import CheckBox from "@components/ui/CheckBox";
import Divider from "@components/ui/Divider";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { paletts } from "@styles/paletts";
import { typography } from "@styles/typography";
import { AnimatedIn } from "@utils/animation";
import { navigate } from "@utils/navigation";
import { scale } from "@utils/scale";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const FinalScreen = () => {
  const [isPassowrdSecure, setIsPasswordSecure] = React.useState(false);
  const [isRememberMe, setIsRememberMe] = React.useState(false);
  const [isLoginWithPhone, setIsLoginWithPhone] = React.useState(false);

  const togglePassword = () => setIsPasswordSecure(prev => !prev);
  const toggleRememberMe = () => setIsRememberMe(prev => !prev);

  const sheetRef = React.useRef<BottomSheet>(null);
  const headerVisibility = useSharedValue(0);

  const handleSheetChanges = React.useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const navigateToSignIn = () => {
    sheetRef?.current?.expand();
  };

  const navigateToSignUp = () => navigate("SignUp");

  const AnimatedHeader = ({ headerVisibility }: any) => {
    const style = useAnimatedStyle(() => ({
      opacity: headerVisibility.value,
      transform: [
        { translateY: interpolate(headerVisibility.value, [0, 1], [-50, 0]) },
        { scale: interpolate(headerVisibility.value, [0, 1], [0.9, 1]) },
      ],
    }));

    return (
      <Animated.View style={[styles.sheetHeaderComp, style]}>
        <PhoneCallIcon color="white" height={scale(60)} width={scale(60)} />
      </Animated.View>
    );
  };

  return (
    <Screen edges={["bottom"]}>
      <LinearGradient
        colors={[paletts.PURPLE600, "white"]}
        style={[StyleSheet.absoluteFill]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.6 }}
      />

      <AnimatedIn delay={100} style={styles.meetImage}>
        <TodayTask />
      </AnimatedIn>

      <AnimatedIn from="right" delay={200} style={styles.taskImage}>
        <WorkingPeriod />
      </AnimatedIn>

      <AnimatedIn delay={300} style={styles.infoContainer}>
        <Text style={[typography.h3, { textAlign: "center" }]}>
          Navigate Your Work Journey Efficient & Easy
        </Text>
        <Text style={[typography.p2, { textAlign: "center" }]}>
          Increase your work management & careerdevelopment radically
        </Text>
      </AnimatedIn>

      <View
        style={{
          gap: scale(10),
          maxWidth: "85%",
          width: "100%",
          alignSelf: "center",
          // zIndex: 999,
          paddingVertical: scale(30),
        }}
      >
        <Button
          title="Sign in"
          containerStyle={{ width: "100%" }}
          size="lg"
          onPress={navigateToSignIn}
        />
        <Button
          title="Sign up"
          variant="primaryGhost"
          size="lg"
          containerStyle={{ width: "100%" }}
          onPress={navigateToSignUp}
        />
      </View>

      {/* Sign-In sheet */}
      <CustomBottomSheet
        enablePanDownToClose
        ref={sheetRef}
        onChange={handleSheetChanges}
        snapPoints={["50%", "65%"]}
        handleIndicatorStyle={{ display: "none" }}
        enableDynamicSizing={true}
        onAnimate={(from, to) => {
          headerVisibility.value = withTiming(to >= 0 ? 1 : 0, {
            duration: 150,
          });
        }}
        handleComponent={() => (
          <AnimatedHeader headerVisibility={headerVisibility} />
        )}
      >
        <BottomSheetView style={{ padding: scale(28) }}>
          <View style={{ gap: scale(22) }}>
            <View style={{ gap: scale(24) }}>
              {/* heading */}
              <View style={[styles.center]}>
                <Text style={[typography.h3]}>Sign In</Text>
                <Text style={[typography.l1]}>Sign in to my account</Text>
              </View>

              {/* inputs */}
              <View style={[{ gap: scale(12) }]}>
                {isLoginWithPhone ? (
                  <>
                    <AppTextInput
                      placeholder="00000 00000"
                      label="Phone number"
                      keyboardType="number-pad"
                      useBottomSheetInput
                      isRequired
                      startElement={<Text>+91</Text>}
                    />
                  </>
                ) : (
                  <>
                    <AppTextInput
                      placeholder="My Email or Employee ID"
                      label="Email"
                      isRequired
                      useBottomSheetInput
                      startElement={
                        <MailIcon
                          color={paletts.PURPLE600}
                          height={scale(20)}
                          width={scale(20)}
                        />
                      }
                    />

                    <AppTextInput
                      placeholder="My Password"
                      label="Password"
                      isRequired
                      useBottomSheetInput
                      startElement={<ScanIcon />}
                      secureTextEntry={isPassowrdSecure}
                      endElement={
                        <TouchableOpacity onPress={togglePassword}>
                          {isPassowrdSecure ? <EyeIcon /> : <EyeOffIcon />}
                        </TouchableOpacity>
                      }
                    />
                  </>
                )}

                <View style={[styles.flexRow]}>
                  <View
                    style={[
                      styles.flexRow,
                      { justifyContent: "flex-start", gap: scale(6) },
                    ]}
                  >
                    <CheckBox
                      check={isRememberMe}
                      onPress={() => toggleRememberMe()}
                    />
                    <Text style={[typography.b3]}>Remember Me</Text>
                  </View>
                  <TouchableOpacity>
                    <Text style={[typography.b3, { color: paletts.PURPLE600 }]}>
                      Forgot Password
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={{ gap: scale(32) }}>
              <Button
                title="Sign In"
                containerStyle={{ paddingVertical: scale(14) }}
              />

              <Divider label="OR" />
            </View>

            <Button
              title={`Sign in with ${isLoginWithPhone ? "Email" : "Phone"}`}
              variant="primaryGhost"
              onPress={() => setIsLoginWithPhone(prev => !prev)}
              startIcon={
                isLoginWithPhone ? (
                  <MailIcon
                    color={paletts.WHITE000}
                    fill={paletts.PURPLE600}
                    height={scale(24)}
                    width={scale(24)}
                  />
                ) : (
                  <PhoneCallIcon />
                )
              }
              textStyle={{ color: paletts.PURPLE600 }}
            />
            {/* footer */}
            <View style={[styles.center]}>
              <Text style={[typography.l1]}>
                Don’t have an account?{" "}
                <TouchableOpacity>
                  <Text style={[{ color: paletts.PURPLE600 }]}>
                    Sign Up Here
                  </Text>
                </TouchableOpacity>
              </Text>
            </View>
          </View>
        </BottomSheetView>
      </CustomBottomSheet>
    </Screen>
  );
};

export default FinalScreen;

const styles = StyleSheet.create({
  meetImage: {
    position: "absolute",
    left: "10%",
    overflow: "hidden",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    top: "-16%",
  },
  taskImage: {
    position: "absolute",
    top: scale(250),
    right: scale(25),
    // zIndex: 999,
    overflow: "hidden",
    justifyContent: "center",
  },
  infoContainer: {
    marginTop: scale(550),
    alignItems: "center",
    justifyContent: "center",
    gap: scale(12),
    maxWidth: "85%",
    alignSelf: "center",
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  flexRow: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  sheetHeaderComp: {
    height: 100,
    aspectRatio: 1,
    backgroundColor: paletts.PURPLE500,
    alignSelf: "center",
    marginTop: -50,
    borderRadius: scale(16),
    alignItems: "center",
    justifyContent: "center",
    shadowColor: paletts.PURPLE500,
    shadowOpacity: 0.4,
    shadowOffset: { height: 12, width: 0 },
    shadowRadius: 8,
  },
});
