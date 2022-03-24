import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {COLORS, SCREEN_SIZE, APP_STYLES} from 'theme/theme';
import {SCREENS} from 'constants/screens/screen.names';

export default function WinnerScreen(props) {
  const {t, resetGame, winnerTeam, navigation} = props;

  React.useEffect(() => {
    resetGame();
  }, []);

  return (
    <View style={styles.container}>
      <Animatable.Image
        source={require('assets/winning.png')}
        style={styles.winnerImage}
        animation="pulse"
        easing="ease-out"
        iterationCount="infinite"
      />
      <Animatable.Text
        style={styles.winnerText}
        animation="bounce"
        easing="ease-out-quad"
        iterationCount="infinite">
        {winnerTeam.title}
      </Animatable.Text>
      <Animatable.View
        animation="rubberBand"
        easing="ease-out"
        duration={5000}
        iterationCount="infinite">
        <Pressable
          style={styles.mainMenuButton}
          onPress={() => {
            navigation.replace(SCREENS.MAIN_MENU);
          }}>
          <Text style={styles.mainMenuText}>{t('GAME.BUTTONS.MAIN_MENU')}</Text>
        </Pressable>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  winnerText: {
    color: COLORS.PURPLE,
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    ...APP_STYLES.SHADOW,
  },
  winnerImage: {
    width: 250,
    height: 250,
    alignSelf: 'center',
  },
  mainMenuButton: {
    width: SCREEN_SIZE.WIDTH * 0.8,
    backgroundColor: COLORS.PURPLE,
    alignSelf: 'center',
    paddingVertical: 20,
    borderRadius: 20,
    ...APP_STYLES.SHADOW,
  },
  mainMenuText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 26,
    fontWeight: 'bold',
  },
});
