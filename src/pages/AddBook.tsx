import BookForm from '../components/BookForm';
import styles from './AddBook.module.scss';

export default function AddBook() {
  return (
    <section className={styles['add-book']}>
      <h1>Add Book</h1>
      <p>Form to add a new book will go here.</p>
      <div className={styles['add-book-form-wrapper']}>
        <BookForm/>
      </div>
      
    </section>
  )
}