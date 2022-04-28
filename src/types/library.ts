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

  //...
};

export type Checkout = {
  
  book: string;
  student: number;
  checkout_time: string;
  due_date: string;
  id: number;

  //...
};
