import {getRandom} from 'helpers/random';

export const SLIDING_ENTRANCES = [
  'slideInDown',
  'slideInUp',
  'slideInLeft',
  'slideInRight',
];

export const getRandomAnimation = () => {
  return SLIDING_ENTRANCES[getRandom(SLIDING_ENTRANCES.length)];
};
