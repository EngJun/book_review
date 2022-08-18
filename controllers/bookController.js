"used strict";
const BooksDB = require('../models/BooksDB');


var booksDB = new BooksDB();

function getAllBooks(request, respond){
    booksDB.getAllBooks(function(error, result){
        if(error){
            respond.json(error);
        }
        else{
            respond.json(result);
        }
    });
}

module.exports = {getAllBooks};