import { Link } from "react-router";
import { type BooksInList } from "../data/books";

interface BookItemProps {
  book: BooksInList;
}

export default function BookItem({book}:BookItemProps){
  return(
    <li>
      <Link to={`/books/${book.id}/view`}>
        <header>
          <img src={book.coverImage} alt={book.title} height={280} width={180} />
        </header>
        <h5>{book.title} - {book.publishedYear}</h5>
      </Link>
    </li>
  )
}