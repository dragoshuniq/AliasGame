import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import useTimeout from 'helpers/useTimeout';
import Modal from 'react-native-modal';
// import {Audio} from 'expo-av';
import Octicons from 'react-native-vector-icons/Octicons';
import {COLORS, SCREEN_SIZE, APP_STYLES} from 'theme/theme';
import {SCREENS} from 'constants/screens/screen.names';
import * as Animatable from 'react-native-animatable';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function GameScreen(props) {
  const {
    t,
    game,
    categoryData,
    unshiftData,
    addRoundWord,
    navigation,
    changeGameSetup,
    settings,
  } = props;
  const {teamsValues, teams, teamIndex, time} = game;
  const [isPaused, setIsPaused] = React.useState(false);
  const getCurrentTeam = () => {
    return teamsValues[teams[teamIndex]];
  };
  const {clearTimer, reset, timeLeft} = useTimeout(() => {
    if (!game.isStopTimer) navigation.replace(SCREENS.RESULTS_CHECK);
  }, time - Math.abs(time - getCurrentTeam().timeLeft));

  React.useEffect(() => {
    changeGameSetup('teamsValues', {
      ...game.teamsValues,
      [teams[teamIndex]]: {
        ...getCurrentTeam(),
        timeLeft: timeLeft,
      },
    });
  }, [timeLeft]);

  React.useEffect(() => {
    if (game.isToReplaceScreenGame) navigation.replace(SCREENS.RESULTS_CHECK);
  }, [game.isToReplaceScreenGame]);

  const onResponseWord = status => () => {
    addRoundWord({
      value: categoryData[0],
      status,
      teamGuessed: teams[teamIndex],
    });
    unshiftData();
    if (timeLeft < 1) {
      changeGameSetup('isToReplaceScreenGame', true);
    }
    // if (settings?.isSound) {
    //   playSound(status);
    // }
  };

  const onPressMenu = () => {
    setIsPaused(!isPaused);
    if (!isPaused) clearTimer();
    else reset();
  };

  // async function playSound(type) {
  //   try {
  //     const {sound} = await Audio.Sound.createAsync(
  //       type
  //         ? require('assets/sounds/success.wav')
  //         : require('assets/sounds/danger.wav'),
  //     );
  //     await sound.playAsync();
  //   } catch (error) {}
  // }

  return (
    <>
      <Modal
        onBackdropPress={onPressMenu}
        hasBackdrop
        isVisible={isPaused}
        style={styles.centerModal}>
        <View style={styles.modalView}>
          <Animatable.Image
            source={require('assets/logo.png')}
            style={styles.logoModal}
            animation="pulse"
            easing="ease-out"
            iterationCount="infinite"
          />
          <Pressable
            style={[styles.modalButton, {backgroundColor: COLORS.YELLY}]}
            onPress={onPressMenu}>
            <Text style={styles.modalButtonText}>
              {t('GAME.BUTTONS.CONTINUE')}
            </Text>
          </Pressable>
          <Pressable
            style={[styles.modalButton, {backgroundColor: COLORS.PURPLE}]}
            onPress={() => {
              setIsPaused(false);
              navigation.replace(SCREENS.MAIN_MENU);
            }}>
            <Text style={styles.modalButtonText}>
              {t('GAME.BUTTONS.MAIN_MENU')}
            </Text>
          </Pressable>
        </View>
      </Modal>
      <View style={styles.container}>
        <Pressable style={styles.menuButton} onPress={onPressMenu}>
          <AntDesign name="menu-unfold" size={30} color={COLORS.PURPLE} />
        </Pressable>
        <View>
          <Text style={styles.timerText}>{timeLeft}</Text>
        </View>
        <View
          style={{
            minHeight: 250,
          }}>
          <View
            style={[
              styles.wordContainer,
              {
                transform: [{rotateZ: '6deg'}],
                position: 'absolute',
                zIndex: 1,
              },
            ]}
          />
          <View
            style={[
              styles.wordContainer,
              {
                transform: [{rotateZ: '-8deg'}],
                position: 'absolute',
                zIndex: 2,
              },
            ]}
          />
          <View
            style={[
              styles.wordContainer,

              {
                position: 'absolute',
                zIndex: 100,
              },
            ]}>
            <Animatable.Text animation="fadeIn" style={styles.wordText}>
              {!isPaused && categoryData[0]}
            </Animatable.Text>
          </View>
        </View>

        <View style={styles.buttonsContainer}>
          <Pressable onPress={onResponseWord(false)}>
            <Octicons name="x-circle-fill" color={COLORS.DANGER} size={70} />
          </Pressable>
          <Pressable onPress={onResponseWord(true)}>
            <Octicons
              name="check-circle-fill"
              color={COLORS.SUCCESS}
              size={70}
            />
          </Pressable>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'space-evenly'},
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  timerText: {
    fontSize: 100,
    fontWeight: 'bold',
    color: COLORS.GRAY,
    textAlign: 'center',
  },
  wordContainer: {
    width: SCREEN_SIZE.WIDTH * 0.9,
    alignSelf: 'center',
    backgroundColor: 'white',
    padding: 20,
    minHeight: 250,
    borderRadius: 30,
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: COLORS.GRAY,
  },
  wordText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: COLORS.PURPLE,
    textAlign: 'center',
    ...APP_STYLES.SHADOW,
  },
  menuButton: {
    marginLeft: 30,
  },

  modalView: {
    width: SCREEN_SIZE.WIDTH,
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    paddingTop: 70,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalButton: {
    borderRadius: 20,
    paddingVertical: 15,
    elevation: 2,
    backgroundColor: COLORS.REDDY,
    width: SCREEN_SIZE.WIDTH * 0.7,
    marginVertical: 10,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: '500',
    textAlign: 'center',
    fontSize: 16,
  },
  centerModal: {
    justifyContent: 'center',
    margin: 0,
  },
  logoModal: {
    width: 150,
    height: 150,
    position: 'absolute',
    zIndex: 10,
    top: -60,
  },
});
