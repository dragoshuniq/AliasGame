import {COUNTRIES} from './countries';
import {EASY_WORDS} from './easy_words';

///common data
import {COMPANIES} from 'constants/datasets/companies';
import {FOOTBALL_TEAMS} from 'constants/datasets/football_teams';
import {SUPER_HEROES} from 'constants/datasets/super_heroes';
import {SUPER_VILLAINS} from 'constants/datasets/super_villains';
import {POKEMON} from 'constants/datasets/pokemon';
import {PERSONALITIES} from 'constants/datasets/personalities';

import {getRandomAnimation} from 'constants/selectors/animations';

export const CATEGORIES_TYPES = [
  {
    title: 'Easy words',
    image: require('assets/categories/easy.png'),
    total: EASY_WORDS.length,
    value: 'EASY_WORDS',
    animation: getRandomAnimation(),
  },
  {
    title: 'Pokemons',
    image: require('assets/categories/pokemon.png'),
    total: POKEMON.length,
    value: 'POKEMON',
    animation: getRandomAnimation(),
  },
  {
    title: 'Super Heroes',
    image: require('assets/categories/hero.png'),
    total: SUPER_HEROES.length,
    value: 'SUPER_HEROES',
    animation: getRandomAnimation(),
  },
  {
    title: 'Super Villains',
    image: require('assets/categories/villain.png'),
    total: SUPER_VILLAINS.length,
    value: 'SUPER_VILLAINS',
    animation: getRandomAnimation(),
  },
  {
    title: 'Personalities',
    image: require('assets/categories/personalities.png'),
    total: PERSONALITIES.length,
    value: 'PERSONALITIES',
    animation: getRandomAnimation(),
  },
  {
    title: 'Football Teams',
    image: require('assets/categories/football_teams.png'),
    total: FOOTBALL_TEAMS.length,
    value: 'FOOTBALL_TEAMS',
    animation: getRandomAnimation(),
  },
  {
    title: 'Countries',
    image: require('assets/categories/countries.png'),
    total: COUNTRIES.length,
    value: 'COUNTRIES',
    animation: getRandomAnimation(),
  },
  {
    title: 'Companies',
    image: require('assets/categories/brands.png'),
    total: COMPANIES.length,
    value: 'COMPANIES',
    animation: getRandomAnimation(),
  },
];
