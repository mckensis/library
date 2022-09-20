let bookLibrary = [];
const pageLibrary = document.querySelector(".libraryDisplay");
const addBookButton = document.querySelector(".addBookButton");
const cancelButton = document.querySelector(".cancelButton");
const saveButton = document.querySelector(".saveButton");

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return `${title} by ${author}, ${pages} pages, ${read}`;
    }
}

addBookButton.addEventListener("click", addNewBook);
cancelButton.addEventListener("click", removeOverlay);
saveButton.addEventListener("click", saveBook);

function loadOverlay() {
    const overlay = document.createElement("div");
    overlay.classList.add("overlay");
    document.body.appendChild(overlay);
}

function removeOverlay(e) {
    e.preventDefault();
    const overlay = document.querySelector(".overlay");
    const popup = document.querySelector(".newBookPopup");
    popup.style.visibility = "hidden";
    document.body.removeChild(overlay);
}

function saveBook(e) {
    e.preventDefault();
    console.log("saved");
    removeOverlay(e);
}

function addNewBook(e) {
    e.preventDefault();
    const popup = document.querySelector(".newBookPopup");
    popup.style.visibility = "visible";
    loadOverlay();
}

for (let i = 0; i < 20; i++) {
    let book = new Book("The Lord of the Rings, The Fellowship of the Ring", "Aidan Mckenzie djejejej", 9003, true);
    bookLibrary.push(book);
}

let abook = new Book("anotha test", "adn", 666, false);
bookLibrary.push(abook);

for (const book of bookLibrary) {
    let div = document.createElement("div");
    let title = document.createElement("h2");
    let author = document.createElement("p");
    let pages = document.createElement("p");
    let read = document.createElement("p");
    
    title.textContent = book.title;
    author.textContent = book.author;
    pages.textContent = `${book.pages} pages`;
    div.classList.add("bookCard");    
    div.appendChild(title);
    div.appendChild(author);
    div.appendChild(pages);

    if (book.read) {
        read.textContent = "read";
        read.classList.add("readBook");
        div.appendChild(read);
    }

    pageLibrary.appendChild(div);
}