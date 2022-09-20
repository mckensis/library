const libraryDisplay = document.querySelector(".libraryDisplay");
const addBookButton = document.querySelector(".addBookButton");
const cancelButton = document.querySelector(".cancelButton");
const saveButton = document.querySelector(".saveButton");

let bookLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return `${title} by ${author}, ${pages} pages, ${read}`;
    }
}

function addOverlay() {
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

function checkBookValidity() {

    const bookTitle = document.querySelector("#bookTitle");
    const bookAuthor = document.querySelector("#bookAuthor");
    const bookPages = document.querySelector("#bookPages");

    if (bookTitle.checkValidity() && bookAuthor.checkValidity() && bookPages.checkValidity()) {
        return true;
    }

    return false;
}

function saveBook(e) {

    if (!checkBookValidity()) {
        return;
    }

    const book = new Book(bookTitle.value, bookAuthor.value, bookPages.value, bookRead.checked);
    bookLibrary.push(book);
    removeOverlay(e);
    updateLibrary();
}

function clearForm() {
    const title = document.querySelector("#bookTitle");
    const author = document.querySelector("#bookAuthor");
    const pages = document.querySelector("#bookPages");
    const read = document.querySelector("#bookRead");

    title.value = '';
    author.value = '';
    pages.value = '';
    read.checked = false;

    title.focus();
}

function addNewBookButton(e) {
    
    e.preventDefault();
    addOverlay();

    const popup = document.querySelector(".newBookPopup");
    popup.style.visibility = "visible";

    clearForm();

    cancelButton.addEventListener("click", removeOverlay);
    saveButton.addEventListener("click", saveBook);
}

function removeBook(e) {
    const book = e.target.id;
    bookLibrary.splice(book, 1);
    updateLibrary();
}

function updateLibrary() {
    
    while(libraryDisplay.childNodes.length > 2) {
        libraryDisplay.removeChild(libraryDisplay.lastChild);
    }

    for (const book of bookLibrary) {
        let div = document.createElement("div");
        let title = document.createElement("h2");
        let author = document.createElement("p");
        let pages = document.createElement("p");
        let readP = document.createElement("p");
        let buttonDiv = document.createElement("div");
        let readIcon = document.createElement("button");
        let delIcon = document.createElement("button");
        
        readIcon.classList.add("readButton");
        delIcon.classList.add("delButton");

        readIcon.id = bookLibrary.indexOf(book);
        delIcon.id = bookLibrary.indexOf(book);

        title.textContent = book.title;
        author.textContent = book.author;
        pages.textContent = book.pages;

        if (book.pages > 1) {
            pages.textContent += " pages";
        } else {
            pages.textContent += " page";
        }
        div.classList.add("bookCard");    
        div.appendChild(title);
        div.appendChild(author);
        div.appendChild(pages);
        
        if (book.read) {
            readP.textContent = "read";
            readP.classList.add("readBook");
            readIcon.classList.add("toggled");
        }

        readP.id = bookLibrary.indexOf(book);
        div.appendChild(readP);

        buttonDiv.appendChild(readIcon);
        buttonDiv.appendChild(delIcon);

        buttonDiv.classList.add("buttonDiv");
        div.appendChild(buttonDiv);
        delIcon.addEventListener("click", removeBook);
        readIcon.addEventListener("click", toggleRead);
        libraryDisplay.appendChild(div);
    }
}

function toggleRead(e) {
    
    e.preventDefault();
    const icon = e.target;
    const read = e.target.parentNode.previousElementSibling;
    
    const book = bookLibrary[icon.id];
    
    if (read.classList.contains("readBook")) {
        book.read = false;
        read.classList.remove("readBook");
        icon.classList.remove("toggled");
        read.textContent = '';
    } else {
        book.read = true;
        read.classList.add("readBook");
        icon.classList.add("toggled");
        read.textContent = "read";
    }
}

// Populate the library with some default books.
function defaultBooks() {
    
    const murakami = new Book("The Wind Up Bird Chronicle", "Haruki Murakami", 607, true);
    const trainspotting = new Book("Trainspotting", "Irvine Welsh", 344, false);
    const marabou = new Book("Marabou Stork Nightmares", "Irvine Welsh", 264, true);
    const pollen = new Book("Pollen", "Jeff Noon", 327, false);
    const gone = new Book("Gone Girl", "Gillian Flynn", 432, false);

    bookLibrary.push(murakami);
    bookLibrary.push(trainspotting);
    bookLibrary.push(marabou);
    bookLibrary.push(pollen);
    bookLibrary.push(gone);

    updateLibrary();
}
defaultBooks();

addBookButton.addEventListener("click", addNewBookButton);