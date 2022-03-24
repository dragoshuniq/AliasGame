import {put, takeEvery, call, select} from 'redux-saga/effects';
// * Action types
import {setStorageData} from 'helpers/storage';
const selectState = state => state.appReducer;

// * Generators

function* onSaveLocalStorageGenerator() {
  try {
    const appReducer = yield select(selectState);
    yield setStorageData('game', appReducer.game);
    yield setStorageData('settings', appReducer.settings);
  } catch (error) {}
}

// * Watcher
export function* appActionWatcher() {
  yield takeEvery('*', onSaveLocalStorageGenerator);
}
