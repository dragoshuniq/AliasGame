import * as TYPES from './app.actions-types';

export const setter = value => ({
  type: TYPES.SETTER,
  value,
});

export const addTeam = value => ({
  type: TYPES.ADD_TEAM,
  value,
});
export const removeTeam = value => ({
  type: TYPES.REMOVE_TEAM,
  value,
});

export const changeGameSetup = (field, value) => ({
  type: TYPES.CHANGE_GAME_SETUP,
  value,
  field,
});

export const loadCategoryData = () => ({
  type: TYPES.LOAD_CATEGORY_DATA,
});

export const unshiftData = () => ({
  type: TYPES.UNSHIFT_BACK_ARRAY,
});

export const addRoundWord = word => ({
  type: TYPES.ADD_ROUND_WORD,
  word,
});

export const onChangeRoundWord = (item, index) => ({
  type: TYPES.ON_CHANGE_ROUND_WORD,
  item,
  index,
});

export const calculateTeamScore = () => ({
  type: TYPES.CALCULATE_TEAM_SCORE,
});

export const resetGame = () => ({
  type: TYPES.RESET_GAME,
});

export const setTeams = () => ({
  type: TYPES.SET_TEAMS,
});
export const changeSettings = (field, value) => ({
  type: TYPES.CHANGE_SETTINGS,
  value,
  field,
});

export const changeLastWordTeamGuessed = team => ({
  type: TYPES.CHANGE_LAST_WORD_TEAM_GUESSED,
  team,
});
