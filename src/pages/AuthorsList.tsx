import List from "../components/List";
import {type AuthorI } from "../data/authors";
import AuthorsContext from "../context/authors";
import { useContext } from "react";
import { Link } from "react-router";
import Loading from "../components/Loading";

type AuthorsInList = Pick<AuthorI, "id" | "firstname" | "lastname" | "nationality">
interface AuthorsListProps {
  authors: AuthorsInList[],
  isLoading: boolean
}

export default function AuthorsList() {
  const authorsContext = useContext(AuthorsContext);

  if (!authorsContext) {
    throw new Error("UsersContext must be used within a UsersProvider");
  }

  const { authors, isLoading } = authorsContext as AuthorsListProps;

  const getAuthors = () => {
    return authors.map((author) => {
      console.log(author, author.id, "AUTHOR");
      return (
        <li key={author.id}>
          <Link to={`/author/${author.id}/view`}>
            {author.firstname} {author.lastname} - {author.nationality}
          </Link>
        </li>
      );
    });
  };

  return (
    <section>
      <h1>Authors List</h1>
      {isLoading ? <Loading/> : (
        <List>
          {getAuthors()}
        </List>
      )}
      
    </section>
  );
}