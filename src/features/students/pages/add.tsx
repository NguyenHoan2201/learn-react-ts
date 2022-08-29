import studentApi from '@/api/studentApi';
import { randomString } from '@/utils';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function AddStudent() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const addStudent = async () => {
    setMessage('');
    setLoading(true);
    await studentApi.add({
      id: randomString(10),
      name: 'new student',
      age: 25,
      mark: 6.8,
      gender: 'female',
      createdAt: 1633700485643,
      updatedAt: 1633700485643,
      city: 'hcm'
    });

    setLoading(false);
    setMessage('Success! Fake API, no student was actually added');
  };
  return (
    <>
      <h4>Add Student: </h4>
      <div>{message}</div>
      <button onClick={() => addStudent()} disabled={loading}>
        {loading ? 'Click to add random student' : 'Adding new student'}
      </button>
      <Link to='/students'>Back to students list</Link>
    </>
  );
}
