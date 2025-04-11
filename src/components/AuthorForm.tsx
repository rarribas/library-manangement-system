import Form from "./Form";
import { authorInputs } from "../data/authors";
import FormMessage, { type MessageVariantType } from "./FormMessage";
import AuthorsContext from "../context/authors";
import { type AuthorI, type LimitedAuthorType } from "../data/authors";
import { useContext, useEffect, useState, ChangeEvent } from "react";
import { useFormValidation } from "../hooks/useFormValidation";

interface AuthorFormI {
  editableAuthor: AuthorI | undefined
  afterSubmit?: () => void
}

export default function AuthorForm({editableAuthor, afterSubmit}:AuthorFormI) {
  const [author, setAuthor] = useState<LimitedAuthorType>({
    firstname: editableAuthor?.firstname || '',
    lastname: editableAuthor?.lastname || '',
    nationality: editableAuthor?.nationality || '',
  });
  const [submitStatus, setSubmitStatus] = useState<string| null>(null);
  const {isValidData, isValidField } = useFormValidation();

  useEffect(() => {
    setAuthor({
      firstname: editableAuthor?.firstname || '',
      lastname: editableAuthor?.lastname || '',
      nationality: editableAuthor?.nationality || '',
    })
  },[editableAuthor])

  useEffect(() => {
    if(submitStatus === "success"){ 
      const timer = setTimeout(() => setSubmitStatus(null), 5000);
      return () => clearTimeout(timer);
    }
  },[submitStatus]);

  const authorsContext = useContext(AuthorsContext);

  if (!authorsContext) {
    throw new Error("AuthorContext must be used within a AuthorsProvider");
  }

  const { editAuthors } = authorsContext;

  const onInputChange = (ev:ChangeEvent<HTMLInputElement>, inputName:string) => {

    const updatedAuthor = {
      ... author,
      [inputName]: ev.target.value,
    }

    setAuthor(updatedAuthor)
  }

  const getMessage = (message:string, variant:MessageVariantType) => {
    return <FormMessage  message={message} variant={variant}/>
  };

  const getInputs = () => {
    return authorInputs.map((input) => {
      return (
        <div  className="form-control" key={`input_${input.name}`}>
          <label htmlFor={input.name}>{input.text}</label>
          <input
            type={input.type}
            name={input.name}
            id={input.name}
            value={author[input.name]}
            onChange={(ev) => onInputChange(ev, input.name)}
          />
          {!isValidField(input.name) && getMessage(`${input.text} cannot be empty`, "error")}
        </div>
      );   
    })
  }

  const resetForm = () => {
    setAuthor({
      firstname: '',
      lastname: '',
      nationality: ''
    } as AuthorI)
  }
  
  const onFormSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    const isValid = isValidData(author);
    if(!isValid){
      setSubmitStatus("error");
      return false;
    } 

    editAuthors({
      id: editableAuthor?.id || 0,
      firstname: author.firstname,
      lastname: author.lastname,
      nationality: author.nationality
    } as AuthorI)

    resetForm();
    setSubmitStatus("success");

    if(afterSubmit) afterSubmit();
  }

  return <>
    <Form buttonText="Edit Author" onFormSubmit={onFormSubmit}>
      {getInputs()}
    </Form>
    {submitStatus === 'success' && getMessage("Success! The user has been added", "success")}
  </>
}