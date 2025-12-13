import Achievment from '@assets/images/Achievement.svg';
import TodayMeeting from '@assets/images/TodayMeeting.svg';
import TodayTask from '@assets/images/TodayTask.svg';
import WorkingLevel from '@assets/images/WorkingLevel.svg';
import WorkingPeriod from '@assets/images/WorkingPeriod.svg';
import Screen from '@components/Screen';
import { Button } from '@components/ui/Button';
import { paletts } from '@styles/paletts';
import { typography } from '@styles/typography';
import { scale } from '@utils/scale';
import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  createAnimatedComponent,
  FadeInLeft,
  FadeInRight,
  FadeInUp,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

type Props = {
  children: React.ReactNode;
  delay?: number;
  from?: 'up' | 'left' | 'right';
  style: StyleProp<ViewStyle>;
};

const AnimatedIn = ({ children, delay = 0, from = 'up', style }: Props) => {
  const entering =
    from === 'left'
      ? FadeInLeft.delay(delay).springify()
      : from === 'right'
      ? FadeInRight.delay(delay).springify()
      : FadeInUp.delay(delay).springify();

  return (
    <Animated.View entering={entering} style={style}>
      {children}
    </Animated.View>
  );
};

const Splash = () => {
  const [activeScreenIndex, setActiveScreenIndex] = React.useState(0);

  const handleScreenChange = (index: number) => {
    if (index < 3) setActiveScreenIndex(index);
    else setActiveScreenIndex(0);
  };

  const OnBoardScreen1 = () => {
    return (
      <>
        <AnimatedIn delay={100} style={styles.meetImage}>
          <TodayMeeting />
        </AnimatedIn>

        <AnimatedIn from="right" delay={200} style={styles.taskImage}>
          <TodayTask />
        </AnimatedIn>

        <AnimatedIn delay={300} style={styles.infoContainer}>
          <Text style={typography.h3}>Welcome to Workmate!</Text>
          <Text style={[typography.p2, { textAlign: 'center' }]}>
            Make Smart Decisions! Set clear timelines for projects and celebrate
            your achievements!
          </Text>
        </AnimatedIn>
      </>
    );
  };

  const OnBoardScreen2 = () => {
    return (
      <>
        <AnimatedIn delay={100} style={[styles.meetImage, { top: -40 }]}>
          <WorkingPeriod />
        </AnimatedIn>

        <AnimatedIn
          from="right"
          delay={200}
          style={[styles.taskImage, { marginRight: 20 }]}
        >
          <WorkingLevel />
        </AnimatedIn>

        <AnimatedIn delay={300} style={styles.infoContainer}>
          <Text style={typography.h3}>Manage Stress Effectively</Text>
          <Text style={[typography.p2, { textAlign: 'center' }]}>
            Stay Balanced! Track your workload and maintain a healthy stress
            level with ease.
          </Text>
        </AnimatedIn>
      </>
    );
  };

  const OnBoardScreen3 = () => {
    return (
      <>
        <AnimatedIn
          delay={100}
          style={[styles.meetImage, { top: '-20%', left: '15%' }]}
        >
          <Achievment />
        </AnimatedIn>

        <AnimatedIn
          from="right"
          delay={200}
          style={[styles.taskImage, { marginRight: 30, top: scale(280) }]}
        >
          <TodayTask />
        </AnimatedIn>

        <AnimatedIn delay={300} style={styles.infoContainer}>
          <Text style={typography.h3}>Plan for Success</Text>
          <Text style={[typography.p2, { textAlign: 'center' }]}>
            Your Journey Starts Here! Earn achievement badges as you conquer
            your tasks. Let’s get started!
          </Text>
        </AnimatedIn>
      </>
    );
  };

  const onBoardScreens = [
    <OnBoardScreen1 />,
    <OnBoardScreen2 />,
    <OnBoardScreen3 />,
  ];

  const AnimatedTouchableOpacity = createAnimatedComponent(TouchableOpacity);

  const Indicator = ({
    active,
    onPress,
  }: {
    active: boolean;
    onPress: () => void;
  }) => {
    const animatedStyle = useAnimatedStyle(() => ({
      width: withTiming(active ? 30 : 15, {
        duration: 300,
      }),
    }));

    return (
      <AnimatedTouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        style={[
          styles.item,
          animatedStyle,
          {
            backgroundColor: active ? paletts.PURPLE600 : paletts.PURPLE100,
          },
        ]}
      />
    );
  };

  return (
    <Screen edges={['bottom']}>
      <LinearGradient
        colors={[paletts.PURPLE600, 'white']}
        style={[StyleSheet.absoluteFill]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.6 }}
      />
      {onBoardScreens[activeScreenIndex]}

      <View style={[styles.flexRow]}>
        {[0, 1, 2].map(item => (
          <Indicator
            key={item}
            active={activeScreenIndex === item}
            onPress={() => handleScreenChange(item)}
          />
        ))}
      </View>

      <View
        style={{
          gap: scale(10),
          maxWidth: '85%',
          width: '100%',
          alignSelf: 'center',
          zIndex: 999,
        }}
      >
        <Button
          title="Next"
          containerStyle={{ width: '100%' }}
          size="lg"
          onPress={() => handleScreenChange(activeScreenIndex + 1)}
        />
        <Button
          title="Skip"
          variant="primaryGhost"
          size="lg"
          containerStyle={{ width: '100%' }}
        />
      </View>
    </Screen>
  );
};

export default Splash;

const styles = StyleSheet.create({
  meetImage: {
    position: 'absolute',
    left: 1 / 2,
    overflow: 'hidden',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  taskImage: {
    position: 'absolute',
    top: scale(250),
    right: scale(25),
    zIndex: 999,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  infoContainer: {
    marginTop: scale(550),
    alignItems: 'center',
    justifyContent: 'center',
    gap: scale(12),
    maxWidth: '85%',
    alignSelf: 'center',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: scale(2),
    paddingVertical: scale(30),
    zIndex: 9999,
  },
  item: {
    width: scale(30),
    height: scale(6),
    borderRadius: scale(8),
  },
});
