import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Slider} from 'react-native-elements';
import {COLORS, SCREEN_SIZE} from 'theme/theme';

export default function SliderElement(props) {
  return (
    <Slider
      {...props}
      allowTouchTrack
      style={styles.slider}
      trackStyle={styles.trackStyle}
      thumbStyle={styles.thumbStyle}
      maximumTrackTintColor={COLORS.PURPLE}
      minimumTrackTintColor={COLORS.PURPLE}
      thumbTintColor={'#fff'}
    />
  );
}
const styles = StyleSheet.create({
  trackStyle: {
    height: 10,
    backgroundColor: 'transparent',
    borderRadius: 10,
  },
  thumbStyle: {
    height: 50,
    width: 50,
    backgroundColor: COLORS.PURPLE,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 150,
  },
  slider: {
    width: SCREEN_SIZE.WIDTH * 0.7,
    alignSelf: 'center',
    marginVertical: 10,
  },
});
