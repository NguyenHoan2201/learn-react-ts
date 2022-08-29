import { Route, Routes } from 'react-router-dom';

import ListStudent from '@/features/students/pages/list';
import AddStudent from '@/features/students/pages/add';
import $event, { navigate as goTo } from '@/utils/event';
import { useNavigate, NavigateOptions } from 'react-router-dom';
import { useEffect, useState } from 'react';

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    $event.on('navigate-to', (params) => {
      console.log('redirecting......');
      navigate(params.to, params.options);
    });

    return () => {
      $event.remove('navigate-to');
    };
  }, []);

  return (
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/students' element={<ListStudent />}></Route>
      <Route path='/students/add' element={<AddStudent />}></Route>
    </Routes>
  );
}

export default App;

function Home() {
  const toStudentPage = () => {
    goTo({ to: '/students' });
  };
  return (
    <>
      <h3>Home page</h3>

      <button onClick={toStudentPage}>to student page</button>
    </>
  );
}
