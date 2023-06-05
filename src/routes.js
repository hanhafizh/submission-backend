const {
  addBook,
  getAllBooks,
  getBookByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
} = require("./handler");

const routes = [
  {
    method: "POST",
    path: "/books",
    handler: addBook,
  },
  {
    method: "GET",
    path: "/books",
    handler: getAllBooks,
  },
  {
    method: "GET",
    path: "/books/{id}",
    handler: getBookByIdHandler,
  },
  {
    method: "PUT",
    path: "/books/{id}",
    handler: editNoteByIdHandler,
  },
  {
    method: "DELETE",
    path: "/books/{id}",
    handler: deleteNoteByIdHandler,
  },
];

module.exports = routes;
