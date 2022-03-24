import React from 'react';
import {View, Text, FlatList, StyleSheet, Pressable} from 'react-native';
import {COLORS, APP_STYLES} from 'theme/theme';
import {SCREENS} from 'constants/screens/screen.names';
import * as Animatable from 'react-native-animatable';

export default function ScoreBoardScreen(props) {
  const {t, game, navigation, setter, changeGameSetup} = props;
  const {goalScore, teamsValues, isSyncRounds, addScore} = game;

  const checkWinner = () => {
    let winningTeams = [];
    Object.values(teamsValues).forEach(team => {
      if (team.score >= goalScore) {
        winningTeams.push(team);
      }
    });
    if (isSyncRounds) {
      const syncRounds = Object.values(teamsValues).every(team => {
        return winningTeams[0]?.round === team.round;
      });
      if (syncRounds) {
        if (winningTeams.length === 1) {
          onChangeWinners(winningTeams[0]);
        } else if (winningTeams.length > 1) {
          return changeGameSetup('goalScore', goalScore + addScore);
        }
      }
    } else if (!isSyncRounds && winningTeams.length > 0) {
      return onChangeWinners(winningTeams[0]);
    }
    onChangeTeam();
  };

  const onChangeWinners = team => {
    setter({winnerTeam: team});
    navigation.replace(SCREENS.WINNER);
  };

  const onChangeTeam = () => {
    navigation.replace(SCREENS.NEXT_TEAM);
  };

  const renderTeams = ({item}) => {
    return (
      <View style={styles.teamContainer}>
        <View style={styles.cellContainer}>
          <Text style={styles.text}>{item}</Text>
        </View>
        <View style={styles.cellContainer}>
          <Text style={styles.text}>{game?.teamsValues[item]?.score}</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Animatable.Text
        animation="tada"
        iterationCount="infinite"
        iterationDelay={1000}
        style={[
          styles.headerText,
          {
            marginVertical: 50,
          },
        ]}>
        {t('GAME.TEXT.SCOREBOARD')}
      </Animatable.Text>
      <Text style={[styles.headerText, {marginBottom: 20}]}>
        {t('GAME.TEXT.FIRST_REACH')} {game.goalScore} {t('GAME.TEXT.POINTS')}
      </Text>
      <FlatList
        data={game.teams}
        renderItem={renderTeams}
        ListHeaderComponent={
          <View>
            <View style={styles.teamContainer}>
              <View style={styles.cellContainer}>
                <Text style={styles.text}>{t('GAME.TEXT.TEAM')}</Text>
              </View>
              <View style={styles.cellContainer}>
                <Text style={styles.text}>{t('GAME.TEXT.SCORE')}</Text>
              </View>
            </View>
            <View style={styles.separator} />
          </View>
        }
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListFooterComponent={
          <Pressable style={styles.buttonFooter} onPress={checkWinner}>
            <Animatable.Text
              animation="pulse"
              iterationCount="infinite"
              iterationDelay={1000}
              style={[styles.headerText, {color: 'white'}]}>
              {t('GAME.BUTTONS.NEXT')}
            </Animatable.Text>
          </Pressable>
        }
        ListFooterComponentStyle={{flex: 1, justifyContent: 'flex-end'}}
        contentContainerStyle={{flexGrow: 1}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, marginHorizontal: '5%'},
  headerText: {
    color: COLORS.PURPLE,
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
    ...APP_STYLES.SHADOW,
  },
  teamContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  cellContainer: {
    flex: 1,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    color: COLORS.PURPLE,
    ...APP_STYLES.SHADOW,
  },
  separator: {
    borderBottomWidth: 2,
    borderColor: COLORS.PURPLE,
  },
  buttonFooter: {
    marginBottom: 50,
    height: 70,
    borderRadius: 20,
    backgroundColor: COLORS.PURPLE,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
