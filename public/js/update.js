function updateMe(){
    var updateUser = new XMLHttpRequest();

    updateUser.open("PUT", "http://127.0.0.1:8080/updateProfile", true);
    updateUser.setRequestHeader("Content-Type", "application/json");
    updateUser.onload = function(){
        console.log("great");
    }
    password = document.getElementById("password").value;
    name = document.getElementById("name").value;
    email = document.getElementById("email").value;
    $('#updateMenu').hide();
    var payload = {token:token, password:password, name:name, email:email};
    updateUser.send(JSON.stringify(payload));
    console.log(payload);
}