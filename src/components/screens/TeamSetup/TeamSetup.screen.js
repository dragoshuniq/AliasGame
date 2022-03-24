import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {COLORS, SCREEN_SIZE, APP_STYLES} from 'theme/theme';
import * as Animatable from 'react-native-animatable';
import Modal from 'react-native-modal';
import {SCREENS} from 'constants/screens/screen.names';
import {getRandom} from 'helpers/random';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TEAMS} from 'constants/datasets/team.names';
export default function TeamSetup(props) {
  const {t, game, setter, addTeam, removeTeam, navigation} = props;
  const [isSetManually, setIsSetManually] = React.useState(false);
  const [customTeam, setCustomTeam] = React.useState('');
  const [editableIndex, setEditableIndex] = React.useState();
  const closeModal = () => {
    setIsSetManually(false);
    setCustomTeam('');
    setEditableIndex();
  };
  const openModal = () => {
    setIsSetManually(true);
  };
  const getRandomTeam = () => {
    const nameDifference = TEAMS.filter(team => !game.teams.includes(team));
    const randomTeamName = nameDifference[getRandom(nameDifference.length)];
    return randomTeamName;
  };
  const addRandomTeam = () => {
    addTeam(getRandomTeam());
  };

  const switchTeamValue = (index, value) => {
    let teams = [...game.teams];
    teams.splice(index, 1, value || getRandomTeam());
    setter({
      game: {...game, teams},
    });
  };
  const onConfirmModal = () => {
    if (editableIndex) {
      switchTeamValue(editableIndex, customTeam);
    } else {
      addTeam(customTeam);
    }
    closeModal();
  };

  const minTeams = () => {
    return game.teams.length < 2;
  };

  const maxTeams = () => {
    return game.teams.length > 5;
  };

  const renderTeam = ({item, index}) => {
    return (
      <View style={styles.teamElement}>
        <TouchableOpacity
          onPress={() => switchTeamValue(index)}
          onLongPress={() => {
            setCustomTeam(item);
            setEditableIndex(index);
            openModal();
          }}>
          <Text style={styles.teamText}> {item}</Text>
        </TouchableOpacity>

        <Pressable onPress={() => removeTeam(item)}>
          <Ionicons
            name="ios-remove-circle-sharp"
            size={26}
            color={COLORS.DANGER}
          />
        </Pressable>
      </View>
    );
  };

  return (
    <>
      <Modal
        onBackdropPress={closeModal}
        hasBackdrop
        isVisible={isSetManually}
        style={styles.centerModal}>
        <View style={styles.modalView}>
          <Animatable.Image
            source={require('assets/logo.png')}
            style={styles.logoModal}
            animation="pulse"
            easing="ease-out"
            iterationCount="infinite"
          />
          <TextInput
            onChangeText={setCustomTeam}
            value={customTeam}
            placeholder={t('TEAM_SETUP.TEXT.INPUT_PLACEHOLDER')}
            style={styles.modalInput}
          />
          <Pressable
            style={[styles.modalButton, {backgroundColor: COLORS.REDDY}]}
            onPress={onConfirmModal}
            disabled={customTeam.length < 1}>
            <Text style={styles.modalButtonText}>
              {t('TEAM_SETUP.BUTTONS.CONFIRM')}
            </Text>
          </Pressable>
        </View>
      </Modal>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <FlatList
            data={game.teams || []}
            renderItem={renderTeam}
            keyExtractor={(_, index) => index}
            showsVerticalScrollIndicator={false}
          />
        </View>

        <View style={styles.bottomContainer}>
          <View style={{marginVertical: 10}}>
            <Text style={[styles.teamText, styles.infoText]}>
              {t('TEAM_SETUP.TEXT.SINGLE_PRESS')}
            </Text>
            <Text style={[styles.teamText, styles.infoText]}>
              {t('TEAM_SETUP.TEXT.LONG_PRESS')}
            </Text>
          </View>
          <View style={styles.rowButtonsContainer}>
            <Animatable.View
              animation="slideInLeft"
              style={[
                styles.buttonContainer,
                {
                  backgroundColor: COLORS.REDDY,
                  ...(maxTeams() && {opacity: 0.5}),
                },
              ]}>
              <Pressable
                onPress={addRandomTeam}
                disabled={maxTeams()}
                style={styles.buttonPressable}>
                <Text style={styles.buttonText}>
                  {t('TEAM_SETUP.BUTTONS.SET_RANDOM')}
                </Text>
              </Pressable>
            </Animatable.View>
            <Animatable.View
              animation="slideInRight"
              style={[
                styles.buttonContainer,
                {
                  backgroundColor: COLORS.PURPLE,
                  ...(maxTeams() && {opacity: 0.5}),
                },
              ]}>
              <Pressable
                onPress={openModal}
                disabled={maxTeams()}
                style={styles.buttonPressable}>
                <Text style={styles.buttonText}>
                  {t('TEAM_SETUP.BUTTONS.SET_MANUALLY')}
                </Text>
              </Pressable>
            </Animatable.View>
          </View>
          <Animatable.View
            animation="slideInUp"
            style={[
              styles.buttonContainer,
              {width: '80%', ...(minTeams() && {opacity: 0.5})},
            ]}>
            <Pressable
              disabled={minTeams()}
              style={styles.buttonPressable}
              onPress={() => navigation.navigate(SCREENS.GAME_SETUP)}>
              <Text style={styles.buttonText}>
                {t('TEAM_SETUP.BUTTONS.NEXT')}
              </Text>
            </Pressable>
          </Animatable.View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: SCREEN_SIZE.WIDTH * 0.05,
  },
  topContainer: {
    flex: 1,
  },
  bottomContainer: {flex: 1, justifyContent: 'flex-start'},
  rowButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonContainer: {
    borderRadius: 25,
    width: '45%',
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
    padding: 10,
    elevation: 2,
    backgroundColor: COLORS.REDDY,
    width: SCREEN_SIZE.WIDTH * 0.7,
    marginVertical: 5,
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
  teamElement: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
    height: 30,
  },
  teamText: {
    color: COLORS.PURPLE,
    fontWeight: 'bold',
    fontSize: 20,
  },
  modalInput: {
    marginVertical: 10,
    borderColor: COLORS.GRAY,
    borderRadius: 20,
    borderWidth: 2,
    width: SCREEN_SIZE.WIDTH * 0.7,
    padding: 10,
    color: COLORS.PURPLE,
    fontWeight: '500',
  },
  logoModal: {
    width: 150,
    height: 150,
    position: 'absolute',
    zIndex: 10,
    top: -60,
  },
  infoText: {
    fontSize: 14,
    marginVertical: 5,
    textAlign: 'center',
  },
});
