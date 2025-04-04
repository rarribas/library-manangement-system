export interface AuthorI {
  id: number
  firstname: string
  lastname: string
  birthDate: Date
  nationality: string
}

export const authorsData: AuthorI[] = [{
  id: 1,
  firstname: 'George',
  lastname: 'Orwell',
  birthDate: new Date('1903-06-25'),
  nationality: 'British',
}, {
  id: 2,
  firstname: 'J.K.',
  lastname: 'Rowling',
  birthDate: new Date('1965-07-31'),
  nationality: 'British',
}, {
  id: 3,
  firstname: 'J.R.R.',
  lastname: 'Tolkien',
  birthDate: new Date('1892-09-02'),
  nationality: 'British',
}]