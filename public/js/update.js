function updateMe(){
    var updateUser = new XMLHttpRequest();

    updateUser.open("PUT", "/updateProfile", true);
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
    alert("You have updated your profile");
    window.location.href = "index.html"
}
