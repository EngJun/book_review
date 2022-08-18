$(document).ready(function(){

    var token = sessionStorage.getItem("token");

    if (token != null){
        $('#registerMenu').hide();
        $('#loginMenu').hide();
        $('#logoutMenu').show();
        $('#updateMenu').show();
    }
})