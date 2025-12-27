import TodayTask from "@assets/images/TodayTask.svg";
import WorkingPeriod from "@assets/images/WorkingPeriod.svg";
import CustomBottomSheet from "@components/CustomBottomSheet";
import PhoneCallIcon from "@components/icons/PhoneCallIcon";
import ShieldLockIcon from "@components/icons/ShieldLockIcon";
import Screen from "@components/Screen";
import { AppTextInput } from "@components/ui/AppTextInput";
import { Button } from "@components/ui/Button";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import ForgotPassword from "@screens/auth/ForgotPassword";
import SignIn from "@screens/auth/SignIn";
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

const OTP_LENGTH = 6;
const RESEND_SECONDS = 30;

const FinalScreen = () => {
  const [otp, setOtp] = React.useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [resendTimer, setResendTimer] = React.useState(RESEND_SECONDS);
  const [canResend, setCanResend] = React.useState(false);

  const sheetRef = React.useRef<BottomSheet[]>([]);
  const headerVisibility = useSharedValue(0);
  const inputRefs = React.useRef<Array<any>>([]);

  const setRef = (index: number) => (ref: BottomSheet | null) => {
    if (ref) sheetRef.current[index] = ref;
  };

  const closeAllSheet = () => sheetRef?.current?.forEach(ref => ref?.close());

  const closeSheet = (index: number) => sheetRef?.current?.[index]?.close();

  const openSheet = (index: number) => {
    sheetRef.current.forEach((ref, i) => {
      if (i !== index) ref?.close();
    });
    sheetRef?.current?.[index]?.expand();

    if (index === 1) {
      startResendTimer();
    }
  };

  const handleSheetChanges = React.useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const navigateToSignIn = () => {
    openSheet(0);
  };

  const navigateToSignUp = () => navigate("SignUp");

  const focusInput = (index: number) => {
    inputRefs.current[index]?.focus();
  };

  const handleOTPChange = (value: string, index: number) => {
    if (!value) return;

    // Handle paste (full OTP)
    if (value.length > 1) {
      const pasted = value.replace(/\D/g, "").slice(0, OTP_LENGTH);
      if (pasted.length === OTP_LENGTH) {
        setOtp(pasted.split(""));
        inputRefs.current[OTP_LENGTH - 1]?.blur();
        submitOtp(pasted);
      }
      return;
    }

    // Single digit
    if (!/^\d$/.test(value)) return;

    const nextOtp = [...otp];
    nextOtp[index] = value;
    setOtp(nextOtp);

    if (index < OTP_LENGTH - 1) {
      focusInput(index + 1);
    }

    // Auto submit
    if (nextOtp.every(d => d !== "")) {
      submitOtp(nextOtp.join(""));
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace") {
      if (otp[index]) {
        const nextOtp = [...otp];
        nextOtp[index] = "";
        setOtp(nextOtp);
      } else if (index > 0) {
        focusInput(index - 1);
      }
    }
  };

  const submitOtp = async (finalOtp: string = otp.join("")) => {
    const code = finalOtp ?? otp.join("");
    if (code.length !== OTP_LENGTH) return;

    try {
      setIsSubmitting(true);
      console.log("Submitting OTP:", code);

      // 🔥 API call here
      // await verifyOtp(code)

      // success
    } catch (err) {
      console.error(err);
    } finally {
      setTimeout(() => {
        setIsSubmitting(false);
        closeAllSheet();
        setOtp(Array(OTP_LENGTH).fill(""));
      }, 500);
    }
  };

  const startResendTimer = () => {
    setCanResend(false);
    setResendTimer(RESEND_SECONDS);
  };

  const handleResendOtp = async () => {
    if (!canResend) return;

    try {
      console.log("Resending OTP...");

      // 🔥 call resend OTP API here

      // Reset OTP inputs
      setOtp(Array(OTP_LENGTH).fill(""));
      focusInput(0);

      // Restart timer
      startResendTimer();
    } catch (err) {
      console.error(err);
    }
  };

  const isOtpComplete = otp.every(d => d !== "");

  const AnimatedHeader = ({ headerVisibility, Icon }: any) => {
    const style = useAnimatedStyle(() => ({
      opacity: headerVisibility.value,
      transform: [
        { translateY: interpolate(headerVisibility.value, [0, 1], [-50, 0]) },
        { scale: interpolate(headerVisibility.value, [0, 1], [0.9, 1]) },
      ],
    }));

    return (
      <Animated.View style={[styles.sheetHeaderComp, style]}>
        {Icon ? (
          Icon
        ) : (
          <PhoneCallIcon color="white" height={scale(60)} width={scale(60)} />
        )}
      </Animated.View>
    );
  };

  React.useEffect(() => {
    if (resendTimer === 0) {
      setCanResend(true);
      return;
    }

    const timer = setInterval(() => {
      setResendTimer(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [resendTimer]);

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
        ref={setRef(0)}
        onChange={handleSheetChanges}
        snapPoints={["50%", "65%"]}
        handleIndicatorStyle={{ display: "none" }}
        // enableDynamicSizing={true}
      >
        <BottomSheetView style={{ padding: scale(28) }}>
          <SignIn openSheet={openSheet} />
        </BottomSheetView>
      </CustomBottomSheet>

      {/* otp Sheet */}
      <CustomBottomSheet
        ref={setRef(1)}
        snapPoints={["60%"]}
        handleIndicatorStyle={{ display: "none" }}
        enableDynamicSizing={true}
        onAnimate={(from, to) => {
          headerVisibility.value = withTiming(to >= 0 ? 1 : 0, {
            duration: 150,
          });

          if (to === 0) {
            startResendTimer();
            focusInput(0);
          }
        }}
        handleComponent={() => (
          <AnimatedHeader headerVisibility={headerVisibility} />
        )}
      >
        <BottomSheetView>
          <View style={{ gap: scale(24), padding: scale(32) }}>
            {/* heading */}
            <View style={[styles.center]}>
              <Text style={[typography.h3]}>Sign In Phone Number</Text>
            </View>
            <View style={[styles.center]}>
              <Text style={[typography.l1]}>
                Sign in code has been sent to{" "}
                <Text style={{ fontWeight: "bold" }}> +91 00000 00000</Text>,
                check your inbox to continue the sign in process.
              </Text>
            </View>

            {/* inputs */}
            <View
              style={[
                styles.flexRow,
                { gap: scale(6), alignItems: "flex-start" },
              ]}
            >
              {otp?.map((digit, index) => (
                <AppTextInput
                  key={index}
                  ref={ref => (inputRefs.current[index] = ref)}
                  mainContainerStyle={{ flex: 1, height: scale(50) }}
                  containerStyle={{ height: scale(50) }}
                  keyboardType="number-pad"
                  useBottomSheetInput
                  inputStyle={{ fontSize: scale(28), textAlign: "center" }}
                  placeholder="0"
                  maxLength={1}
                  value={digit}
                  onChangeText={val => handleOTPChange(val, index)}
                  onKeyPress={e => handleKeyPress(e, index)}
                  textContentType="oneTimeCode"
                  autoComplete="sms-otp"
                  autoFocus={index === 0}
                />
              ))}
            </View>

            <View style={[styles.center]}>
              <Text style={[typography.l1]}>
                Haven't received the code?{" "}
                <TouchableOpacity>
                  <View style={[styles.center]}>
                    {canResend ? (
                      <TouchableOpacity onPress={handleResendOtp}>
                        <Text
                          style={{
                            color: paletts.PURPLE600,
                            fontWeight: "bold",
                          }}
                        >
                          Resend OTP
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <Text style={typography.l1}>
                        Resend OTP in{" "}
                        <Text style={{ fontWeight: "bold" }}>
                          {resendTimer}s
                        </Text>
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>
              </Text>
            </View>

            <Button
              title="Submit"
              containerStyle={{ paddingVertical: scale(14) }}
              onPress={() => submitOtp()}
              loading={isSubmitting}
              disabled={!isOtpComplete}
            />

            {/* footer */}
            <View style={[styles.center]}>
              <Text style={[typography.l1]}>
                Sign in with different method{" "}
                <TouchableOpacity onPress={() => openSheet(0)}>
                  <Text style={[{ color: paletts.PURPLE600 }]}>Here.</Text>
                </TouchableOpacity>
              </Text>
            </View>
          </View>
        </BottomSheetView>
      </CustomBottomSheet>

      {/* forgot password sheet */}
      <CustomBottomSheet
        ref={setRef(2)}
        snapPoints={["50%"]}
        handleIndicatorStyle={{ display: "none" }}
        enableDynamicSizing={true}
        onAnimate={(from, to) => {
          headerVisibility.value = withTiming(to >= 0 ? 1 : 0, {
            duration: 150,
          });
        }}
        handleComponent={() => (
          <AnimatedHeader
            headerVisibility={headerVisibility}
            Icon={<ShieldLockIcon height={scale(50)} width={scale(50)} />}
          />
        )}
        enablePanDownToClose
      >
        <BottomSheetView>
          <ForgotPassword openSheet={openSheet} />
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
