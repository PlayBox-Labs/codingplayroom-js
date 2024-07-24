import {getBooks as getBooks, getDetailedBooks, getBookById} from './openLibraryClient.js';
import dbClient from './dbClient2.js';
import express from 'express';

const app = express();

app.get('/v1/books', (req, res) => {
    var bookName = req.query.name;
    var bookLimit = req.query.limit;

    getBooks(bookName, bookLimit).then(response => {
        res.json(response);
    });
});

app.get('/v1/books/detailed', (req, res) => {
    var bookName = req.query.name;
    var bookLimit = req.query.limit;

    getDetailedBooks(bookName, bookLimit).then(response => {
        res.json(response);
    });
});

app.post('/v1/books', async (req, res) => {
    var bookName = req.query.name;
    var bookId = req.query.id;

    try{
        var book = await getBookById(bookName, bookId);
        console.log("Persisting book: " + JSON.stringify(book));
        await dbClient.insert("Book", JSON.stringify(book));
        res.json({status: "ok"});
    } catch (error) {
        return res.status(404).json({error: `Persisting error: ${error}`});
    }
});

app.get('/v1/books/stats', async (req, res) => {
    var bookName = req.query.name;

    var responseTemplate = (book, ratings, comments) => {
        return {
            "book": book,
            "ratings": ratings,
            "comments": comments
        }

    };

    try{
        var book = await dbClient.getBook("Book", bookName);
        console.log(book.id);
        console.log(book[0].id);
        var ratings = await dbClient.getTotalRatings("Rating", book[0].id)
        var comments = await dbClient.getComments("Comment", book[0].id);

        // var ratings = 5;

        var response = responseTemplate(book[0], ratings, comments);

        console.log("book retrieved: " + book);

        res.json(response);

        // await dbClient.insert("Book", JSON.stringify(book));
        // res.json({status: "ok"});
    } catch (error) {
        return res.status(404).json({error: `Persisting error: ${error}`});
    }
});

app.get('/private/status', (req, res) => {
    console.log(req.query.limit);
    res.json({status: "ok"});
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});