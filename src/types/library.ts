// TODO: Add tsx types for the library django models
export type Book = {
  title: string;
  pages: number;
  last_name: string;
  first_name: string;
  call_number: string;
  isbn: string;
  image?: string;
  copies?: number;
};

export type BookData = {
  call_number: string;
  isbn: string;
};

export type Student = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

export type Checkout = {
  book: string;
  student: Student;
  checkout_time: string;
  due_date: string;
  id: number;

  //...
};

export type CheckoutRead = {
  book: Book;
  student: Student;
  checkout_time: string;
  due_date: string;
  id: number;
}
