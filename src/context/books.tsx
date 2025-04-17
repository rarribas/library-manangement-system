import { booksData, type BookI } from "../data/books";
import { createContext, useState } from "react";

export interface BooksContextI {
  books: BookI[],
  getBooks: () => Promise<BookI[]>,
  editBooks: (book: BookI) => void,
  addBook: (book: BookI) => void,
}

const BooksContext = createContext<BooksContextI | null>(null);

function Provider({ children }: { children: React.ReactNode }) {
  const [books, setBooks] = useState<Awaited<ReturnType<typeof getBooks>>>([]);

  const getBooks = ():Promise<BookI[]> => {
    return new Promise<BookI[]>((resolve) => {
      setTimeout(() => {
        setBooks(booksData);
        resolve(books);
      }, 1000);
    });
  };

  const editBooks = (book:BookI) => {
    const booksToUpdate = books.map((b) => {
      if(b.id === book.id) {
        return {
          ...b,
          title: book.title,
          publishedYear: book.publishedYear,
          coverImage: book.coverImage,
          category: book.category,
          isbn: book.isbn
        }
      }else{
        return b;
      }
    })

    setBooks(booksToUpdate);
  };

  const addBook = (book:BookI) => {
    const lastBook = books.length > 0 ? books[books.length - 1] : undefined;
    const newBook:BookI = {
      id: lastBook && lastBook.id ? lastBook.id + 1 : 0,
      title: book.title,
      publishedYear: book.publishedYear,
      coverImage: book.coverImage,
      category: book.category,
      isbn: book.isbn,
      onsale: true,
      copiesAvailable: 1
    }

    const bookToAdd = [
      ...books,
      newBook
    ];

    setBooks(bookToAdd)
  }

  const valueToShare = {
    books,
    getBooks,
    editBooks,
    addBook
  };

  return (
    <BooksContext.Provider value={valueToShare}>
      {children}
    </BooksContext.Provider>
  );
}

export {Provider as BooksProvider};
export default BooksContext;