import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import {COLORS, SCREEN_SIZE, APP_STYLES} from 'theme/theme';
import {SCREENS} from 'constants/screens/screen.names';
import CountryPicker from 'utils/CountryPicker/CountryPicker';
import {setStorageData} from 'helpers/storage';
import {CheckBox} from 'react-native-elements';
import Ion from 'react-native-vector-icons/Ionicons';
export default function Menu(props) {
  const {
    t,
    i18n,
    navigation,
    resetGame,
    game,
    loadCategoryData,
    settings,
    changeSettings,
  } = props;
  const [isCountryPicker, setIsCountryPicker] = React.useState(false);
  React.useEffect(() => {
    const saveSettings = () => {
      setStorageData('settings', settings);
    };
    saveSettings();
  }, [settings]);

  const languageAlert = lan =>
    Alert.alert(t('MAIN_MENU.TEXT.CHANGE_LAN_ALERT'), null, [
      {
        text: t('MAIN_MENU.TEXT.CANCEL'),
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: t('MAIN_MENU.TEXT.CONFIRM'),
        onPress: () => {
          confirmChangeLanguage(lan);
        },
        style: 'destructive',
      },
    ]);

  function confirmChangeLanguage(lan) {
    i18n.changeLanguage(lan.value);
    changeSettings('language', lan);
    setIsCountryPicker(false);
  }

  const changeLanguage = lan => {
    if (lan.value !== settings.language.value && game?.isContinueGame) {
      languageAlert(lan);
    } else {
      confirmChangeLanguage(lan);
    }
  };

  const newGameAlert = () =>
    Alert.alert(
      t('MAIN_MENU.TEXT.NEW_GAME_ALERT'),
      t('MAIN_MENU.TEXT.NEW_GAME_ALERT_DESCRIPTION'),
      [
        {
          text: t('MAIN_MENU.TEXT.CANCEL'),
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: t('MAIN_MENU.TEXT.CONFIRM'),
          style: 'destructive',
          onPress: () => {
            resetGame();
            navigation.navigate(SCREENS.TEAM_SETUP);
          },
        },
      ],
    );

  return (
    <>
      <View style={styles.container}>
        <LinearGradient
          style={styles.topContainer}
          colors={['oldlace', 'white']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}>
          <Animatable.Text
            style={styles.sloganText}
            animation="pulse"
            iterationCount="infinite"
            direction="alternate-reverse">
            {t('MAIN_MENU.TEXT.SLOGAN')}
          </Animatable.Text>

          <Animatable.Image
            style={styles.gameLogo}
            source={require('assets/logo.png')}
            animation="swing"
            iterationCount="infinite"
            iterationDelay={1000}
          />
          <View>
            <View
              style={[
                APP_STYLES.ROW,
                {
                  justifyContent: 'space-evenly',
                  width: '100%',
                },
              ]}>
              {/* <View style={styles.globeContainer}>
                <CheckBox
                  center
                  onPress={value =>
                    changeSettings('isSound', !settings.isSound)
                  }
                  checkedIcon={
                    <Ion
                      name="ios-volume-high-sharp"
                      color={COLORS.PURPLE}
                      size={60}
                    />
                  }
                  uncheckedIcon={
                    <Ion
                      name="ios-volume-mute-sharp"
                      color={COLORS.PURPLE}
                      size={60}
                    />
                  }
                  checked={settings.isSound}
                />
              </View> */}
              <TouchableOpacity onPress={() => setIsCountryPicker(true)}>
                <Image
                  source={settings?.language?.image}
                  style={{transform: [{scale: 0.6}]}}
                />
              </TouchableOpacity>
            </View>
            <Text style={[styles.text, {marginTop: 10, textAlign: 'center'}]}>
              {settings?.language?.label}
            </Text>
          </View>
        </LinearGradient>
        <View style={styles.bottomContainer}>
          <Animatable.View animation="slideInLeft">
            <Pressable
              style={[
                styles.menuButton,
                !game?.isContinueGame && {opacity: 0.5},
              ]}
              disabled={!game?.isContinueGame}
              onPress={() => {
                loadCategoryData();
                navigation.replace(SCREENS.NEXT_TEAM);
              }}>
              <Text style={styles.menuButtonText}>
                {t('MAIN_MENU.BUTTONS.CONTINUE')}
              </Text>
            </Pressable>
          </Animatable.View>

          <Animatable.View animation="slideInRight">
            <Pressable
              style={styles.menuButton}
              onPress={() => {
                if (game?.isContinueGame) newGameAlert();
                else {
                  navigation.navigate(SCREENS.TEAM_SETUP);
                }
              }}>
              <Text style={styles.menuButtonText}>
                {t('MAIN_MENU.BUTTONS.NEW_GAME')}
              </Text>
            </Pressable>
          </Animatable.View>

          <Animatable.View animation="slideInUp">
            <Pressable
              style={styles.menuButton}
              onPress={() => {
                navigation.navigate(SCREENS.GAME_RULES);
              }}>
              <Text style={styles.menuButtonText}>
                {t('MAIN_MENU.BUTTONS.GAME_RULES')}
              </Text>
            </Pressable>
          </Animatable.View>
        </View>
      </View>
      <CountryPicker
        isVisible={isCountryPicker}
        country={settings.language}
        closeModal={() => setIsCountryPicker(false)}
        setCountry={changeLanguage}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    flex: 1.5,
    backgroundColor: COLORS.MAIN,
    borderBottomLeftRadius: 150,
    borderBottomRightRadius: 150,
    alignItems: 'center',
    justifyContent: 'center',
    ...APP_STYLES.SHADOW,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuButton: {
    width: SCREEN_SIZE.WIDTH * 0.9,
    backgroundColor: COLORS.YELLY,
    paddingVertical: 15,
    borderRadius: 20,
    marginVertical: 10,
    ...APP_STYLES.SHADOW,
  },
  menuButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  gameLogo: {
    width: SCREEN_SIZE.WIDTH * 0.6,
    height: SCREEN_SIZE.WIDTH * 0.6,
  },
  sloganText: {
    color: COLORS.PURPLE,
    fontWeight: 'bold',
    fontSize: 18,
  },
  text: {
    color: COLORS.PURPLE,
    fontSize: 26,
    fontWeight: 'bold',
    ...APP_STYLES.SHADOW,
  },
});
