import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Modal from 'react-native-modal';
import {COLORS, SCREEN_SIZE, APP_STYLES} from 'theme/theme';
import LANGUAGES from 'constants/languages/languages';
import AntDesign from 'react-native-vector-icons/AntDesign';
export default function CountryPicker(props) {
  const {country, closeModal, isVisible, setCountry} = props;

  const renderLanguage = ({item}) => {
    const isCurrentLanguage = country?.value === item?.value;
    return (
      <TouchableOpacity
        style={styles.languageContainer}
        onPress={() => setCountry(item)}>
        <View style={{flex: 1}}>
          <Text
            style={[
              styles.pickerText,
              isCurrentLanguage && {fontWeight: 'bold'},
            ]}>
            {item.label}
          </Text>
        </View>
        <View style={styles.imageContainer}>
          <Image source={item.image} style={styles.countryImage} />
          {isCurrentLanguage && (
            <View style={styles.checkIcon}>
              <AntDesign name="checkcircle" color={COLORS.SUCCESS} size={30} />
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      onBackdropPress={closeModal}
      isVisible={isVisible}
      style={styles.centerModal}>
      <View style={styles.modalView}>
        <FlatList
          ListHeaderComponent={
            <Pressable onPress={closeModal}>
              <AntDesign
                name="closecircle"
                color={COLORS.PURPLE}
                size={30}
                style={{marginBottom: 10, alignSelf: 'flex-end'}}
              />
            </Pressable>
          }
          data={Object.values(LANGUAGES)}
          renderItem={renderLanguage}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  modalView: {
    width: SCREEN_SIZE.WIDTH,
    bottom: 0,
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
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
  pickerText: {
    color: COLORS.PURPLE,
    fontWeight: '500',
    fontSize: 18,
    textAlign: 'center',
  },
  centerModal: {
    justifyContent: 'flex-end',
    bottom: 0,
  },
  separator: {
    marginVertical: 10,
  },
  languageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryImage: {
    height: 30,
    width: 50,
  },
  checkIcon: {
    position: 'absolute',
    right: 10,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
