// * Redux
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';

// * Components
import MainMenu from 'components/screens/MainMenu/MainMenu.screen.js';
import GameRules from 'components/screens/GameRules/GameRules.screen.js';
import Splash from 'components/screens/Splash/Splash.screen.js';
import TeamSetup from 'components/screens/TeamSetup/TeamSetup.screen.js';
import GameSetup from 'components/screens/GameSetup/GameSetup.screen.js';
import CategoriesSetup from 'components/screens/CategoriesSetup/Categories.screen';
import Game from 'components/screens/Game/Game.screen';
import NextTeam from 'components/screens/NextTeam/NextTeam.screen';
import ScoreBoard from 'components/screens/ScoreBoard/ScoreBoard.screen';
import ResultsCheck from 'components/screens/ResultsCheck/ResultsCheck.screen';
import Winner from 'components/screens/Winner/Winner.screen';

import {
  setter,
  addTeam,
  removeTeam,
  changeGameSetup,
  loadCategoryData,
  unshiftData,
  addRoundWord,
  onChangeRoundWord,
  resetGame,
  calculateTeamScore,
  setTeams,
  changeSettings,
  changeLastWordTeamGuessed,
} from 'app-redux/actions/app/app.actions';
// * Map state to props
const mapStateToProps = (state, ownProps) => ({
  ...state.appReducer,
});

// * Map actions to props
const mapDispatchToProps = dispatch => ({
  setter: value => dispatch(setter(value)),
  addTeam: value => dispatch(addTeam(value)),
  removeTeam: value => dispatch(removeTeam(value)),
  changeSettings: (field, value) => dispatch(changeSettings(field, value)),
  changeGameSetup: (field, value) => dispatch(changeGameSetup(field, value)),
  loadCategoryData: () => dispatch(loadCategoryData()),
  unshiftData: () => dispatch(unshiftData()),
  addRoundWord: word => dispatch(addRoundWord(word)),
  onChangeRoundWord: (item, index) => dispatch(onChangeRoundWord(item, index)),
  calculateTeamScore: () => dispatch(calculateTeamScore()),
  resetGame: () => dispatch(resetGame()),
  setTeams: () => dispatch(setTeams()),
  changeLastWordTeamGuessed: team => dispatch(changeLastWordTeamGuessed(team)),
});

export default {
  MainMenu: withTranslation()(
    connect(mapStateToProps, mapDispatchToProps)(MainMenu),
  ),
  Splash: withTranslation()(
    connect(mapStateToProps, mapDispatchToProps)(Splash),
  ),
  TeamSetup: withTranslation()(
    connect(mapStateToProps, mapDispatchToProps)(TeamSetup),
  ),
  GameSetup: withTranslation()(
    connect(mapStateToProps, mapDispatchToProps)(GameSetup),
  ),
  CategoriesSetup: withTranslation()(
    connect(mapStateToProps, mapDispatchToProps)(CategoriesSetup),
  ),
  Game: withTranslation()(connect(mapStateToProps, mapDispatchToProps)(Game)),
  NextTeam: withTranslation()(
    connect(mapStateToProps, mapDispatchToProps)(NextTeam),
  ),
  ResultsCheck: withTranslation()(
    connect(mapStateToProps, mapDispatchToProps)(ResultsCheck),
  ),
  ScoreBoard: withTranslation()(
    connect(mapStateToProps, mapDispatchToProps)(ScoreBoard),
  ),
  GameRules: withTranslation()(
    connect(mapStateToProps, mapDispatchToProps)(GameRules),
  ),
  Winner: withTranslation()(
    connect(mapStateToProps, mapDispatchToProps)(Winner),
  ),
};
