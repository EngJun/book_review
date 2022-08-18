$(document).ready(function () {

    var loadProfile = new XMLHttpRequest();
    token = sessionStorage.getItem("token");

    loadProfile.open("POST", "http://localhost:8080/user", true);
    loadProfile.setRequestHeader("Content-Type", "application/json");
    loadProfile.onload=function (){
        var profile = JSON.parse(loadProfile.responseText);
        console.log(loadProfile.responseText);
        name = profile[0].name;
        email = profile[0].email;
        password = profile[0].password;
        username = profile[0].username;
        document.getElementById("profile_username").value=username;
        document.getElementById("password").value=password;
        document.getElementById("name").value=name;
        document.getElementById("email").value=email;
    }

    var payload = {token : token};
    loadProfile.send(JSON.stringify(payload));

})