function loginMe(){
    var loginUser = new XMLHttpRequest();
    loginUser.open("POST",login_url, true);
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
            alert("Logged In");
            sendEmail();
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

function sendEmail(){
    var send = new XMLHttpRequest();

    send.open("POST", sns, true);
    send.setRequestHeader("Content-type", "application/json");
    var userr = document.getElementById("usernameLogin").value;
    var payload={"message": userr + " Just Logged In."};
    send.send(JSON.stringify(payload));
    console.log(payload)
    send.onload = function () {
        array2 = JSON.parse(send.responseText);
        console.log(array2);
    };


}
