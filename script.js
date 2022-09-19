let bookLibrary = [];
const pageLibrary = document.querySelector(".mainLibrary");
const addBookButton = document.querySelector(".addBook");

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return `${title} by ${author}, ${pages} pages, ${read}`;
    }
}

addBookButton.addEventListener("click", newBook);

function newBook() {
    console.log("new book");
}

// example:
let theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, "not read yet");
let booky = new Book("test book", "test author", 666, "read");
bookLibrary.push(theHobbit);
bookLibrary.push(booky);


for (const book of bookLibrary) {
    let div = document.createElement("div");
    let title = document.createElement("h2");
    let author = document.createElement("p");
    let pages = document.createElement("p");
    let read = document.createElement("p");

    title.textContent = book.title;
    author.textContent = book.author;
    pages.textContent = book.pages;
    read.textContent = book.read;
    div.classList.add("book");
    div.appendChild(title);
    div.appendChild(author);
    div.appendChild(pages);
    div.appendChild(read);
    pageLibrary.appendChild(div);
}