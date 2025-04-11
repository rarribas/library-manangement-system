import { useContext, useState } from "react";
import AuthorsContext from "../context/authors";
import BooksContext from "../context/books";
import styles from "./AuthorView.module.scss";
import { type BooksInList } from "../data/books";
import List from "../components/List";
import { Link } from "react-router";
import { useParams } from "react-router";
import Button from "../components/Button";
import Modal from "../components/Modal";
import AuthorForm from "../components/AuthorForm";

export default function AuthorView() {
  const authorsContext = useContext(AuthorsContext);
  const booksContext = useContext(BooksContext);
  const [showModal, setShowModal] = useState<boolean>(false);
  
  if (!authorsContext) {
    throw new Error("AuthorContext must be used within a AuthorsProvider");
  }

  if (!booksContext) {
    throw new Error("BookContext must be used within a BooksProvider");
  }

  const { authors } = authorsContext;
  const { books } = booksContext;
  const { id } = useParams();

  const editableAuthor = authors.find((author) => author.id === Number(id));

  if(!editableAuthor) {
    // TODO: Handle redirect to 404 page
    return <p>Author not found</p>;
  }

  const booksByAuthor:BooksInList[] = books.filter((book) => editableAuthor.bookIds?.includes(book.id));

  const getListOfBooks = () => {
    return booksByAuthor.map((book) => (
      <li key={book.id}>
        <Link to={`/book/${book.id}/view`}>
          <img src={book.coverImage} alt={book.title} />
          <p>{book.title} - {book.publishedYear.toLocaleDateString()}</p>
        </Link>
        
      </li>
    ));
  }

  return (
    <section className={styles['author-item']}>
      <header>
        <h1>{editableAuthor.firstname} {editableAuthor.lastname}</h1>
      </header>
      <div>
        <p><span>Birthdate:</span>{editableAuthor.birthDate.toLocaleDateString()}</p>
        <p><span>Nationality:</span>{editableAuthor.nationality}</p>
      </div>
      <Button
        text="Edit"
        onButtonClick={() => setShowModal(true)} />
      {booksByAuthor.length > 0 && (
        <>
          <h3>Books</h3>
          <List>
            {getListOfBooks()}
          </List>
        </>
      )}

      <Modal
        showModal={showModal}
        onModalClosed={() => setShowModal(false)}>
          <AuthorForm editableAuthor={editableAuthor} afterSubmit={() => setShowModal(false)}/>
        </Modal>
      
    </section>
  );
}