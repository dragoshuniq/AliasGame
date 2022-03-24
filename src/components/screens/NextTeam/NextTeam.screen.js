import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {COLORS, SCREEN_SIZE, APP_STYLES} from 'theme/theme';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import {SCREENS} from 'constants/screens/screen.names';

export default function NextTeamScreen(props) {
  const {t, navigation, game} = props;
  return (
    <LinearGradient
      colors={['#d4d3dd', 'white']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.container}>
      <View style={styles.regularContainer}>
        <View style={styles.nextTeamContainer}>
          <Animatable.Text
            style={styles.nextTeamText}
            animation="swing"
            iterationCount="infinite"
            iterationDelay={1000}>
            {game.teams[game.teamIndex]}
          </Animatable.Text>
        </View>
      </View>

      <Animatable.View style={[styles.regularContainer, {marginBottom: 100}]}>
        <Pressable
          style={styles.buttonContainer}
          onPress={() => navigation.replace(SCREENS.GAME)}>
          <Text style={styles.buttonText}>{t('GAME.BUTTONS.START')}</Text>
        </Pressable>
      </Animatable.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  regularContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  nextTeamContainer: {
    width: SCREEN_SIZE.WIDTH,
    minHeight: 200,
    justifyContent: 'center',
  },
  nextTeamText: {
    fontSize: 60,
    color: COLORS.PURPLE,
    textAlign: 'center',
    fontWeight: 'bold',
    ...APP_STYLES.SHADOW,
  },

  buttonContainer: {
    backgroundColor: COLORS.YELLY,
    width: SCREEN_SIZE.WIDTH * 0.9,
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    ...APP_STYLES.SHADOW,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 30,
    ...APP_STYLES.SHADOW,
  },
  gameLogo: {
    width: SCREEN_SIZE.WIDTH * 0.6,
    height: SCREEN_SIZE.WIDTH * 0.6,
  },
});
