import { authorsData, type AuthorI } from "../data/authors";
import { createContext, useState } from "react";

export interface AuthorsContextI {
  authors: AuthorI[],
  getAuthors: () => Promise<AuthorI[]>,
}

const AuthorsContext = createContext<AuthorsContextI | null>(null);

function Provider({ children }: { children: React.ReactNode }) {
  const [authors, setAuthors] = useState<Awaited<ReturnType<typeof getAuthors>>>([]);

  const getAuthors = ():Promise<AuthorI[]> => {
    return new Promise<AuthorI[]>((resolve) => {
      setTimeout(() => {
        setAuthors(authorsData);
        resolve(authors);
      }, 1000);
    });
  };

  const valueToShare = {
    authors,
    getAuthors,
  };

  return (
    <AuthorsContext.Provider value={valueToShare}>
      {children}
    </AuthorsContext.Provider>
  );
}

export {Provider as AuthorsProvider};
export default AuthorsContext;