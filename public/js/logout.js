function logoutMe(){
    $('#registerMenu').show();
    $('#loginMenu').show();
    $('#logoutMenu').hide();
    $('#updateMenu').hide();
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("token2");
    alert("Logged out");
}