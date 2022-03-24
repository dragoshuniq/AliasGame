import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';

import en from 'constants/languages/en/en.language';
import ro from 'constants/languages/ro/ro.language';
import ua from 'constants/languages/ua/ua.language';
import es from 'constants/languages/es/es.language';
import pt from 'constants/languages/pt/pt.language';
import fr from 'constants/languages/fr/fr.language';

i18next.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: {translation: {...en}},
    ro: {translation: {...ro}},
    ua: {translation: {...ua}},
    es: {translation: {...es}},
    pt: {translation: {...pt}},
    fr: {translation: {...fr}},
  },
});
export default i18next;
