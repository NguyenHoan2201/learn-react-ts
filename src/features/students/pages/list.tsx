import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { useEffect } from 'react';
import { studentActions, selectStudentList } from '../slice';
import { navigate } from '@/utils/event';

export default function ListStudent() {
  const dispatch = useAppDispatch();
  const students = useAppSelector(selectStudentList);
  useEffect(() => {
    dispatch(studentActions.fetchStudentList({}));
  }, []);

  const addStudent = () => {
    dispatch(
      studentActions.addStudent({
        id: 'sktwi1cgkkuif3fg4',
        name: 'new student',
        age: 25,
        mark: 6.8,
        gender: 'female',
        createdAt: 1633700485643,
        updatedAt: 1633700485643,
        city: 'hcm'
      })
    );
  };

  const deleteStudent = () => {
    dispatch(studentActions.deleteStudent(0))
  };

  const toHomePage = ()=>{
    navigate({to:'/'});
  }
  return (
    <>
      <h3>List students: </h3>
      <p>{JSON.stringify(students)}</p>
      <p>{students.length}</p>

      <button onClick={addStudent}>Add Student</button>

      <button onClick={deleteStudent}>Delete Student</button>
      <button onClick={toHomePage}>Home page</button>
    </>
  );
}
