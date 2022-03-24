import {View, Text, Pressable} from 'react-native';
import React from 'react';
import IonicIcon from 'react-native-vector-icons/Ionicons';

export default function HeaderButton(props) {
  const {action, size} = props;
  return (
    <View>
      <Pressable onPress={action}>
        <IonicIcon
          name="ios-caret-back-circle"
          style={{marginLeft: 20}}
          size={size || 28}
          color="white"
        />
      </Pressable>
    </View>
  );
}
