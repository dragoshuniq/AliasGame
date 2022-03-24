import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {CheckBox} from 'react-native-elements';
import {COLORS, SCREEN_SIZE, APP_STYLES} from 'theme/theme';
import Octicons from 'react-native-vector-icons/Octicons';
import Mu from 'react-native-vector-icons/MaterialIcons';

import * as Animatable from 'react-native-animatable';
import {SCREENS} from 'constants/screens/screen.names';
export default function ResultsScreen(props) {
  const {
    t,
    game,
    onChangeRoundWord,
    calculateTeamScore,
    navigation,
    changeLastWordTeamGuessed,
  } = props;
  const {roundWords} = game;
  const changeNextScreen = () => {
    calculateTeamScore();
    navigation.replace(SCREENS.SCORE_BOARD);
  };
  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        tou
        style={styles.itemContainer}
        onPress={() => onChangeRoundWord(item, index)}>
        <Text style={styles.itemText}>{item?.value}</Text>
        <CheckBox
          center
          disabled
          checkedIcon={
            <Octicons
              name="check-circle-fill"
              color={COLORS.SUCCESS}
              size={40}
            />
          }
          uncheckedIcon={
            <Octicons name="x-circle-fill" color={COLORS.DANGER} size={40} />
          }
          checked={item?.status}
        />
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={roundWords}
        renderItem={renderItem}
        keyExtractor={(_, index) => index}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            <Animatable.Text
              animation="pulse"
              iterationCount="infinite"
              iterationDelay={1000}
              style={[
                styles.headerText,
                {
                  marginBottom: 30,
                },
              ]}>
              {t('GAME.TEXT.VERIFY')}
            </Animatable.Text>
            <Text
              style={[
                styles.headerText,
                {
                  color: COLORS.PURPLE,
                },
              ]}>
              {t('GAME.TEXT.TOTAL')}:{' '}
              {roundWords.reduce((prev, next) => prev + Number(next.status), 0)}
            </Text>
          </View>
        }
        ListFooterComponent={
          <View>
            {game.isForBothTeams && roundWords[roundWords.length - 1]?.status && (
              <View style={styles.guessedContainer}>
                <Text
                  style={[
                    styles.itemText,
                    {color: COLORS.MAIN, textAlign: 'center', maxWidth: '100%'},
                  ]}>
                  {t('GAME.TEXT.WHO_LAST')}
                </Text>
                {game.teams.map((team, index) => {
                  return (
                    <Pressable
                      key={index}
                      style={APP_STYLES.ROW_SPACE}
                      onPress={() => changeLastWordTeamGuessed(team)}>
                      <Text style={styles.itemText}>{team}</Text>
                      <CheckBox
                        center
                        disabled
                        checkedIcon={
                          <Mu
                            name="radio-button-checked"
                            color={COLORS.PURPLE}
                            size={30}
                          />
                        }
                        uncheckedIcon={
                          <Mu
                            name="radio-button-unchecked"
                            color={COLORS.PURPLE}
                            size={30}
                          />
                        }
                        checked={
                          game.roundWords[roundWords.length - 1]
                            ?.teamGuessed === team
                        }
                      />
                    </Pressable>
                  );
                })}
              </View>
            )}
            <Pressable style={styles.buttonFooter} onPress={changeNextScreen}>
              <Animatable.Text
                animation="pulse"
                iterationCount="infinite"
                iterationDelay={1000}
                style={[styles.headerText, {color: 'white'}]}>
                {t('GAME.BUTTONS.NEXT')}
              </Animatable.Text>
            </Pressable>
          </View>
        }
        ListFooterComponentStyle={{flex: 1, justifyContent: 'flex-end'}}
        contentContainerStyle={{flexGrow: 1}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, marginVertical: 100, marginHorizontal: 30},
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  itemText: {
    fontWeight: 'bold',
    fontSize: 26,
    color: COLORS.PURPLE,
    maxWidth: SCREEN_SIZE.WIDTH * 0.5,
    ...APP_STYLES.SHADOW,
  },
  headerText: {
    color: COLORS.MAIN,
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
    ...APP_STYLES.SHADOW,
  },
  buttonFooter: {
    marginTop: 50,
    height: 70,
    borderRadius: 20,
    backgroundColor: COLORS.PURPLE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  guessedContainer: {
    marginTop: 20,
  },
});
