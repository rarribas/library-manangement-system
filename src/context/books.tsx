import { booksData, type BookI } from "../data/books";
import { createContext, useState } from "react";

export interface BooksContextI {
  books: BookI[],
  getBooks: () => Promise<BookI[]>,
}

const BooksContext = createContext<BooksContextI | null>(null);

function Provider({ children }: { children: React.ReactNode }) {
  const [books, setbooks] = useState<Awaited<ReturnType<typeof getBooks>>>([]);

  const getBooks = ():Promise<BookI[]> => {
    return new Promise<BookI[]>((resolve) => {
      setTimeout(() => {
        setbooks(booksData);
        resolve(books);
      }, 1000);
    });
  };

  const valueToShare = {
    books,
    getBooks,
  };

  return (
    <BooksContext.Provider value={valueToShare}>
      {children}
    </BooksContext.Provider>
  );
}

export {Provider as BooksProvider};
export default BooksContext;