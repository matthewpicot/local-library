function findAccountById(accounts, id) {
/* The find method is used to search through the accounts array and return the account object that has an id property that matches the id parameter.*/
  return accounts.find(account => account.id === id);
}

function sortAccountsByLastName(accounts) {
/* The sort method is used to sort the accounts array based on the last name of each account holder.*/
  return accounts.sort((accountA, accountB) =>
    accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase() ? 1 : -1);
/* The toLowerCase method is used to ensure that the sorting is case-insensitive.*/
}

function getTotalNumberOfBorrows(account, books) {
/* The reduce method is used to iterate through the books array and tally up the total number of times that the specified account appears in the borrows array of each book.*/
  return books.reduce((count, book) => {
/* The borrows property of each book is assigned to a constant variable called borrows.*/
    const borrows = book.borrows;
/* The reduce method is used again to iterate through the borrows array and tally up the number of times that the specified account appears in it.*/
    const borrowCount = borrows.reduce((acc, borrow) => {
/* If the id property of the current borrow object matches the id property of the specified account, the acc variable is incremented by 1.*/
      if (borrow.id === account.id) {
        return acc + 1;
      }
/* Otherwise, the acc variable is returned without being incremented.*/
      return acc;
    }, 0);
    return count + borrowCount;
  }, 0);
}

function getBooksPossessedByAccount(account, books, authors) {
// Extract the account id from the account object
  const accountId = account.id;
/* Filter the books to get the ones that have been borrowed by the account and not returned*/
  const borrowedBooks = books.filter((book) => {
// Get the borrows array for this book
    const borrows = book.borrows;
// Get the most recent borrow for this book
    const lastBorrow = borrows[0];
/* Check if the most recent borrow is from the given account and has not been returned*/
    if (lastBorrow.id === accountId && !lastBorrow.returned) {
/* If the borrow meets the criteria, find the author object for the book*/
      const author = authors.find((author) => author.id === book.authorId);
// Add the author object to the book object
      book.author = author;
// Return true to include the book in the borrowedBooks array
      return true;
    }
/* If the borrow does not meet the criteria, return false to exclude the book from the borrowedBooks array*/
    return false;
  });
// Return the borrowedBooks array
  return borrowedBooks;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
