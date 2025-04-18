import Form from "./Form";
import { bookInputs } from "../data/books";
import FormMessage, { type MessageVariantType } from "./FormMessage";
import BooksContext from "../context/books";
import { type BookI, type LimitedBookType, type BookCategory, type SubmitBookType} from "../data/books";
import { useContext, useEffect, useState, ChangeEvent } from "react";
import { useFormValidation } from "../hooks/useFormValidation";

interface BookFormI {
  editableBook?: BookI 
  afterSubmit?: () => void
}

export default function AuthorForm({editableBook, afterSubmit}:BookFormI) {
  const [book, setBook] = useState<LimitedBookType>({
    title: editableBook?.title || '',
    category: editableBook?.category || 'defaultCategory' as BookCategory,
    publishedYear: editableBook?.publishedYear || '',
    coverImage: editableBook?.coverImage || '',
    isbn: editableBook?.isbn || '',
  });
  const [submitStatus, setSubmitStatus] = useState<string| null>(null);
  const {isValidData, isValidField } = useFormValidation();

  useEffect(() => {
    setBook({
      title: editableBook?.title || '',
      category: editableBook?.category || 'defaultCategory' as BookCategory,
      publishedYear: editableBook?.publishedYear || '',
      coverImage: editableBook?.coverImage || '',
      isbn: editableBook?.isbn || '',
    })
  },[editableBook])

  useEffect(() => {
    if(submitStatus === "success"){ 
      const timer = setTimeout(() => setSubmitStatus(null), 5000);
      return () => clearTimeout(timer);
    }
  },[submitStatus]);

  const booksContext = useContext(BooksContext);

  if (!booksContext) {
    throw new Error("BookContext must be used within a BooksProvider");
  }

  const { editBooks, addBook } = booksContext;

  const onInputChange = (ev: ChangeEvent<HTMLInputElement | HTMLSelectElement>, inputName: string) => {
    const updatedBook = {
      ...book,
      [inputName]: ev.target.value,
    };
  
    setBook(updatedBook);
  };

  const getMessage = (message:string, variant:MessageVariantType) => {
    return <FormMessage  message={message} variant={variant}/>
  };

  const getInputs = () => {
    return bookInputs.map((input) => {
      return (
        <div  className="form-control" key={`input_${input.name}`}>
          <label htmlFor={input.name}>{input.text}</label>
          {input.type === "select" ? (
            <select
              name={input.name}
              id={input.name}
              value={book[input.name]}
              onChange={(ev) => onInputChange(ev, input.name)}
            >

              <option value="defaultCategory">Select a category</option>
              {input.options?.map((option) => (
                <option
                  key={`input_${input.name}_${option.value}`}
                  value={option.value}
                >
                  {option.label}
                </option>
              ))}
            </select>
          ): (
            <input
              type={input.type}
              name={input.name}
              id={input.name}
              value={book[input.name]}
              onChange={(ev) => onInputChange(ev, input.name)}
            />
          )}
          {!isValidField(input.name) && getMessage(`${input.text} cannot be empty`, "error")}
        </div>
      );   
    })
  }

  const resetForm = () => {
    setBook({
      title: '',
      category: 'defaultCategory' as BookCategory,
      publishedYear: '',
      coverImage: '',
      isbn: '',
    } as LimitedBookType)
  }
  
  const onFormSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    const isValid = isValidData(book);
    if(!isValid){
      setSubmitStatus("error");
      return false;
    } 

    const bookItem:SubmitBookType = {
      id: editableBook?.id || 0,
      title: book?.title,
      category: book?.category,
      publishedYear: book?.publishedYear,
      coverImage: book?.coverImage,
      isbn: book?.isbn,
    }

    if(editableBook) {
      editBooks(bookItem);
    }else{
      addBook(bookItem);
    }

    resetForm();
    setSubmitStatus("success");

    if(afterSubmit) afterSubmit();
  }

  return <>
    <Form 
      buttonText={editableBook ? "Edit Book" : "Add Book"} 
      onFormSubmit={onFormSubmit}>
      {getInputs()}
    </Form>
    {submitStatus === 'success' && getMessage("Success! The book has been added", "success")}
  </>
}