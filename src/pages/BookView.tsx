import { useContext, useState } from "react";
import BooksContext from "../context/books";
import styles from "./BookView.module.scss";
import { useParams, useNavigate, useEffect } from "react-router";
import Button from "../components/Button";
import Modal from "../components/Modal";
import BookForm from "../components/BookForm";
import Loading from "../components/Loading";

export default function BookView() {
  const booksContext = useContext(BooksContext);
  const [showModal, setShowModal] = useState<boolean>(false);
  const { id } = useParams();
  const navigate = useNavigate();
  
  if (!booksContext) {
    throw new Error("BookContext must be used within a BooksProvider");
  }

  const { books, isLoading } = booksContext;
  const editableBook = books.find((book) => book.id === Number(id));

  useEffect(() => {
    if(!editableBook && !isLoading) {
      navigate("/not-found");
    }
  }, [editableBook, isLoading, navigate]);

  if(isLoading) {
    return <Loading/>;
  }

  if(!editableBook) {
    return null;  
  }

  return (
    <section className={styles['book-item']}>
      <aside>
        <img src={editableBook.coverImage} alt={editableBook.title} width={180} height={280}/>
      </aside>
      <div>
        <h1>{editableBook.title}</h1>
        <p><span>Year: </span>{editableBook.publishedYear}</p>
        <p><span>Category: </span>{editableBook.category}</p>
        <p><span>ISBN: </span>{editableBook.isbn}</p>
        <p><span>Copies Available:</span>{editableBook.copiesAvailable}</p>
        <p><span>Onsale: </span>{editableBook.onsale ? 'Yes' : 'No'}</p>
        <Button
          text="Edit Book"
          onButtonClick={() => setShowModal(true)} 
        />
      </div>

      <Modal
        showModal={showModal}
        onModalClosed={() => setShowModal(false)}>
          <BookForm editableBook={editableBook} afterSubmit={() => setShowModal(false)}/>
      </Modal>
      
    </section>
  );
}