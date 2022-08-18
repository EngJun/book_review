function registerMe(){
    var registerUser = new XMLHttpRequest();
    registerUser.open("POST","http://127.0.0.1:8080/addProfile", true);
    registerUser.setRequestHeader("Content-Type", "application/json");
    registerUser.onload=function(){
        console.log("ok");
    alert("Registered")
    }
    
    var username = document.getElementById("username").value;
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var payload = {username:username, name:name, email:email, password:password}
    registerUser.send(JSON.stringify(payload));
}