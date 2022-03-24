import {View, ActivityIndicator} from 'react-native';
import React from 'react';
import RNBootSplash from 'react-native-bootsplash';
import {getStorageData} from 'helpers/storage';
import {SCREENS} from 'constants/screens/screen.names';

export default function Splash({navigation, setter, i18n}) {
  React.useEffect(() => {
    getStorageData('settings').then(res => {
      const settings = JSON.parse(res);
      i18n.changeLanguage(settings.language.value);
      if (settings) setter({settings: settings});
    });
    getStorageData('game')
      .then(res => {
        const game = JSON.parse(res);
        if (game?.isContinueGame) setter({game: game});
      })
      .finally(async () => {
        await RNBootSplash.hide({fade: true});
        navigation.navigate(SCREENS.MAIN_MENU);
      });
  }, []);
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <ActivityIndicator size="large" />
    </View>
  );
}
