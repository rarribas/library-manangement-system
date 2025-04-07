import './App.css'
import { useContext, useEffect } from 'react';
import AuthorsContext from './context/authors';
import { getRoutes } from './data/routes';
import { Routes } from 'react-router';

function App() {

  const authorsContext = useContext(AuthorsContext);

  if (!authorsContext) {
    throw new Error("UsersContext must be used within a UsersProvider");
  }

  const { getAuthors } = authorsContext;

  useEffect(() => {
    getAuthors();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Routes>
     {getRoutes()}
    </Routes>
  )
}

export default App
