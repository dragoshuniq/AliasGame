// * Actions types
import * as TYPES from 'app-redux/actions/app/app.actions-types';
import i18next from 'instances/i18next/i18next.instance';
import LANGUAGES from 'constants/languages/languages';
import _ from 'lodash';
// * Default state
const defaultState = {
  settings: {isMusic: true, isSound: true, language: LANGUAGES.en},
  game: {
    teams: [],
    time: 60,
    goalScore: 50,
    addScore: 10,
    isSkipPenalty: false,
    isForBothTeams: false,
    isStopTimer: true,
    isSyncRounds: false,
    isRandomStart: true,
    isContinueGame: false,
    isToReplaceScreenGame: false,
    category: null,
    teamsValues: null,
    teamIndex: 0,
    roundWords: [],
  },
  categoryData: [],
  wordCount: 1,
  winnerTeam: '',
};

const {t} = i18next;

// * Reducer
export default function appReducer(state = {...defaultState}, action = {}) {
  switch (action.type) {
    case TYPES.SETTER: {
      return {...state, ...action.value};
    }
    case TYPES.RESET_GAME: {
      return {
        ...state,
        ...defaultState,
        settings: state.settings,
        winnerTeam: state.winnerTeam,
      };
    }
    case TYPES.ADD_TEAM: {
      return {
        ...state,
        game: {...state.game, teams: [...state.game.teams, action.value]},
      };
    }
    case TYPES.REMOVE_TEAM: {
      return {
        ...state,
        game: {
          ...state.game,
          teams: state.game.teams.filter(team => team !== action.value),
        },
      };
    }

    case TYPES.CHANGE_GAME_SETUP: {
      return {...state, game: {...state.game, [action.field]: action.value}};
    }
    case TYPES.SET_TEAMS: {
      let teamsValues = {};
      let teams = [...state.game.teams];
      if (state.game.isRandomStart) _.shuffle(teams);

      teams.forEach(team => {
        teamsValues[team] = {
          title: team,
          score: 0,
          round: 1,
          timeLeft: state.game.time,
        };
      });
      return {
        ...state,
        game: {...state.game, teamsValues, teams},
      };
    }

    case TYPES.LOAD_CATEGORY_DATA: {
      let data = _.shuffle(t(state.game.category.value, {returnObjects: true}));

      return {
        ...state,
        categoryData: data,
        wordCount: 1,
        game: {...state.game, isContinueGame: true},
      };
    }
    case TYPES.UNSHIFT_BACK_ARRAY: {
      let data = [...state.categoryData];
      let firstElement = data.splice(0, 1);
      data.push(firstElement);
      if (state.categoryData.length === state.wordCount) {
        data = _.shuffle(data);
      }
      return {...state, categoryData: data, wordCount: state.wordCount + 1};
    }
    case TYPES.CHANGE_SETTINGS: {
      return {
        ...state,
        settings: {...state.settings, [action.field]: action.value},
      };
    }

    case TYPES.ADD_ROUND_WORD: {
      return {
        ...state,
        game: {
          ...state.game,
          roundWords: [...state.game.roundWords, action.word],
        },
      };
    }
    case TYPES.ON_CHANGE_ROUND_WORD: {
      let roundWords = [...state.game.roundWords];
      const {item, index} = action;
      _.fill(roundWords, {...item, status: !item.status}, index, index + 1);
      return {
        ...state,
        game: {
          ...state.game,
          roundWords,
        },
      };
    }
    case TYPES.CHANGE_LAST_WORD_TEAM_GUESSED: {
      let roundWords = [...state.game.roundWords];
      let lastWord = roundWords[roundWords.length - 1];
      lastWord.teamGuessed = action.team;
      return {
        ...state,
        game: {
          ...state.game,
          roundWords,
        },
      };
    }

    case TYPES.CALCULATE_TEAM_SCORE: {
      const {game} = state;
      const {roundWords, teams} = game;
      let teamsValues = {...game.teamsValues};
      let score = 0;
      for (let i = 0; i < roundWords.length - 1; i++) {
        let word = roundWords[i];
        if (game.isSkipPenalty && !word.status) score -= 1;
        if (word.status) score += 1;
      }
      let lastWord = roundWords[roundWords.length - 1];
      if (lastWord.status) {
        teamsValues[lastWord.teamGuessed].score += 1;
      }
      teamsValues[teams[game.teamIndex]].score += score;
      teamsValues[teams[game.teamIndex]].timeLeft = game.time;
      teamsValues[teams[game.teamIndex]].round += 1;

      let teamIndex = game.teamIndex;
      if (teamIndex + 1 < teams.length) {
        teamIndex++;
      } else teamIndex = 0;
      return {
        ...state,
        game: {
          ...game,
          roundWords: [],
          teamsValues,
          teamIndex,
          isToReplaceScreenGame: false,
        },
      };
    }

    default:
      return state;
  }
}
