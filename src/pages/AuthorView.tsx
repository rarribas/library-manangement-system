import { useContext, useState, useEffect } from "react";
import AuthorsContext from "../context/authors";
import BooksContext from "../context/books";
import styles from "./AuthorView.module.scss";
import { type BooksInList } from "../data/books";
import List from "../components/List";
import { useParams, useNavigate } from "react-router";
import Button from "../components/Button";
import Modal from "../components/Modal";
import AuthorForm from "../components/AuthorForm";
import Loading from "../components/Loading";
import BookItem from "../components/BookItem";

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

  const { authors, isLoading } = authorsContext;
  const { books } = booksContext;
  const { id } = useParams();
  const navigate = useNavigate();
  const editableAuthor = authors.find((author) => author.id === Number(id));

  useEffect(() => {
    if(!editableAuthor && !isLoading) {
      navigate("/not-found");
    }
  }, [editableAuthor, isLoading, navigate]);

  if(isLoading) {
    return <Loading/>;
  }

  if(!editableAuthor) {
    return null;  
  }

  const booksByAuthor:BooksInList[] = books.filter((book) => editableAuthor.bookIds?.includes(book.id));

  const getListOfBooks = () => {
    return booksByAuthor.map((book) => <BookItem key={book.id} book={book}/>)
  }

  return (
    <section className={styles['author-item']}>
      <aside>
        <header>
          <h1>{editableAuthor.firstname} {editableAuthor.lastname}</h1>
        </header>
        <div>
          <p><span>Birthdate:</span>{editableAuthor.birthDate.toLocaleDateString()}</p>
          <p><span>Nationality:</span>{editableAuthor.nationality}</p>
        </div>
        <Button
          text="Edit Author"
          onButtonClick={() => setShowModal(true)} 
        />
      </aside>
     
      {booksByAuthor.length > 0 && (
        <div>
          <List variant="books">
            {getListOfBooks()}
          </List>
        </div>
      )}

      <Modal
        showModal={showModal}
        onModalClosed={() => setShowModal(false)}>
          <AuthorForm editableAuthor={editableAuthor} afterSubmit={() => setShowModal(false)}/>
        </Modal>
      
    </section>
  );
}