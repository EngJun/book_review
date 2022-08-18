"use strict";

var db = require('../db-connections');
class ProfilesDB{
    getAllProfiles(callback){
        var sql = "SELECT * from book_review.profile";
        db.query(sql, callback);
    }

    getProfile(username, callback){
        var sql = "SELECT distinct username, name, email, password FROM book_review.profile WHERE username = ?";
        db.query(sql, [username], callback);
    }

    addProfile(username, name, email, password, callback){
        var sql = "INSERT INTO book_review.profile (username, name, email, password) VALUES (?, ?, ?, ?)";
        db.query(sql, [username, name, email, password], callback);
    }

    updateProfile(username, name, email, password, callback){
        var sql = "UPDATE book_review.profile SET name = ?, email = ?, password = ? WHERE username = ?";
        return db.query(sql, [name, email, password, username], callback)
    }

    loginProfile(username, callback){
        var sql = "SELECT password FROM book_review.profile WHERE username = ?";
        db.query(sql, [username], callback);
    }
}

module.exports = ProfilesDB;