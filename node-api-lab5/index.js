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
    res.json(books);//return json array, could be empty
});

app.post("/books", (req, res) => {//this adds a new book
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({ message: "you did not give a title" });//require a title for the book
    }

    const newBook = {//the format of the new book
        id: (books.length + 1).toString(),
        title,
        details: [] 
    };

    books.push(newBook);//add new book to my books array
    res.status(201).json(newBook);
});

  app.put("/books/:id", (req, res) => {//this is to update an existing books information
    const book = books.find(b => b.id === req.params.id);
    if (!book) {
        return res.status(404).json({ message: "Book not found" });//book dne
    }

    const { title } = req.body;
    if (title) {
        book.title = title;
    }

    res.json(book);
});


  app.delete("/books/:id", (req, res) => {
    const bookIndex = books.findIndex(b => b.id === req.params.id);//find my book
    if (bookIndex === -1) {
        return res.status(404).json({ message: "Book not found" });
    }

    books.splice(bookIndex, 1);
    res.status(204).end();
});

  app.get('/books/:id', (req, res) => {//this gets details of a book
    const { id } = req.params;//get id value
  
    const book = books.find(book => book.id === id);//find my book w id no
  
    if (!book) {
      return res.status(404).json({ message: "Book not found" });//book dne
    }
  
    res.json(book);
  });
  app.post("/books/:id/details", (req, res) => {
    const book = books.find(b => b.id === req.params.id);//find my book
    if (!book) {
        return res.status(404).json({ message: "Book not found" });//my book doesnt exist
    }

    const { author, genre, publicationYear } = req.body;
    if (!author || !genre || !publicationYear) {
        return res.status(400).json({ message: "Missing details" });//basically if an entry was left empty
    }

    const newDetail = {
        id: (book.details.length + 1).toString(),//get book id from book array +1
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
        return res.status(404).json({ message: "book doesnt exist" });//book isnt found
    }

    const detailIndex = book.details.findIndex(d => d.id === req.params.detailId);
    if (detailIndex === -1) {
        return res.status(404).json({ message: "detail is not found" });
    }

    book.details.splice(detailIndex, 1);
    res.status(204).end();
});


