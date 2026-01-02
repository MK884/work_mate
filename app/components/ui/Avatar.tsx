import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { scale } from "@utils/scale";
import { paletts } from "@styles/paletts";

export type AvatarItem = {
  id?: string;
  source?: ImageSourcePropType;
  alt: string;
};

type Props = {
  data: AvatarItem[]; // single or multiple avatars
  size?: number;
  max?: number; // default 3
};

export const AvatarCircle = ({
  source,
  alt,
  size,
}: {
  source?: ImageSourcePropType;
  alt: string;
  size: number;
}) => {
  const [error, setError] = React.useState(false);
  const showFallback = !source || error;

  return (
    <View
      style={[styles.container, { height: scale(size), width: scale(size) }]}
    >
      {showFallback ? (
        <Text style={styles.text}>{alt?.charAt(0).toUpperCase() || "W"}</Text>
      ) : (
        <Image
          source={source}
          style={styles.image}
          onError={() => setError(true)}
        />
      )}
    </View>
  );
};

const Avatar = ({ data, size = 44, max = 3 }: Props) => {
  if (!data.length) return null;

  // 🔹 SINGLE AVATAR
  if (data.length === 1) {
    return <AvatarCircle size={size} {...data[0]} />;
  }

  // 🔹 AVATAR GROUP
  const visible = data.slice(0, max);
  const remaining = data.length - max;

  return (
    <View style={styles.row}>
      {visible.map((item, index) => (
        <View
          key={item?.alt}
          style={{ marginLeft: index === 0 ? 0 : -scale(12) }}
        >
          <AvatarCircle size={size} {...item} />
        </View>
      ))}

      {remaining > 0 && (
        <View
          style={[
            styles.more,
            { height: scale(size), width: scale(size), marginLeft: -scale(8) },
          ]}
        >
          <Text style={styles.moreText}>+{remaining}</Text>
        </View>
      )}
    </View>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  container: {
    aspectRatio: 1,
    borderRadius: 9999,
    overflow: "hidden",
    backgroundColor: paletts.WHITE300,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: paletts.WHITE000,
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
  },
  text: {
    fontSize: scale(16),
    fontWeight: "600",
    color: paletts.BLACK000,
  },
  more: {
    borderRadius: 9999,
    // backgroundColor: paletts.GRAY200,
    alignItems: "center",
    justifyContent: "center",
    // borderWidth: 2,
    // borderColor: paletts.WHITE000,
  },
  moreText: {
    fontSize: scale(16),
    fontWeight: "600",
    color: paletts.BLACK000,
  },
});
