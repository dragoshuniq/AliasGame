import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import _ from 'lodash';
import {CheckBox, Icon} from 'react-native-elements';
import {COLORS, SCREEN_SIZE, APP_STYLES} from 'theme/theme';
import * as Animatable from 'react-native-animatable';
import {SCREENS} from 'constants/screens/screen.names';

export default function Categories(props) {
  const {t, changeGameSetup, game, navigation, loadCategoryData, setTeams} =
    props;
  const onChangeCategory = category => {
    let categ = _.isEqual(game.category, category) ? null : category;
    changeGameSetup('category', categ);
  };

  const isCategory = () => {
    return Boolean(game.category);
  };

  const renderCard = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => onChangeCategory(item)}
        activeOpacity={0.5}>
        <Animatable.View
          style={styles.cardContainer}
          animation={item.animation}>
          <View style={styles.cardDetails}>
            <View style={{flex: 1}}>
              <Image source={item.image} style={styles.cardImage} />
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.categoryText}>{item.title}</Text>
              <Text style={styles.totalText}>
                {item.total} {t('CATEGORIES_SETUP.TEXT.WORDS')}
              </Text>
              <View style={styles.selectCategoryContainer}>
                <CheckBox
                  center
                  disabled
                  checkedIcon={
                    <Icon
                      name="radio-button-checked"
                      type="material"
                      color={COLORS.PURPLE}
                      size={40}
                    />
                  }
                  uncheckedIcon={
                    <Icon
                      name="radio-button-unchecked"
                      type="material"
                      color={COLORS.PURPLE}
                      size={40}
                    />
                  }
                  checked={_.isEqual(game.category, item)}
                />
              </View>
            </View>
          </View>
        </Animatable.View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={t('CATEGORIES_TYPES', {returnObjects: true})}
        renderItem={renderCard}
        keyExtractor={(_, index) => index}
        ListFooterComponent={
          <Animatable.View
            animation="slideInUp"
            style={[
              styles.buttonContainer,
              {...(!isCategory() && {opacity: 0.5})},
            ]}>
            <Pressable
              disabled={!isCategory()}
              style={styles.buttonPressable}
              onPress={() => {
                setTeams();
                loadCategoryData();
                navigation.navigate(SCREENS.NEXT_TEAM);
              }}>
              <Text style={styles.buttonText}>
                {t('CATEGORIES_SETUP.BUTTONS.START')}
              </Text>
            </Pressable>
          </Animatable.View>
        }
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListFooterComponentStyle={{marginVertical: 30}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, marginVertical: 30},
  cardContainer: {
    width: SCREEN_SIZE.WIDTH * 0.9,
    borderWidth: 0.1,
    borderColor: COLORS.GRAY,
    height: 150,
    borderRadius: 30,
    alignSelf: 'center',
    backgroundColor: 'white',
  },
  cardImage: {
    flex: 1,
    width: 'auto',
    height: '100%',
    marginLeft: 20,
    resizeMode: 'contain',
  },
  cardDetails: {
    flexDirection: 'row',
    flex: 1,
  },
  cardInfo: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingVertical: 20,
  },
  totalText: {
    fontWeight: '500',
    fontSize: 24,
    color: COLORS.GRAY,
    textAlign: 'center',
  },
  categoryText: {
    fontWeight: '500',
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
  },
  selectCategoryContainer: {
    position: 'absolute',
    top: -10,
    right: 0,
  },
  buttonContainer: {
    borderRadius: 25,
    width: '80%',
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
  separator: {
    marginVertical: 10,
  },
});
