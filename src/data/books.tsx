enum BookCategory {
  Fiction = "Fiction",
  NonFiction = "NonFiction",
  ScienceFiction = "ScienceFiction",
  Biography = "Biography",
  History = "History"
}

export interface BookI {
  id: number
  title: string
  publishedYear: Date
  coverImage?: string
  category: BookCategory
  copiesAvailable: number,
  onsale: boolean,
}

export const booksData: BookI[] = [{
  id: 1,
  title: '1984',
  category: BookCategory.Fiction,
  publishedYear: new Date('1949-06-08'),
  onsale: true,
  copiesAvailable: 5,
}, {
  id: 2,
  title: 'Harry Potter and the Philosopher\'s Stone',
  category: BookCategory.Fiction,
  publishedYear: new Date('1997-06-26'),
  onsale: false,
  copiesAvailable: 0,
}, {
  id: 3,
  title: 'The Lord of the Rings: The Fellowship of the Ring',
  category: BookCategory.Fiction,
  publishedYear: new Date('1954-07-29'),
  onsale: true,
  copiesAvailable: 2,
}];