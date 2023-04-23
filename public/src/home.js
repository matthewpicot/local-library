function getTotalBooksCount(books) {
// Returning the length of the books array  
  return books.length;
}

function getTotalAccountsCount(accounts) {
// Returning the length of the accounts array
  return accounts.length;
}

function getBooksBorrowedCount(books) {
/* Using the reduce method to iterate over the books array and accumulate the total number of books that are currently borrowed*/
  return books.reduce((total, book) => {
/* Checking if the first item in the borrows array of the current book has not been returned*/
    if (!book.borrows[0].returned) {
// Incrementing the total counter if the book has not been returned
      total++;
    }
/* Returning the total counter to be used in the next iteration of the reduce function*/
    return total;
// Initial value for the total counter
  }, 0); 
}

function getMostCommonGenres(books) {
/* Using the reduce method to create an object where each key is a genre name and each value is an object with a name property set to the genre name and a count property initialized to 0*/
  const arr = Object.values(books.reduce((acc, {genre}) => {
    acc[genre] = acc[genre] || {name: genre, count: 0};
    acc[genre].count++;
    return acc;
  }, {}))
/* Sorting the resulting array of genre objects by the count property in descending order*/
  .sort((a, b) => b.count - a.count)
/* Returning a subarray containing the first 5 elements of the sorted array*/
  .slice(0, 5);
// Returning the resulting array of the top 5 most common genres
  return arr;
}

function getMostPopularBooks(books, count=5) {
// Oganise book data
    const borrows = books.map(book=>({name:book.title, count:book.borrows.length}));
// Sort by borrow count, descending
    borrows.sort((a,b) => b.count - a.count);
// Return top number
    return borrows.slice(0,count);
}

function getMostPopularAuthors(books, authors) {
/* Using the reduce method to create an object where each key is an author name and each value is an object with a name property set to the author name and a count property initialized to 0*/
  return Object.values(
    books.reduce((acc, {authorId, borrows}) => {
/* Finding the author object in the authors array with a matching id property and extracting the first and last name properties*/
      const {name: {first, last}} = authors.find(author => author.id === authorId);
/* Combining the first and last name properties into a full name string*/
      const name = `${first} ${last}`;
// Setting the count property to the number of borrows for the book
      const count = borrows.length;
/* Updating the count property for the author in the accumulator object, or adding a new author with a count property initialized to the number of borrows*/
      if (acc[name]) {
        acc[name].count += count;
      } else {
        acc[name] = {name, count};
      }
      return acc;
    }, {})
  )
/* Sorting the resulting array of author objects by the count property in descending order*/
  .sort((a, b) => b.count - a.count)
/* Returning a subarray containing the first 5 elements of the sorted array*/
  .slice(0, 5);
}


module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
