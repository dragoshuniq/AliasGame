import React from 'react';
import MainConnection from 'components/connections/Main.connection';

import HeaderButton from 'utils/Buttons/HeaderButton';
import {createStackNavigator} from '@react-navigation/stack';
import {SCREENS} from 'constants/screens/screen.names';
import {COLORS} from 'theme/theme';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

const Stack = createStackNavigator();

export default function HomeStackNavigator({navigation}) {
  const reducers = useSelector(state => state);
  const {t} = useTranslation();

  const headerOptions = {
    headerTitleAlign: 'center',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: COLORS.YELLY,
    },
  };

  return (
    <Stack.Navigator screenOptions={{gestureEnabled: false}}>
      <Stack.Screen
        name={SCREENS.SPLASH}
        component={MainConnection.Splash}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={SCREENS.MAIN_MENU}
        component={MainConnection.MainMenu}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name={SCREENS.TEAM_SETUP}
        component={MainConnection.TeamSetup}
        options={({navigation}) => ({
          ...headerOptions,
          title: t('TEAM_SETUP.TEXT.SCREEN_TITLE'),
          headerLeft: () => (
            <HeaderButton
              action={() => {
                navigation.goBack();
              }}
            />
          ),
        })}
      />

      <Stack.Screen
        name={SCREENS.GAME_SETUP}
        component={MainConnection.GameSetup}
        options={({navigation}) => ({
          ...headerOptions,
          title: t('GAME_SETUP.TEXT.SCREEN_TITLE'),
          headerLeft: () => (
            <HeaderButton
              action={() => {
                navigation.goBack();
              }}
            />
          ),
        })}
      />
      <Stack.Screen
        name={SCREENS.CATEGORIES_SETUP}
        component={MainConnection.CategoriesSetup}
        options={({navigation}) => ({
          ...headerOptions,
          title: t('CATEGORIES_SETUP.TEXT.SCREEN_TITLE'),
          headerLeft: () => (
            <HeaderButton
              action={() => {
                navigation.goBack();
              }}
            />
          ),
        })}
      />
      <Stack.Screen
        name={SCREENS.GAME}
        component={MainConnection.Game}
        options={({navigation}) => ({
          ...headerOptions,
          headerShown: false,
        })}
      />
      <Stack.Screen
        name={SCREENS.WINNER}
        component={MainConnection.Winner}
        options={({navigation}) => ({
          ...headerOptions,
          headerShown: false,
        })}
      />
      <Stack.Screen
        name={SCREENS.NEXT_TEAM}
        component={MainConnection.NextTeam}
        options={({navigation}) => ({
          ...headerOptions,
          headerShown: false,
        })}
      />
      <Stack.Screen
        name={SCREENS.SCORE_BOARD}
        component={MainConnection.ScoreBoard}
        options={({navigation}) => ({
          ...headerOptions,
          headerShown: false,
        })}
      />
      <Stack.Screen
        name={SCREENS.RESULTS_CHECK}
        component={MainConnection.ResultsCheck}
        options={({navigation}) => ({
          ...headerOptions,
          headerShown: false,
        })}
      />
      <Stack.Screen
        name={SCREENS.GAME_RULES}
        component={MainConnection.GameRules}
        options={({navigation}) => ({
          ...headerOptions,
          headerTransparent: true,
          title: null,
          headerLeft: () => (
            <HeaderButton
              size={40}
              action={() => {
                navigation.goBack();
              }}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
}
