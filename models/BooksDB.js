"use strict";

var db = require('../db-connections');
class BooksDB{
    getAllBooks(callback){
        var sql = "SELECT * FROM book_review.book";
        db.query(sql, callback);
    }
}

module.exports = BooksDB;