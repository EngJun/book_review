var express = require("express"); //using the express web framework
const port = 3000;

var bookController = require('./controllers/bookController');
var reviewController = require('./controllers/reviewController');
var profileController = require('./controllers/profileController.js');

var app = express(); // set variable app to be an instance of express framework. From now on, app is the express

app.use(express.static("./public")); //static files are to be served from the public folder - for eg. html, images, css
app.use(express.json()); // json() is a method inbuilt in express to recognize the incoming Request Object from the web client as a JSON Object.
// In time to come we will need to accept new or edited comments from user

app.route('/books').get(bookController.getAllBooks);
app.route('/reviews').get(reviewController.getAllReviews);
app.route('/reviews').post(reviewController.addReview);
app.route('/reviews/:id').put(reviewController.updateReview);
app.route('/reviews/:id').delete(reviewController.deleteReview);
app.route('/user').post(profileController.getProfile);
app.route('/profiles').get(profileController.getAllProfiles);
app.route('/addProfile').post(profileController.addProfile);
app.route('/updateProfile').put(profileController.updateProfile);
app.route('/login').post(profileController.loginProfile);

app.listen(port, () => console.log("BookHaven listening on port ${port}!")); // start the nodejs to be listening for incoming request @ port 8080
//console.log("web server running @ http://127.0.0.1:8080"); // output to console 
