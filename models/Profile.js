"use strict"

class Profile{
    constructor(username, name, email, password){
        this.user_id = username;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    getUsername(){
        return this.username;
    }
    getName(){
        return this.name;
    }
    getEmail(){
        return this.email;
    }
    getPassword(){
        return this.password;
    }

    setUsername(username){
        this.username = username;
    }
    setName(name){
        this.name = name;
    }
    setEmail(email){
        this.email = email;
    }
    setPassword(password){
        this.password = password;
    }
}

module.exports = Profile;
