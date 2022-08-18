var mysql = require("mysql");
var connection = mysql.createConnection({
    host:'projectdatabase.cqfpkqfsbguf.us-east-1.rds.amazonaws.com',
    port:'3306',
    user:'admin',
    password:'ProjectPassword',
    database:'book_review'
});

connection.connect(err => {
    if (err) throw err;
    console.log('Connected To AWS DB');
});
module.exports = connection;
