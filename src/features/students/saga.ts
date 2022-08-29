
import { PayloadAction } from '@reduxjs/toolkit';
import studentApi from '@/api/studentApi';
import { ListParams, ListResponse, Student } from '@/models';
import { call, put, takeLatest, select, takeEvery } from 'redux-saga/effects';
import { studentActions, selectStudentFilter } from './slice';

function* fetchStudentList(action?: PayloadAction<ListParams>) {
  try {
    const filter: ListParams = yield select(selectStudentFilter);
    const response: ListResponse<Student> = yield call(studentApi.getAll, Object.assign({}, filter, action?.payload?? {}));
    yield put(studentActions.fetchStudentListSuccess(response));
  } catch (error) {
    console.log('Failed to fetch student list', error);
    yield put(studentActions.fetchStudentListFailed());
  }
}

function* addStudent(action: PayloadAction<Student>){
  yield put(studentActions.addStudentSuccess(action.payload))
}

function* deleteStudent(action: PayloadAction<number>){
  yield put(studentActions.deleteStudentSuccess(action.payload))
}

export default function* studentSaga(){
  yield takeLatest(studentActions.fetchStudentList, fetchStudentList);

  yield takeEvery(studentActions.addStudent, addStudent);

  yield takeEvery(studentActions.deleteStudent, deleteStudent);
}

