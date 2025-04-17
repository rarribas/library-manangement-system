export enum BookCategory {
  Fiction = "Fiction",
  NonFiction = "Non Fiction",
  ScienceFiction = "Science Fiction",
  Biography = "Biography",
  History = "History"
}

export interface BookI {
  id: number
  title: string
  publishedYear: string
  coverImage?: string
  category: BookCategory
  copiesAvailable: number,
  onsale: boolean,
  isbn?: string
}

export const booksData: BookI[] = [{
  id: 1,
  title: '1984',
  category: BookCategory.Fiction,
  publishedYear: new Date('1949-06-08').toISOString().split("T")[0],
  onsale: true,
  copiesAvailable: 5,
  isbn: '978-0451524935',
  coverImage: 'https://covers.openlibrary.org/b/id/14845126-M.jpg',
}, {
  id: 2,
  title: 'Harry Potter and the Philosopher\'s Stone',
  category: BookCategory.Fiction,
  publishedYear: new Date('1997-06-26').toISOString().split("T")[0],
  onsale: false,
  copiesAvailable: 0,
  isbn: '978-0747532699',
  coverImage: 'https://covers.openlibrary.org/b/id/12622431-M.jpg',
}, {
  id: 3,
  title: 'The Lord of the Rings: The Fellowship of the Ring',
  category: BookCategory.Fiction,
  publishedYear: new Date('1954-07-29').toISOString().split("T")[0],
  onsale: true,
  copiesAvailable: 2,
  isbn: '978-0618002228',
  coverImage: 'https://covers.openlibrary.org/b/id/12607063-M.jpg',
},{
  id: 4,
  title: 'The Lord of the Rings: The Two Towers',
  category: BookCategory.Fiction,
  publishedYear: new Date('1954-07-29').toISOString().split("T")[0],
  onsale: true,
  copiesAvailable: 2,
  isbn: '978-0618002228',
  coverImage: 'https://covers.openlibrary.org/b/id/14627082-M.jpg',
}];

export type BooksInList = Pick<BookI, "id" | "title" | "publishedYear" | "coverImage">

export type LimitedBookType = Omit<BookI, 'id' | 'copiesAvailable' | 'onsale'>;

export interface EditableBookI {
  name: keyof LimitedBookType
  type: 'text' | 'date' | "select"
  text: string
  options?: { label: string; value: string }[]
}

const buildcategorySelectOoptions = ():{ label: string; value: string }[] => {
  return Object.values(BookCategory).map((category) => ({
    label: category,
    value: category
  }))
}
export const bookInputs:EditableBookI[] = [{
  name: "title",
  type: "text",
  text: "Title",
},{
  name: "category",
  type: "select",
  text: "Category",
  options: buildcategorySelectOoptions(),
},{
  name: "publishedYear",
  type: "date",
  text: "Published Year",
},{
  name: "coverImage",
  type: "text",
  text: "Cover Image",
},{
  name: "isbn",
  type: "text",
  text: "ISBN",
}]