import List from "../components/List";
import {type AuthorI } from "../data/authors";

type AuthorsInList = Pick<AuthorI, "id" | "firstname" | "lastname" | "nationality">
interface AuthorsListProps {
  authors: AuthorsInList[]
}

export default function AuthorsList({authors}:AuthorsListProps) {
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
    </section>
  );
}