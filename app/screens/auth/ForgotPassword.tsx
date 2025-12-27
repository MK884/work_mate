import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { scale } from "@utils/scale";
import { typography } from "@styles/typography";
import { AppTextInput } from "@components/ui/AppTextInput";
import MailIcon from "@components/icons/MailIcon";
import { paletts } from "@styles/paletts";
import { Button } from "@components/ui/Button";
import ScanIcon from "@components/icons/ScanIcon";
import EyeIcon from "@components/icons/EyeIcon";
import EyeOffIcon from "@components/icons/EyeOffIcon";

const OTP_LENGHT = 6;
const OTP_RESEND_TIME = 30;

type PasswordField = "password" | "confirmPassword";

const ForgotPassword = ({
  openSheet,
}: {
  openSheet: (index: number) => void;
}) => {
  const [email, setEmail] = React.useState("");
  const [otpSend, setOTPSend] = React.useState(false);
  const [otp, setOTP] = React.useState(Array(OTP_LENGHT).fill(""));
  const [resendTimer, setResendTimer] = React.useState(OTP_RESEND_TIME);
  const [canResend, setCanResend] = React.useState(false);
  const [isOTPVerified, setIsOTPVerified] = React.useState(false);
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

  const [passwordCreated, setPasswordCreated] = React.useState(false);

  const togglePassword = (key: PasswordField) => {
    setIsPassowrdSecure(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const otpRefs = React.useRef<Array<TextInput>>([]);

  const focusedInput = (index: number) => {
    otpRefs?.current?.[index]?.focus();
  };

  const submitOTP = (otp: string) => {
    setIsOTPVerified(true);
    setOTP(Array(OTP_LENGHT).fill(""));
  };

  const handleOTPChange = (val: string, index: number) => {
    if (!val.trim()) return;

    if (val.length > 1) {
      const cleanVal = val.replace(/\D/g, "").slice(0, OTP_LENGHT);
      if (cleanVal.length === OTP_LENGHT) {
        setOTP(cleanVal.split(""));
        submitOTP(cleanVal);
      }
      return;
    }

    if (!/^\d$/.test(val)) return;

    const otps = [...otp];
    otps[index] = val;
    setOTP(otps);

    if (index < OTP_LENGHT - 1) {
      focusedInput(index + 1);
    }

    if (otps.every(d => d !== "")) {
      submitOTP(otps?.join(""));
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace") {
      if (otp[index]) {
        const nextOtp = [...otp];
        nextOtp[index] = "";
        setOTP(nextOtp);
      } else if (index > 0) {
        focusedInput(index - 1);
      }
    }
  };
  const startResendTimer = () => {
    setCanResend(false);
    setResendTimer(OTP_RESEND_TIME);
  };
  const handleResendOtp = async () => {
    if (!canResend) return;

    try {
      console.log("Resending OTP...");

      // 🔥 call resend OTP API here

      // Reset OTP inputs
      setOTP(Array(OTP_LENGHT).fill(""));
      focusedInput(0);

      // Restart timer
      startResendTimer();
    } catch (err) {
      console.error(err);
    }
  };

  const isOtpComplete = otp.every(d => d !== "");

  const handleSubmit = () => {
    if (passwordCreated) openSheet(0);
    else if (isOTPVerified) setPasswordCreated(true);
    else setOTPSend(true);
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

  const submitBtnTitle = passwordCreated
    ? "Sign In"
    : otpSend
    ? "Submit"
    : "Send Verification Code";
  const title = passwordCreated
    ? "Password Has Been Created"
    : isOTPVerified
    ? "Set a New Password"
    : "Forgot Passowrd";

  return (
    <View style={{ gap: scale(24), padding: scale(32) }}>
      {/* heading */}
      <View style={[styles.center]}>
        <Text style={[typography.h3]}>{title}</Text>
      </View>
      <View style={[styles.center]}>
        {passwordCreated ? (
          <Text style={[typography.l1]}>
            To log in to your account, click the Sign in button and enter your
            email along with your new password.
          </Text>
        ) : isOTPVerified ? (
          <Text style={[typography.l1]}>
            Please set a new password to secure your Work Mate account.
          </Text>
        ) : otpSend ? (
          <>
            <Text style={[typography.l1]}>
              A reset code has been sent to{" "}
              <Text style={{ fontWeight: "bold" }}>{email}</Text>, check your
              email to continue the password reset process.
            </Text>
          </>
        ) : (
          <Text style={[typography.l1]}>
            A verification code will be sent to your email to reset your
            password.
          </Text>
        )}
      </View>

      {/* inputs */}
      {passwordCreated ? (
        <></>
      ) : isOTPVerified ? (
        <>
          <AppTextInput
            placeholder="Your Password"
            label="Password"
            isRequired
            useBottomSheetInput
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
            placeholder="Re Enter Your Password"
            label="Confirm Password"
            isRequired
            useBottomSheetInput
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
        </>
      ) : otpSend ? (
        <>
          <View
            style={[
              styles.flexRow,
              { gap: scale(6), alignItems: "flex-start" },
            ]}
          >
            {otp?.map((digit, index) => (
              <AppTextInput
                key={index}
                ref={ref => (otpRefs.current[index] = ref)}
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
                      <Text style={{ fontWeight: "bold" }}>{resendTimer}s</Text>
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            </Text>
          </View>
        </>
      ) : (
        <AppTextInput
          autoFocus
          placeholder="My Email"
          label="Email"
          isRequired
          keyboardType="email-address"
          textContentType="emailAddress"
          autoComplete="email"
          useBottomSheetInput
          value={email}
          onChangeText={text => setEmail(text)}
          startElement={
            <MailIcon
              color={paletts.PURPLE600}
              height={scale(20)}
              width={scale(20)}
            />
          }
        />
      )}

      <Button
        title={submitBtnTitle}
        containerStyle={{ paddingVertical: scale(14) }}
        onPress={handleSubmit}
        // loading={isSubmitting}
        disabled={!email?.trim()?.length}
      />
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  flexRow: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
});
