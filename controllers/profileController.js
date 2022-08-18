"use strict";
const Profile = require('../models/Profile');
const ProfilesDB = require('../models/ProfilesDB');

var profilesDB = new ProfilesDB();
var jwt = require('jsonwebtoken');
const req = require('express/lib/request');
var secret = "Key"

function getAllProfiles(request, respond){
    profilesDB.getAllProfiles(function(error, result){
        if(error){
            respond.json(error);
        }
        else{
            respond.json(result);
        }
    });
}

function getProfile(request, respond){
    var token = request.body.token;
    try{
        var decoded = jwt.verify(token, secret);
        profilesDB.getProfile(decoded, function(error, result){
            if(error){
                respond.json(error);
            }else{
                respond.json(result);
            }
        })
    }catch(err){
        respond.json({result: "invalid token"});
    }
}

function addProfile(request, respond){
    var username = request.body.username;
    var name = request.body.name
    var email = request.body.email;
    var password = request.body.password;
    profilesDB.addProfile(username, name, email, password, function (error, result){
        if (error){
            respond.json(error);
        }else{
            respond.json(result);
        }
    })
}

function updateProfile(request, respond){
    var name = request.body.name
    var email = request.body.email;
    var password = request.body.password;
    var token = request.body.token;
    try{
        var decoded = jwt.verify(token, secret);
        profilesDB.updateProfile(decoded, name, email, password, function(error, result){
            if(error){
                respond.json(error);
            }else{
                respond.json(result);
            }
        });
    } catch (err) {
        respond.json({ result: "invalid token "})
    }
}

function loginProfile(request, respond){
    var username = request.body.username;
    var password = request.body.password;

    profilesDB.loginProfile(username, function (error, result){
        if(error){
            respond.json(error);
        }else{
            if (result.length > 0){
                const hash = result[0].password
                var flag = (password == hash);
                if (flag){
                    var token = jwt.sign(username, secret);
                    respond.json({result:token});

                }else{
                respond.json({result:false});
                }
            }else{
                respond.json({result:false})
            }
            
        }
    })
};

module.exports = {getAllProfiles, getProfile, addProfile, updateProfile, loginProfile};