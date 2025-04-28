import { authorsData, type AuthorI, type LimitedAuthorType } from "../data/authors";
import { createContext, useState } from "react";

export interface AuthorsContextI {
  authors: AuthorI[],
  getAuthors: () => Promise<AuthorI[]>,
  editAuthors: (author: LimitedAuthorType) => void,
  isLoading: boolean,
}

const AuthorsContext = createContext<AuthorsContextI | null>(null);

function Provider({ children }: { children: React.ReactNode }) {
  const [authors, setAuthors] = useState<Awaited<ReturnType<typeof getAuthors>>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getAuthors = ():Promise<AuthorI[]> => {
    setIsLoading(true);

    return new Promise<AuthorI[]>((resolve) => {
      setTimeout(() => {
        setAuthors(authorsData);
        setIsLoading(false);
        resolve(authorsData);
      }, 1000);
    });
  };

  const editAuthors = (author:LimitedAuthorType) => {
    const authorsToUpdate = authors.map((a) => {
      if(a.id === author.id) {
        return {
          ...a,
          firstname: author.firstname,
          lastname: author.lastname,
          nationality: author.nationality
        }
      }else{
        return a;
      }
    })

    setAuthors(authorsToUpdate);
  };

  const valueToShare = {
    authors,
    getAuthors,
    editAuthors,
    isLoading,
  };

  return (
    <AuthorsContext.Provider value={valueToShare}>
      {children}
    </AuthorsContext.Provider>
  );
}

export {Provider as AuthorsProvider};
export default AuthorsContext;