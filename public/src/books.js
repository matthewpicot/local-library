function findAuthorById(authors, id) {
/* Find the author object in the authors array that matches the given id*/
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
/* Find the author object in the book array that matches the given id*/
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
/* Using destructuring assignment to extract borrowed and returned properties from the result of the reduce function*/
  const {borrowed, returned} = books.reduce((account, book) => {
/* Using ternary operator to check if the first item in the borrows`array of the current book is returned*/
    book.borrows[0].returned ? account.returned.push(book) : account.borrowed.push(book);
/* Returning the account object to be used in the next iteration of the reduce function*/
    return account;
// Initial value for the account object  
  }, {borrowed: [], returned: []}); 
/* Returning an array containing the `borrowed` and `returned` arrays*/
  return [borrowed, returned];
}

function getBorrowersForBook(book, accounts) {
// Extracting the borrows array from the book object
  const borrows = book.borrows;
/*Creating a new array of borrower objects using the map method to iterate over the borrows array*/
  const borrowers = borrows.map(borrow => {
/* Finding the account object that matches the borrower's ID using the filter method and extracting the first element of the resulting array*/
    const borrowerAccount = accounts.filter(account => account.id === borrow.id)[0];
/* Adding a returned property to the borrower account object to indicate whether the book has been returned*/
    borrowerAccount.returned = borrow.returned;
// Returning the borrower account object
    return borrowerAccount;
  });
/* Returning a subarray containing the first 10 elements of the borrowers array*/
  return borrowers.slice(0, 10);
}


module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
