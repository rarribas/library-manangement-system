import { useContext, useState } from "react";
import BooksContext from "../context/books";
import styles from "./AuthorView.module.scss";
import { useParams } from "react-router";
import Button from "../components/Button";
import Modal from "../components/Modal";

export default function AuthorView() {
  const booksContext = useContext(BooksContext);
  const [showModal, setShowModal] = useState<boolean>(false);
  

  if (!booksContext) {
    throw new Error("BookContext must be used within a BooksProvider");
  }

  const { books } = booksContext;
  const { id } = useParams();

  const editableBook = books.find((book) => book.id === Number(id));

  if(!editableBook) {
    // TODO: Handle redirect to 404 page
    return <p>Book not found</p>;
  }

  return (
    <section className={styles['author-item']}>
      <header>
        <h1>{editableBook.title}</h1>
        <img src={editableBook.coverImage} alt={editableBook.title} />
      </header>
      <div>
        <p><span>Year: </span>{editableBook.publishedYear.toLocaleDateString()}</p>
        <p><span>Category: </span>{editableBook.category}</p>
        <p><span>ISBN: </span>{editableBook.isbn}</p>
        <p><span>Copies Available:</span>{editableBook.copiesAvailable}</p>
        <p><span>Onsale: </span>{editableBook.onsale ? 'Yes' : 'No'}</p>
      </div>
      <Button
        text="Edit"
        onButtonClick={() => setShowModal(true)} />

      <Modal
        showModal={showModal}
        onModalClosed={() => setShowModal(false)}>
          <p>TODO EDIT</p>
        </Modal>
      
    </section>
  );
}