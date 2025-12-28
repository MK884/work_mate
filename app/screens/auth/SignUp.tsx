import { AnimatedSheetHeader } from "@components/AnimatedSheetHeader";
import CustomBottomSheet from "@components/CustomBottomSheet";
import Screen from "@components/Screen";
import AppLogoIcon from "@components/icons/AppLogoIcon";
import EyeIcon from "@components/icons/EyeIcon";
import EyeOffIcon from "@components/icons/EyeOffIcon";
import MailIcon from "@components/icons/MailIcon";
import MailNotificationIcon from "@components/icons/MailNotificationIcon";
import ScanIcon from "@components/icons/ScanIcon";
import { AppTextInput } from "@components/ui/AppTextInput";
import { Button } from "@components/ui/Button";
import CheckBox from "@components/ui/CheckBox";
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { appStyles } from "@styles/appStyles";
import { paletts } from "@styles/paletts";
import { typography } from "@styles/typography";
import { AnimatedIn } from "@utils/animation";
import { goBack, navigate } from "@utils/navigation";
import { scale } from "@utils/scale";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSharedValue, withTiming } from "react-native-reanimated";

type PasswordField = "password" | "confirmPassword";
const OTP_LENGTH = 6;
const RESEND_SECONDS = 30;

const SignUp = () => {
  const [isAgree, setIsAgree] = React.useState(false);

  const [password, setPassowrd] = React.useState<Record<PasswordField, string>>(
    {
      password: "",
      confirmPassword: "",
    },
  );
  const [isPasswordSecure, setIsPassowrdSecure] = React.useState<
    Record<PasswordField, boolean>
  >({
    password: true,
    confirmPassword: true,
  });

  const headerVisibility = useSharedValue(0);
  const inputRefs = React.useRef<Array<any>>([]);
  const [otp, setOtp] = React.useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [resendTimer, setResendTimer] = React.useState(RESEND_SECONDS);
  const [canResend, setCanResend] = React.useState(false);

  const sheetRef = React.useRef<BottomSheet[]>([]);

  const setRef = (index: number) => (ref: BottomSheet | null) => {
    if (ref) sheetRef.current[index] = ref;
  };

  const closeAllSheet = () => sheetRef?.current?.forEach(ref => ref?.close());

  const openSheet = (index: number) => {
    sheetRef.current.forEach((ref, i) => {
      if (i !== index) ref?.close();
    });
    sheetRef?.current?.[index]?.expand();
  };

  const togglePassword = (key: PasswordField) => {
    setIsPassowrdSecure(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleAgree = () => setIsAgree(prev => !prev);

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

      navigate("MainTab", { screen: "Home" });

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
    <Screen>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollView}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        >
          {/* heading */}
          <View style={[appStyles.center, { gap: scale(4) }]}>
            <AnimatedIn delay={400} style={{ marginBottom: scale(14) }}>
              <AppLogoIcon size={scale(90)} />
            </AnimatedIn>
            <Text style={[typography.h2, { fontWeight: "bold" }]}>
              Work Mate
            </Text>
            <Text style={[typography.l1, { color: paletts.GRAY400 }]}>
              Register Using Your Credentials
            </Text>
          </View>

          {/* inputs */}
          <View style={{}}>
            <AppTextInput
              label="Email"
              isRequired
              placeholder="Enter Your Email"
              keyboardType="email-address"
              startElement={<MailIcon />}
            />
            <AppTextInput
              label="Phone Number"
              isRequired
              placeholder="00000 00000"
              keyboardType="numeric"
              startElement={<Text>+91</Text>}
            />
            <AppTextInput
              label="Company ID"
              isRequired
              placeholder="Enter Company ID"
              startElement={<MailIcon />}
            />

            <AppTextInput
              placeholder="My Password"
              label="Password"
              isRequired
              startElement={<ScanIcon />}
              secureTextEntry={isPasswordSecure.password}
              endElement={
                <TouchableOpacity onPress={() => togglePassword("password")}>
                  {isPasswordSecure.password ? <EyeIcon /> : <EyeOffIcon />}
                </TouchableOpacity>
              }
              value={password.password}
              onChangeText={text =>
                setPassowrd(prev => ({ ...prev, password: text }))
              }
            />

            <AppTextInput
              placeholder="Confirm My Password"
              label="Confirm Password"
              isRequired
              startElement={<ScanIcon />}
              secureTextEntry={isPasswordSecure.confirmPassword}
              endElement={
                <TouchableOpacity
                  onPress={() => togglePassword("confirmPassword")}
                >
                  {isPasswordSecure.confirmPassword ? (
                    <EyeIcon />
                  ) : (
                    <EyeOffIcon />
                  )}
                </TouchableOpacity>
              }
              value={password.confirmPassword}
              onChangeText={text =>
                setPassowrd(prev => ({ ...prev, confirmPassword: text }))
              }
            />
          </View>

          {/* term and policy */}
          <View style={[appStyles.flexRow, { marginTop: -40 }]}>
            <View style={[styles.flexRow]}>
              <CheckBox check={isAgree} onPress={() => toggleAgree()} />
              <Text style={[typography.l2]}>I agree with</Text>
            </View>
            <TouchableOpacity onPress={() => openSheet(0)}>
              <Text style={[typography.l2, { color: paletts.PURPLE600 }]}>
                terms & conditions
              </Text>
            </TouchableOpacity>
            <Text style={[typography.b3]}>and</Text>
            <TouchableOpacity onPress={() => {}}>
              <Text style={[typography.l2, { color: paletts.PURPLE600 }]}>
                privacy policy
              </Text>
            </TouchableOpacity>
          </View>

          {/* submit btn */}
          <Button
            title="Sign Up"
            containerStyle={{ paddingVertical: scale(14) }}
            disabled={!isAgree}
            textStyle={{ fontWeight: "bold" }}
            onPress={() => openSheet(1)}
          />

          <View style={[styles.flexRow, { justifyContent: "center" }]}>
            <Text style={[typography.l1, { fontWeight: "bold" }]}>
              Already have an account?
            </Text>
            <TouchableOpacity onPress={() => goBack()}>
              <Text
                style={[
                  typography.l1,
                  { color: paletts.PURPLE600, fontWeight: "bold" },
                ]}
              >
                Sign in here
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Term Sheet */}
      <CustomBottomSheet ref={setRef(0)} snapPoints={["80%"]}>
        <BottomSheetView style={{ height: "100%", padding: scale(24) }}>
          {/* heading */}
          <View style={[appStyles.center]}>
            <Text
              style={[
                typography.p1,
                { maxWidth: "70%", fontWeight: "bold", textAlign: "center" },
              ]}
            >
              Terms & Conditions and Privacy Policy
            </Text>
          </View>

          <BottomSheetScrollView style={{ marginVertical: scale(16) }}>
            <View style={{ gap: scale(8) }}>
              <Text>
                Acceptance: By using the Re-Dus app, you agree to comply with
                all applicable terms and conditions.
              </Text>
              <Text>
                Acceptance: By using the Re-Dus app, you agree to comply with
                all applicable terms and conditions.
              </Text>
              <Text>
                Acceptance: By using the Re-Dus app, you agree to comply with
                all applicable terms and conditions.
              </Text>
              <Text>
                Acceptance: By using the Re-Dus app, you agree to comply with
                all applicable terms and conditions.
              </Text>
              <Text>
                Acceptance: By using the Re-Dus app, you agree to comply with
                all applicable terms and conditions.
              </Text>
              <Text>
                Acceptance: By using the Re-Dus app, you agree to comply with
                all applicable terms and conditions.
              </Text>
              <Text>
                Acceptance: By using the Re-Dus app, you agree to comply with
                all applicable terms and conditions.
              </Text>
              <Text>
                Acceptance: By using the Re-Dus app, you agree to comply with
                all applicable terms and conditions.
              </Text>
              <Text>
                Acceptance: By using the Re-Dus app, you agree to comply with
                all applicable terms and conditions.
              </Text>
              <Text>
                Acceptance: By using the Re-Dus app, you agree to comply with
                all applicable terms and conditions.
              </Text>
              <Text>
                Acceptance: By using the Re-Dus app, you agree to comply with
                all applicable terms and conditions.
              </Text>
              <Text>
                Acceptance: By using the Re-Dus app, you agree to comply with
                all applicable terms and conditions.
              </Text>
            </View>
          </BottomSheetScrollView>
          {/* actions */}
          <View style={{ gap: scale(10), paddingVertical: scale(12) }}>
            <Button
              containerStyle={{ paddingVertical: scale(14) }}
              title="I Agree"
              onPress={() => {
                setIsAgree(true);
                closeAllSheet();
              }}
            />
            <Button
              containerStyle={{ paddingVertical: scale(14) }}
              title="Decline"
              onPress={() => {
                setIsAgree(false);
                closeAllSheet();
              }}
              variant="primaryGhost"
            />
          </View>
        </BottomSheetView>
      </CustomBottomSheet>

      {/* otp Sheet */}
      <CustomBottomSheet
        ref={setRef(1)}
        snapPoints={["50%"]}
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
          <AnimatedSheetHeader headerVisibility={headerVisibility} Icon={<MailNotificationIcon />} />
        )}
      >
        <BottomSheetView>
          <View style={{ gap: scale(24), padding: scale(32) }}>
            {/* heading */}
            <View style={[appStyles.center]}>
              <Text style={[typography.h3]}>Email Verification Sent!</Text>
            </View>
            <View style={[appStyles.center]}>
              <Text style={[typography.l1]}>
                A verification code will be sent to the email{" "}
                <Text style={{ fontWeight: "bold" }}>Hello@work.com</Text>, for
                your account verification process.
              </Text>
            </View>

            {/* inputs */}
            <View
              style={[
                appStyles.flexRow,
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

            <View style={[appStyles.center]}>
              <Text style={[typography.l1]}>
                Haven't received the code?{" "}
                <TouchableOpacity>
                  <View style={[appStyles.center]}>
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
          </View>
        </BottomSheetView>
      </CustomBottomSheet>
    </Screen>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  scrollView: {
    paddingHorizontal: scale(24),
    paddingVertical: scale(20),
    gap: scale(32),
    flex: 1,
    paddingBottom: scale(100),
  },
  flexRow: {
    gap: scale(6),
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
  },
});
