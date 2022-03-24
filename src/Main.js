import React from 'react';
import {Provider} from 'react-redux';
import {store, sagaMiddleware} from 'app-redux/store/store';
import Navigation from 'navigation/index';
import {I18nextProvider} from 'react-i18next';
import i18n from 'instances/i18next/i18next.instance';
import sagas from 'app-redux/sagas/index';

export default function App() {
  sagaMiddleware.run(sagas);
  return (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <Navigation />
      </Provider>
    </I18nextProvider>
  );
}
