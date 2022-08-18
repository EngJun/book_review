function loginMe(){
    var loginUser = new XMLHttpRequest();
    loginUser.open("POST","http://127.0.0.1:8080/login", true);
    loginUser.setRequestHeader("Content-Type", "application/json");
    loginUser.onload=function(){
        var token = JSON.parse(loginUser.responseText);
        var username = document.getElementById("usernameLogin").value;
        console.log(username);
        console.log(token.result);
        if (token.result != false){
            document.getElementById("registerMenu").style.display="none";
            document.getElementById("loginMenu").style.display="none";
            document.getElementById("logoutMenu").style.display="block";
            document.getElementById("updateMenu").style.display="block";
            alert("Logged In")
            sessionStorage.setItem("token",token.result);
            sessionStorage.setItem("token2", username);
        }else{
            alert("Invalid")
        }
    }

    var password = document.getElementById("passwordLogin").value;
    var username = document.getElementById("usernameLogin").value;
    var payload = {password:password, username:username}
    loginUser.send(JSON.stringify(payload));
}