function getBookData() {
	var request = new XMLHttpRequest();
	request.open('GET', book_url, true);
	//This function will be called when data returns from the web api    
	request.onload = function () {
		//get all the movies records into our movie array        
		book_array = JSON.parse(request.responseText);
		//Fetch the comments as well        
		//fetchComments();
		console.log(book_array) // output to console        
		displayAllBooks();
	};

	//This command starts the calling of the movies web api    
	request.send();
}

function getInfoData() {
	var request = new XMLHttpRequest();
	request.open('GET', book_url, true);
	//This function will be called when data returns from the web api    
	request.onload = function () {
		//get all the movies records into our movie array        
		book_array = JSON.parse(request.responseText);
		//Fetch the comments as well        
		fetchReviews();
		console.log(book_array) // output to console
		getBookDetails()
	};

	//This command starts the calling of the movies web api    
	request.send();
}

function displayAllBooks() {
	var table = document.getElementById("booksTable");
	var bookCount = 0;
	var message = "";

	table.innerHTML = "";
	totalBooks = book_array.length;
	for (var count = 0; count < totalBooks; count++) {
		if (book_array[count].category != "") {
			var cover = book_array[count].cover;
			var name = book_array[count].name;
			var cell = '<div class="card col-md-3" ><img class="card-img-top" src="' + cover + '" alt="Card image cap">\
                        <h4 style="padding-left:30px;cursor:pointer" data-toggle="modal" data-target="#" class="card-title" item="' + count + '" onclick="count1('+ count + ')">' + name + '</h4></div>\
</div>'
			table.insertAdjacentHTML('beforeend', cell);
			bookCount++;
		}
	}

	message = bookCount + " Books";
	document.getElementById("summary").textContent = message;
	document.getElementById("parent").textContent = "";
}

function displayBooks(category) {
	var table = document.getElementById("booksTable");
	var bookCount = 0;
	var message = "";

	table.innerHTML = "";
	totalBooks = book_array.length;
	for (var count = 0; count < totalBooks; count++) {
		if (book_array[count].category == category) {
			var cover = book_array[count].cover;
			var name = book_array[count].name;
			var cell = '<div class="card col-md-3" ><img class="card-img-top" src="' + cover + '" alt="Card image cap">\
						<h4 style="padding-left:30px;cursor:pointer" data-toggle="modal" data-target="#" class="card-title" item="' + count + '" onclick="count1('+ count + ')">' + name + '</h4></div>\
</div>'
			table.insertAdjacentHTML('beforeend', cell);
			bookCount++;
		}
	}

	message = bookCount + " " + category + " Books";
	document.getElementById("summary").textContent = message;
	document.getElementById("parent").textContent = "";
}

function listActionBooks() {
    category = "Action";
    displayBooks(category);
}

function listRomanceBooks() {
    category = "Romance";
    displayBooks(category);
}

function listStoryBooks() {
    category = "Story";
    displayBooks(category);
}

function listNovelBooks() {
    category = "Novel";
    displayBooks(category);
}

function count1(count){
	window.location.href = "details.html"
	sessionStorage.setItem("index",count);
}

function getBookDetails() {
    var bookName = book_array[sessionStorage.getItem("index")].name;
	document.getElementById("bookName").textContent = bookName;
	document.getElementById("bookDesc").textContent = book_array[sessionStorage.getItem("index")].description;
	document.getElementById("bookPublish").textContent = book_array[sessionStorage.getItem("index")].publish;
    document.getElementById("bookCover").src = book_array[sessionStorage.getItem("index")].cover;
    document.getElementById("bookCategory").textContent = book_array[sessionStorage.getItem("index")].category;
}