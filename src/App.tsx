import './App.css'
import { useContext, useEffect } from 'react';
import AuthorsContext from './context/authors';
import AuthorsList from './pages/AuthorsList';

function App() {

  const authorsContext = useContext(AuthorsContext);

  if (!authorsContext) {
    throw new Error("UsersContext must be used within a UsersProvider");
  }

  const { authors, getAuthors } = authorsContext;

  useEffect(() => {
    getAuthors();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthorsList authors={authors} />
  )
}

export default App
