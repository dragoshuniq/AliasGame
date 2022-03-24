import React from 'react';
import {View, Text, StyleSheet, ScrollView, Pressable} from 'react-native';
import SwitchButton from 'utils/Buttons/SwitchButton';
import Slider from 'utils/Slider/Slider';
import * as Animatable from 'react-native-animatable';
import {SCREENS} from 'constants/screens/screen.names';
import {COLORS, SCREEN_SIZE, APP_STYLES} from 'theme/theme';
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function GameSetup(props) {
  const {t, game, changeGameSetup, navigation} = props;
  const {
    time,
    goalScore,
    addScore,
    isSkipPenalty,
    isForBothTeams,
    isStopTimer,
    isSyncRounds,
    isRandomStart,
  } = game;

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.sectionView}>
          <Text style={styles.setupText}>
            {t('GAME_SETUP.TEXT.TIME')}: {time} {t('GAME_SETUP.TEXT.SEC')}
          </Text>
          <Slider
            value={time}
            onValueChange={value => {
              changeGameSetup('time', value);
            }}
            maximumValue={150}
            minimumValue={30}
            step={10}
            allowTouchTrack
            style={styles.slider}
            trackStyle={styles.trackStyle}
            thumbStyle={styles.thumbStyle}
            maximumTrackTintColor={COLORS.PURPLE}
            minimumTrackTintColor={COLORS.PURPLE}
            thumbTintColor={'#fff'}
            thumbProps={{
              children: <MatIcon name="clock" size={40} color="white" />,
            }}
          />
        </View>
        <View style={styles.sectionView}>
          <Text style={styles.setupText}>
            {t('GAME_SETUP.TEXT.SCORE')}: {goalScore}
          </Text>
          <Slider
            value={goalScore}
            onValueChange={value => {
              changeGameSetup('goalScore', value);
            }}
            maximumValue={250}
            minimumValue={20}
            step={10}
            thumbProps={{
              children: <MatIcon name="note-edit" size={40} color="white" />,
            }}
          />
        </View>
        <View style={styles.sectionView}>
          <View style={APP_STYLES.ROW_SPACE}>
            <Text style={styles.setupText}>
              {t('GAME_SETUP.TEXT.SKIP_PENALTY')}
            </Text>
            <SwitchButton
              value={isSkipPenalty}
              onValueChange={value => changeGameSetup('isSkipPenalty', value)}
              trackColor={{false: COLORS.GRAY, true: COLORS.PURPLE}}
              thumbColor={'white'}
            />
          </View>

          <View style={APP_STYLES.ROW_SPACE}>
            <Text
              style={[
                styles.setupText,
                {textAlign: 'left', maxWidth: SCREEN_SIZE.WIDTH * 0.7},
              ]}>
              {t('GAME_SETUP.TEXT.STOP_LAST_WORD')}
            </Text>
            <SwitchButton
              value={isStopTimer}
              onValueChange={value => changeGameSetup('isStopTimer', value)}
            />
          </View>
          {isStopTimer && (
            <View style={APP_STYLES.ROW_SPACE}>
              <Text
                style={[
                  styles.setupText,
                  {textAlign: 'left', maxWidth: SCREEN_SIZE.WIDTH * 0.7},
                ]}>
                {t('GAME_SETUP.TEXT.LAST_WORD_BOTH')}
              </Text>
              <SwitchButton
                onValueChange={value =>
                  changeGameSetup('isForBothTeams', value)
                }
                value={isForBothTeams}
              />
            </View>
          )}
          <View style={APP_STYLES.ROW_SPACE}>
            <Text
              style={[
                styles.setupText,
                {textAlign: 'left', maxWidth: SCREEN_SIZE.WIDTH * 0.7},
              ]}>
              {t('GAME_SETUP.TEXT.RANDOM_START')}
            </Text>
            <SwitchButton
              value={isRandomStart}
              onValueChange={value => changeGameSetup('isRandomStart', value)}
            />
          </View>
          <View style={APP_STYLES.ROW_SPACE}>
            <Text
              style={[
                styles.setupText,
                {textAlign: 'left', maxWidth: SCREEN_SIZE.WIDTH * 0.7},
              ]}>
              {t('GAME_SETUP.TEXT.SYNC_TURNS')}
            </Text>
            <SwitchButton
              value={isSyncRounds}
              onValueChange={value => changeGameSetup('isSyncRounds', value)}
            />
          </View>
          {isSyncRounds && (
            <>
              <Text
                style={[
                  styles.setupText,
                  {textAlign: 'left', maxWidth: SCREEN_SIZE.WIDTH * 0.7},
                ]}>
                {t('GAME_SETUP.TEXT.ADD_POINTS')}: {addScore}
              </Text>
              <Slider
                value={addScore}
                onValueChange={score => {
                  changeGameSetup('addScore', score);
                }}
                maximumValue={100}
                minimumValue={10}
                step={10}
                thumbProps={{
                  children: (
                    <MatIcon name="note-edit" size={40} color="white" />
                  ),
                }}
              />
            </>
          )}
        </View>
        <Animatable.View animation="slideInUp" style={styles.buttonContainer}>
          <Pressable
            style={styles.buttonPressable}
            onPress={() => navigation.navigate(SCREENS.CATEGORIES_SETUP)}>
            <Text style={styles.buttonText}>
              {t('GAME_SETUP.BUTTONS.NEXT')}
            </Text>
          </Pressable>
        </Animatable.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, marginVertical: 30},
  setupText: {
    color: COLORS.PURPLE,
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 15,
  },
  sectionView: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 20,
    margin: 15,
    ...APP_STYLES.SHADOW,
  },
  buttonContainer: {
    borderRadius: 25,
    width: '80%',
    height: 60,
    backgroundColor: COLORS.YELLY,
    marginVertical: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    ...APP_STYLES.SHADOW,
  },
  buttonPressable: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 18,
    width: '100%',
  },
});
