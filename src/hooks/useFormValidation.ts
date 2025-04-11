import { useState } from "react";

export function useFormValidation() {

  const [formErrors, setFormErrors] = useState<string[]>([]);

  const getEmptyValues =  <T extends Record<string, string>>(formElements: T) => {
    return Object.entries(formElements)
      // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
      .filter(([_, value]) => value === '') 
      .map(([key]) => key);
  }
    

  const isValidField = (inputName:string) => {
    if(formErrors.length === 0) return true;
    return !formErrors.includes(inputName);
  };

  // Accepts any kind of objects with a key:string and value:any
  const isValidData =  <T extends Record<string, string>>(formElements: T) => {
    const emptyElements = getEmptyValues(formElements); 
    if(emptyElements.length > 0){
      setFormErrors(emptyElements);
      return false;
    }else {
      setFormErrors([]);
      return true;
    }
  };

  return {
    isValidData,
    isValidField
  }
}