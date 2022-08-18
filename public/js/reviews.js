function fetchReviews() {
    var request = new XMLHttpRequest();

    request.open('GET', review_url, true);

    //This command starts the calling of the comments api
    request.onload = function () {
        //get all the comments records into our comments array
        review_array = JSON.parse(request.responseText);
        console.log(review_array);
    };

    request.send();
}

function showBookReviews() {
    document.getElementById("emptyReview").innerHTML = "No reviews yet. Create one now";
    document.getElementById("comment").textContent = "Comment for " + book_array[sessionStorage.getItem("index")].name;
    document.getElementById("reviewBody").textContent = "";

    for (var i = 0; i < review_array.length; i++) {
        if (review_array[i].bookIdFK === book_array[sessionStorage.getItem("index")]._id) {
            document.getElementById("emptyReview").innerHTML = "";
            selectedBookId = book_array[sessionStorage.getItem("index")]._id;
            star = "";
            var html = '<div class="text-center" style="width:100%;">                                                           \
                            <div class="card">                                                                                  \
                                <div class="card-body">                                                                         \
                                    <p class="card-text" id="rating' + i + '">' + review_array[i].comment + "</p>               \
                                    <small>by " + review_array[i].usernameFK + " @ " + review_array[i].datePosted + "</small>   \
                                </div>                                                                                          \
                            </div>                                                                                              \
                        </div>";
            document.getElementById("reviewBody").insertAdjacentHTML('beforeend', html);

            var star = "";
            for (var j = 0; j < review_array[i].rating; j++) {
                console.log(i);
                star += "<img src='images/popcorn.png' style='width:50px' />";
            }
            star += "<i class='far fa-trash-alt fa-2x edit' data-dismiss='modal' item='" + i + "' onClick='deleteReview(this)' ></i>";
            star += "<i class='far fa-edit fa-2x edit' data-toggle='modal' data-target='#editReviewModal' data-dismiss='modal' item='" + i + "' onClick='editReview(this)' ></i>";
            document.getElementById("rating" + i).insertAdjacentHTML('beforebegin', star + "<br/>");
        }
    }
}

function newReview() {
    var token = sessionStorage.getItem("token");
    if (token == null) {
        alert("Please login to write a review");
        window.location.href = "details.html"
    } else {
        rating = 0;
        document.getElementById("userReviews").value - "";
        document.getElementById("nickname").value = sessionStorage.getItem("token2");
    }
}

function addReview() {
    var review = new Object();
    review.username = document.getElementById("nickname").value; // Value from HTML input text
    review.bookId = book_array[sessionStorage.getItem("index")]._id; // Movie ID is required by server to create new comment 
    review.rating = rating;
    review.datePosted = null;
    review.comment = document.getElementById("userReviews").value; // Value from HTML input text

    var postReview = new XMLHttpRequest(); // new HttpRequest instance to send comment

    postReview.open("POST", review_url, true); //Use the HTTP POST method to send data to server

    postReview.setRequestHeader("Content-Type", "application/json");
    postReview.onload = function () {
        console.log("new review sent");
        fetchReviews(); // fetch all comments again so that the web page can have updated comments.     
    };
    // Convert the data in Comment object to JSON format before sending to the server.
    postReview.send(JSON.stringify(review));
}

function rateIt(element) {
    var num = element.getAttribute("value");
    var classname = element.getAttribute("class");
    var popcorns = document.getElementsByClassName(classname);
    var classTarget = "." + classname;

    // This is another way of writing 'for' loop, which initialises the 
    // popcorn images to use black and white.
    for (let popcorn of popcorns) {
        popcorn.setAttribute("src", popcornBWImage);
    }
    changePopcornImage(num, classTarget);
}

function changePopcornImage(num, classTarget) {
    switch (eval(num)) {
        case 1:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", popcornImage);
            rating = 1;
            break;
        case 2:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", popcornImage);
            document.querySelector(classTarget + "[value='2']").setAttribute("src", popcornImage);
            rating = 2;
            break;
        case 3:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", popcornImage);
            document.querySelector(classTarget + "[value='2']").setAttribute("src", popcornImage);
            document.querySelector(classTarget + "[value='3']").setAttribute("src", popcornImage);
            rating = 3;
            break;
        case 4:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", popcornImage);
            document.querySelector(classTarget + "[value='2']").setAttribute("src", popcornImage);
            document.querySelector(classTarget + "[value='3']").setAttribute("src", popcornImage);
            document.querySelector(classTarget + "[value='4']").setAttribute("src", popcornImage);
            rating = 4;
            break;
        case 5:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", popcornImage);
            document.querySelector(classTarget + "[value='2']").setAttribute("src", popcornImage);
            document.querySelector(classTarget + "[value='3']").setAttribute("src", popcornImage);
            document.querySelector(classTarget + "[value='4']").setAttribute("src", popcornImage);
            document.querySelector(classTarget + "[value='5']").setAttribute("src", popcornImage);
            rating = 5;
            break;
    }
}

function editReview() {
    var token = sessionStorage.getItem("token");
    if ((token == null)) {
        alert("Please login to edit comments")
        window.location.href = "details.html"
    } else {
        if (review_array[sessionStorage.getItem("index")].usernameFK == sessionStorage.getItem("token2")) {
            document.getElementById("editnickname").value = review_array[sessionStorage.getItem("index")].usernameFK;
            document.getElementById("edituserReviews").value = review_array[sessionStorage.getItem("index")].comment;
            console.log(review_array[sessionStorage.getItem("index")].rating);
            displayColorPopcorn('editpop', review_array[sessionStorage.getItem("index")].rating);
            console.log(true);
        } else {
            alert("You can only edit your own comments");
            window.location.href = "details.html"
        }
    }
}

function displayColorPopcorn(classname, num) {
    var pop = document.getElementsByClassName(classname);
    var classTarget = "." + classname;
    for (let p of pop) {
        p.setAttribute("src", popcornBWImage);
    }
    changePopcornImage(num, classTarget);
}

function updateReview() {
    var response = confirm("Are you sure you want to update this review?");
    if (response == true) {
        var edit_review_url = review_url + "/" + review_array[sessionStorage.getItem("index")]._id;
        var updateReview = new XMLHttpRequest(); // new HttpRequest instance to send request to server
        updateReview.open("PUT", edit_review_url, true); //The HTTP method called 'PUT' is used here as we are updating data
        updateReview.setRequestHeader("Content-Type", "application/json");
        review_array[sessionStorage.getItem("index")].comment = document.getElementById("edituserReviews").value;
        review_array[sessionStorage.getItem("index")].username = document.getElementById("editnickname").value;
        review_array[sessionStorage.getItem("index")].rating = rating;
        updateReview.onload = function () {
            fetchReviews();
        };
        updateReview.send(JSON.stringify(review_array[sessionStorage.getItem("index")]));
    }
}

function deleteReview() {
    var token = sessionStorage.getItem("token");
    if (token == null) {
        alert("Please login to delete review");
        window.location.href = "details.html"
    } else {
        if (review_array[sessionStorage.getItem("index")].usernameFK == sessionStorage.getItem("token2")) {
            var response = confirm("Are you sure you want to delete this comment?");

            if (response == true) {
                var delete_review_url = review_url + "/" + review_array[sessionStorage.getItem("index")]._id;
                var eraseReview = new XMLHttpRequest();
                eraseReview.open("DELETE", delete_review_url, true);
                eraseReview.onload = function () {
                    fetchReviews();
                };
                eraseReview.send();
            }
        } else {
            alert("You can only delete your own reviews")
        }
    }
}