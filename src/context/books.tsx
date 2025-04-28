import { booksData, type BookI, type SubmitBookType } from "../data/books";
import { createContext, useState } from "react";

export interface BooksContextI {
  books: BookI[],
  getBooks: () => Promise<BookI[]>,
  editBooks: (book: SubmitBookType) => void,
  addBook: (book: SubmitBookType) => void,
  isLoading: boolean,
}

const BooksContext = createContext<BooksContextI | null>(null);

function Provider({ children }: { children: React.ReactNode }) {
  const [books, setBooks] = useState<Awaited<ReturnType<typeof getBooks>>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getBooks = ():Promise<BookI[]> => {
    setIsLoading(true);

    return new Promise<BookI[]>((resolve) => {
      setTimeout(() => {
        setBooks(booksData);
        setIsLoading(false);
        resolve(booksData);
      }, 1000);
    });
  };

  const editBooks = (book:SubmitBookType) => {
    const booksToUpdate = books.map((b) => {
      if(b.id === book.id) {
        return {
          ...b,
          ...book,
        }
      }else{
        return b;
      }
    })

    setBooks(booksToUpdate);
  };

  const addBook = (book:SubmitBookType) => {
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
    addBook,
    isLoading
  };

  return (
    <BooksContext.Provider value={valueToShare}>
      {children}
    </BooksContext.Provider>
  );
}

export {Provider as BooksProvider};
export default BooksContext;