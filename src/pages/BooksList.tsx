import List from "../components/List";
import {type BookI } from "../data/books";
import BooksContext from "../context/books";
import { useContext } from "react";
import { Link } from "react-router";

type BooksInList = Pick<BookI, "id" | "title" | "coverImage" | "publishedYear">
interface BooksListProps {
  books: BooksInList[]
}

export default function AuthorsList() {
  const booksContext = useContext(BooksContext);

  if (!booksContext) {
    throw new Error("BooksContext must be used within a UsersProvider");
  }

  const { books } = booksContext as BooksListProps;

  const getBooks = () => {
    return books.map((book) => {
      return (
        <li key={book.id}>
        <Link to={`/books/${book.id}/view`}>
          <header>
            <img src={book.coverImage} alt={book.title} height={280} width={180} />
          </header>
          
          <h5>{book.title} - {book.publishedYear}</h5>
        </Link>
      </li>
      );
    });
  };

  return (
    <section>
      <h1>Books List</h1>
      <List variant="books">
        {getBooks()}
      </List>
    </section>
  );
}