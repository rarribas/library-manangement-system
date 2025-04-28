export interface AuthorI {
  id?: number
  firstname: string
  lastname: string
  birthDate: Date
  nationality: string
  bookIds?: number[]
}

export type LimitedAuthorType = Omit<AuthorI, 'birthDate' | 'bookIds'>;

export interface EditableAuthorI {
  name: keyof LimitedAuthorType
  type: 'text'
  text: string
}

export const authorsData: AuthorI[] = [{
  id: 1,
  firstname: 'George',
  lastname: 'Orwell',
  birthDate: new Date('1903-06-25'),
  nationality: 'British',
  bookIds: [1],
}, {
  id: 2,
  firstname: 'J.K.',
  lastname: 'Rowling',
  birthDate: new Date('1965-07-31'),
  nationality: 'British',
  bookIds: [2],
}, {
  id: 3,
  firstname: 'J.R.R.',
  lastname: 'Tolkien',
  birthDate: new Date('1892-09-02'),
  nationality: 'British',
  bookIds: [3, 4],
}]

export const authorInputs:EditableAuthorI[] = [{
  name: "firstname",
  type: "text",
  text: "First Name",
},{
  name: "lastname",
  type: "text",
  text: "Last Name",
},{
  name: "nationality",
  type: "text",
  text: "Nationality",
}]