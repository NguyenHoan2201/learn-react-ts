import { all } from 'redux-saga/effects';
import studentSaga from '@/features/students/saga';

export default function* rootSaga() {
  yield all([studentSaga()]);
}