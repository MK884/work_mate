import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Pressable,
  Platform,
  Text,
  TouchableOpacity,
} from "react-native";
import { BlurView } from "@react-native-community/blur";
import { useNavigation } from "@react-navigation/native";
import { goBack } from "@utils/navigation";
import { scale } from "@utils/scale";
import { typography } from "@styles/typography";
import { AppTextInput } from "@components/ui/AppTextInput";
import MailIcon from "@components/icons/MailIcon";
import { paletts } from "@styles/paletts";
import ScanIcon from "@components/icons/ScanIcon";
import EyeIcon from "@components/icons/EyeIcon";
import EyeOffIcon from "@components/icons/EyeOffIcon";
import CheckBox from "@components/ui/CheckBox";
import { Button } from "@components/ui/Button";
import Divider from "@components/ui/Divider";
import PhoneCallIcon from "@components/icons/PhoneCallIcon";

const { height } = Dimensions.get("window");

const MODAL_HEIGHT = height * 0.8;

const SignIn = ({ openSheet }: { openSheet: (index: number) => void }) => {
  const [isPassowrdSecure, setIsPasswordSecure] = React.useState(false);
  const [isRememberMe, setIsRememberMe] = React.useState(false);
  const [isLoginWithPhone, setIsLoginWithPhone] = React.useState(false);

  const togglePassword = () => setIsPasswordSecure(prev => !prev);
  const toggleRememberMe = () => setIsRememberMe(prev => !prev);

  return (
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
          onPress={() => {
            if (isLoginWithPhone) openSheet(1);
          }}
        />

        <Divider label="OR" />
      </View>

      <Button
        title={`Sign in with ${isLoginWithPhone ? "Email" : "Phone"}`}
        variant="primaryGhost"
        onPress={() => {
          setIsLoginWithPhone(prev => !prev);
          openSheet(0);
        }}
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
            <Text style={[{ color: paletts.PURPLE600 }]}>Sign Up Here</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </View>
  );
};

export default SignIn;

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
