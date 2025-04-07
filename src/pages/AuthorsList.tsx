import List from "../components/List";
import {type AuthorI } from "../data/authors";
import AuthorsContext from "../context/authors";
import { useContext } from "react";

type AuthorsInList = Pick<AuthorI, "id" | "firstname" | "lastname" | "nationality">
interface AuthorsListProps {
  authors: AuthorsInList[]
}

export default function AuthorsList() {
  const authorsContext = useContext(AuthorsContext);

  if (!authorsContext) {
    throw new Error("UsersContext must be used within a UsersProvider");
  }

  const { authors } = authorsContext as AuthorsListProps;

  const getAuthors = () => {
    return authors.map((author) => {
      return (
        <li key={author.id}>
          {author.firstname} {author.lastname} - {author.nationality}
        </li>
      );
    });
  };

  return (
    <section className="half-width">
      <h1>Authors List</h1>
      <List>
        {getAuthors()}
      </List>
      {/* TODO: Should the action be passed by the parent or should we have
      always a link here. In some context we might not need an action */}
    </section>
  );
}