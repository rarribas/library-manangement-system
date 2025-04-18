import './App.css'
import { useContext, useEffect } from 'react';
import AuthorsContext from './context/authors';
import BooksContext from './context/books';
import { getRoutes } from './data/routes';
import { Routes, Route } from 'react-router';
import  Layout from './components/Layout';

function App() {

  const authorsContext = useContext(AuthorsContext);
  const booksContext = useContext(BooksContext);

  if (!authorsContext || !booksContext) {
    throw new Error("Context must be used within a Provider");
  }

  const { getAuthors } = authorsContext;
  const { getBooks } = booksContext;

  useEffect(() => {
    getAuthors();
    getBooks();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Routes>
     <Route element={<Layout />}>
      {getRoutes()}
     </Route>
    </Routes>
  )
}

export default App
