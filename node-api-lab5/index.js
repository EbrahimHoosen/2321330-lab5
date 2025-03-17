const express = require('express');
const app = express ();
app.use(express.json());


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
  });
let books =[];
//response.send(status)

app.get("/whoami", (request, response) => {
   const status = {
      "studentNumber": "2321330"
   };
   
   response.send(status);

});
app.get("/books", (req, res) => {
    res.json(books);
});

app.post("/books", (req, res) => {
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({ message: "you did not give a title" });
    }

    const newBook = {
        id: (books.length + 1).toString(),
        title,
        details: [] 
    };

    books.push(newBook);
    res.status(201).json(newBook);
});

  app.put("/books/:id", (req, res) => {
    const book = books.find(b => b.id === req.params.id);
    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }

    const { title } = req.body;
    if (title) {
        book.title = title;
    }

    res.json(book);
});

  app.post('/books/:id/details', (req, res) => {
    const { id } = req.params;
    const { author, genre, publicationYear } = req.body;
  
    const book = books.find(book => book.id === id);
  
    if (!book) {
      return res.status(404).json({ message: "Book not found" });//book doesnt exist
    }
  
    const detail = {
      id: (book.details.length + 1).toString(),
      author,
      genre,
      publicationYear
    };
  
    book.details.push(detail);
    res.status(201).json(detail);
  });
  app.delete("/books/:id", (req, res) => {
    const bookIndex = books.findIndex(b => b.id === req.params.id);
    if (bookIndex === -1) {
        return res.status(404).json({ message: "Book not found" });
    }

    books.splice(bookIndex, 1);
    res.status(204).end();
});

  app.get('/books/:id', (req, res) => {
    const { id } = req.params;
  
    const book = books.find(book => book.id === id);
  
    if (!book) {
      return res.status(404).json({ message: "Book not found" });//book dne
    }
  
    res.json(book);
  });
  app.post("/books/:id/details", (req, res) => {
    const book = books.find(b => b.id === req.params.id);
    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }

    const { author, genre, publicationYear } = req.body;
    if (!author || !genre || !publicationYear) {
        return res.status(400).json({ message: "Missing details" });
    }

    const newDetail = {
        id: (book.details.length + 1).toString(),
        author,
        genre,
        publicationYear
    };

    book.details.push(newDetail);
    res.status(201).json(newDetail);
});
app.delete("/books/:id/details/:detailId", (req, res) => {
    const book = books.find(b => b.id === req.params.id);
    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }

    const detailIndex = book.details.findIndex(d => d.id === req.params.detailId);
    if (detailIndex === -1) {
        return res.status(404).json({ message: "Detail not found" });
    }

    book.details.splice(detailIndex, 1);
    res.status(204).end();
});


