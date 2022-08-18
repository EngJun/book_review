"use strict"

var db = require('../db-connections');
class ReviewsDB{
    getAllReviews(callback){
        var sql = "SELECT * FROM book_review.reviews";
        db.query(sql, callback);
    }

    addReview(review, callback){
        var sql = "INSERT INTO reviews (usernameFK, bookIdFK, rating, datePosted, comment) VALUES (?, ?, ?, ?, ?)";
        db.query(sql, [review.getUsername(), review.getBookId(), review.getRating(), review.getDatePosted(), review.getComment()], callback);
    }

    updateReview(review, callback){
        var sql = "UPDATE reviews SET comment = ?, usernameFK = ?, rating = ?, datePosted = ? WHERE _id = ?";
        return db.query(sql, [review.getComment(), review.getUsername(), review.getRating(), review.getDatePosted(), review.getId()], callback);
    }

    deleteReview(reviewID, callback){
        var sql = "DELETE from reviews WHERE _id = ?";
        return db.query(sql, [reviewID], callback);
    }
}

module.exports = ReviewsDB;