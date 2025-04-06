// import { Book } from '../types/Book';

// interface FetchBooksResponse {
//   books: Book[];
//   totalNumberOfBooks: number;
// }

// const API_URL = 'https://localhost:5000/api/Book';

// export const fetchBooks = async (
//   pageSize: number,
//   pageNum: number,
//   sortOrder: string,
//   selectedCategories: string[]
// ): Promise<FetchBooksResponse> => {
//   try {
//     const categoryParams = selectedCategories
//       .map((cat) => `categories=${encodeURIComponent(cat)}`) //encode the URI
//       .join('&');

//     const response = await fetch(
//       `${API_URL}/AllBooks?pageHowMany=${pageSize}&pageNum=${pageNum}&sortBY=title&sortOrder=${sortOrder}${selectedCategories.length ? `&${categoryParams}` : ''}`
//     );
//     if (!response.ok) {
//       throw new Error('Failed to fetch books');
//     }

//     return await response.json();
//   } catch (error) {
//     console.error('Error fetching books:', error);
//     throw error;
//   }
// };

// export const addBook = async (newBook: Book): Promise<Book> => {
//   try {
//     const response = await fetch(`${API_URL}/AddBook?`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(newBook),
//     });
//     if (!response.ok) {
//       throw new Error('Failed to add book');
//     }
//     return await response.json();
//   } catch (error) {
//     console.error('Error adding book', error);
//     throw error;
//   }
// };

// export const updateBook = async (
//   bookId: number,
//   updatedBook: Book
// ): Promise<Book> => {
//   try {
//     const response = await fetch(`${API_URL}/UpdateBook/${bookId}?`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(updatedBook),
//     });
//     if (!response.ok) {
//       throw new Error('Failed to edit book');
//     }
//     return await response.json();
//   } catch (error) {
//     console.error('Error updating book:', error);
//     throw error;
//   }
// };

// export const deleteBook = async (bookId: number): Promise<void> => {
//   try {
//     const response = await fetch(`${API_URL}/DeleteBook/${bookId}?`, {
//       method: 'DELETE',
//     });

//     if (!response.ok) {
//       throw new Error('Failed to delete book');
//     }
//   } catch (error) {
//     console.error('Error deleting book:', error);
//     throw error;
//   }
// };
