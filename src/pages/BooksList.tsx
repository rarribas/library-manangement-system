import List from "../components/List";
import {type BookI } from "../data/books";
import BooksContext from "../context/books";
import { useContext } from "react";
import BookItem from "../components/BookItem";

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
    return books.map((book) => <BookItem book={book}/>);
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