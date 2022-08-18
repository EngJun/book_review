"use strict";
class Review {
    constructor(id, username, bookId, rating, datePosted, comment) {
        this.id = id;
        this.username = username;
        this.bookId = bookId;
        this.rating = rating;
        this.datePosted = datePosted;
        this.comment = comment;
    }
    //add the set and get methods here
    getId() {
        return this.id;
    }
    getUsername() {
        return this.username;
    }
    getBookId() {
        return this.bookId;
    }
    getRating() {
        return this.rating;
    }
    getDatePosted() {
        return this.datePosted;
    }
    getComment() {
        return this.comment;
    }
    setUsername(username) {
        this.username = username;
    }
    setBookId(bookId) {
        this.bookId = bookId;
    }
    setRating(rating) {
        this.rating = rating;
    }
    setDatePosted(datePosted) {
        this.datePosted = datePosted;
    }
    setComment(comment) {
        this.comment = comment;
    }
}
module.exports = Review;
