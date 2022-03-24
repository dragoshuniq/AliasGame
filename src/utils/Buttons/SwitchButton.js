import React from 'react';
import {Switch} from 'react-native';
import {COLORS} from 'theme/theme';

export default function SwitchButton(props) {
  return (
    <Switch
      trackColor={{false: COLORS.GRAY, true: COLORS.PURPLE}}
      thumbColor={'white'}
      {...props}
    />
  );
}
