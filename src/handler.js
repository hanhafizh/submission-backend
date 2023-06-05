const { nanoid } = require("nanoid");
const data = require("./books");

//ADDBOOK
const addBook = (req, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.payload;
  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const finished = pageCount === readPage;
  const updatedAt = insertedAt;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  if (name === undefined) {
    const response = h.response({
      status: "fail",
      message: "Gagal menambahkan buku. Mohon isi nama buku",
    });
    response.code(400);
    return response;
  } else if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message:
        "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(400);
    return response;
  }

  data.push(newBook);

  const response = h.response({
    status: "success",
    message: "Buku berhasil ditambahkan",
    data: {
      bookId: id,
    },
  });
  response.code(201);
  return response;
};

// GET BOOKS
const getAllBooks = () => ({
  status: "success",
  books: {
    data: data.map(({ id, name, publisher }) => ({ id, name, publisher })),
  },
});

// GET BOOKS BY ID
const getBookByIdHandler = (request, h) => {
  const { bookId } = request.params;
  const book = data.filter((n) => n.id === bookId)[0];
  if (book !== undefined) {
    return {
      status: "success",
      data: {
        data,
      },
    };
  }
  const response = h.response({
    status: "fail",
    message: "Buku tidak ditemukan",
  });
  response.code(404);
  return response;
};
module.exports = {
  addBook,
  getAllBooks,
  getBookByIdHandler,
};
