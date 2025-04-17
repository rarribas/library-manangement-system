import BookForm from '../components/BookForm';
import Button from '../components/Button';

export default function AddBook() {
  return (
    <section>
      <h1>Add Book</h1>
      <p>Form to add a new book will go here.</p>
      <BookForm/>
      <Button 
        text="Go To List of Books" 
        navigateTo="/books"
      />
    </section>
  )
}