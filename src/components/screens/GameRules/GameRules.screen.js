import {Text, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import {COLORS, SCREEN_SIZE, APP_STYLES} from 'theme/theme';

export default function GameRules(props) {
  const {t} = props;
  return (
    <LinearGradient
      colors={['#0F2027', '#2C5364']}
      start={{x: 0, y: 1}}
      end={{x: 1, y: 0}}
      style={styles.container}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <Animatable.Image
          style={styles.gameLogo}
          source={require('assets/logo_invert.png')}
          animation="rotate"
          iterationCount="infinite"
          iterationDelay={1000}
        />
        <Text style={styles.title}>{t('GAME_RULES.TITLES.FIRST')}</Text>
        <Text style={styles.text}>{t('GAME_RULES.RULES.FIRST')}</Text>
        <Text style={styles.title}>{t('GAME_RULES.TITLES.SECOND')}</Text>
        <Text style={styles.text}>{t('GAME_RULES.RULES.SECOND')}</Text>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, paddingHorizontal: 20, paddingVertical: 30},
  gameLogo: {
    width: SCREEN_SIZE.WIDTH * 0.6,
    height: SCREEN_SIZE.WIDTH * 0.6,
    alignSelf: 'center',
    marginTop: 20,
  },
  title: {
    marginVertical: 10,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: COLORS.YELLY,
    ...APP_STYLES.SHADOW,
  },
  text: {
    fontSize: 16,
    textAlign: 'justify',
    fontWeight: '500',
    color: 'white',
    marginVertical: 15,
    ...APP_STYLES.SHADOW,
  },
});
