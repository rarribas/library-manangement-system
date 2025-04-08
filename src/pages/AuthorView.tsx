import { useContext } from "react";
import AuthorsContext from "../context/authors";
import styles from "./AuthorView.module.scss";
import { useParams } from "react-router";

export default function AuthorView() {
  const authorsContext = useContext(AuthorsContext);
  
  if (!authorsContext) {
    throw new Error("AuthorContext must be used within a AuthorsProvider");
  }

  const { authors } = authorsContext;
  const { id } = useParams();

  const editableAuthor = authors.find((author) => author.id === Number(id));

  if(!editableAuthor) {
    // TODO: Handle redirect to 404 page
    return <p>Author not found</p>;
  }

  return (
    <section className={styles['author-item']}>
      <header>
        <h1>{editableAuthor.firstname} {editableAuthor.lastname}</h1>
      </header>
      <div>
        <p><span>Birthdate:</span>{editableAuthor.birthDate.toLocaleDateString()}</p>
        <p><span>Nationality:</span>{editableAuthor.nationality}</p>
      </div>
      
    </section>
  );
}