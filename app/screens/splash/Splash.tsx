import Screen from '@components/Screen';
import { paletts } from '@styles/paletts';
import { typography } from '@styles/typography';
import { scale } from '@utils/scale';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import TodayMeeting from '@assets/images/TodayMeeting.svg';
import TodayTask from '@assets/images/TodayTask.svg';
import WorkingPeriod from '@assets/images/WorkingPeriod.svg';
import WorkingLevel from '@assets/images/WorkingLevel.svg';
import Achievment from '@assets/images/Achievement.svg';
import { Button } from '@components/ui/Button';

const OnBoardScreen1 = () => {
  return (
    <>
      <View style={styles.meetImage}>
        <TodayMeeting />
      </View>

      <View style={styles.taskImage}>
        <TodayTask />
      </View>

      <View style={styles.infoContainer}>
        <Text style={typography.h3}>Welcome to Workmate!</Text>
        <Text style={[typography.p2, { textAlign: 'center' }]}>
          Make Smart Decisions! Set clear timelines for projects and celebrate
          your achievements!
        </Text>
      </View>
    </>
  );
};

const OnBoardScreen2 = () => {
  return (
    <>
      <View style={[styles.meetImage, { top: -40 }]}>
        <WorkingPeriod />
      </View>

      <View style={[styles.taskImage, { marginRight: 20 }]}>
        <WorkingLevel />
      </View>

      <View style={styles.infoContainer}>
        <Text style={typography.h3}>Manage Stress Effectively</Text>
        <Text style={[typography.p2, { textAlign: 'center' }]}>
          Stay Balanced! Track your workload and maintain a healthy stress level
          with ease.
        </Text>
      </View>
    </>
  );
};

const OnBoardScreen3 = () => {
  return (
    <>
      <View style={[styles.meetImage, { top: '-20%', left: '15%' }]}>
        <Achievment />
      </View>

      <View style={[styles.taskImage, { marginRight: 30, top: scale(280) }]}>
        <TodayTask />
      </View>

      <View style={styles.infoContainer}>
        <Text style={typography.h3}>Plan for Success</Text>
        <Text style={[typography.p2, { textAlign: 'center' }]}>
          Your Journey Starts Here! Earn achievement badges as you conquer your
          tasks. Let’s get started!
        </Text>
      </View>
    </>
  );
};

const onBoardScreens = [
  <OnBoardScreen1 />,
  <OnBoardScreen2 />,
  <OnBoardScreen3 />,
];

const Splash = () => {
  const [activeScreenIndex, setActiveScreenIndex] = React.useState(0);

  const handleScreenChange = (index: number) => {
    if (index < 3) setActiveScreenIndex(index);
    else setActiveScreenIndex(0);
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
          <TouchableOpacity
            key={item}
            style={[
              styles.item,
              {
                backgroundColor:
                  activeScreenIndex === item
                    ? paletts.PURPLE600
                    : paletts.PURPLE100,
              },
            ]}
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