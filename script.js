//Book class to create new books to add to library
class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    info() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
    }

    toggleRead() {
        this.read = !this.read;
    }

    createElements() {

        let div = document.createElement("div");
        let title = document.createElement("h2");
        let author = document.createElement("p");
        let pages = document.createElement("p");
        let readColumn = document.createElement("p");
        let buttonDiv = document.createElement("div");
        let readIcon = document.createElement("button");
        let delIcon = document.createElement("button");

        readIcon.classList.add("readButton");
        delIcon.classList.add("delButton");

        readIcon.id = library.indexOf(this);
        delIcon.id = library.indexOf(this);

        title.textContent = this.title;
        author.textContent = this.author;
        pages.textContent = this.pages;

        if (this.pages > 1) {
            pages.textContent += " pages";
        } else {
            pages.textContent += " page";
        }
        
        div.classList.add("bookCard");    
        div.appendChild(title);
        div.appendChild(author);
        div.appendChild(pages);

        if (this.read) {
            readColumn.textContent = "read";
            readColumn.classList.add("readBook");
            readIcon.classList.add("toggled");
        } else {
            readColumn.textContent = '';
        }

        readColumn.id = library.indexOf(this);
        div.appendChild(readColumn);

        buttonDiv.appendChild(readIcon);
        buttonDiv.appendChild(delIcon);

        buttonDiv.classList.add("buttonDiv");
        div.appendChild(buttonDiv);
        libraryDisplay.appendChild(div);
    }
}

const libraryController = (function() {
    
    libraryDisplay = document.querySelector(".libraryDisplay");
    addBook = document.querySelector(".addBookButton");
    cancelButton = document.querySelector(".cancelButton");

    library = [];

    const addOverlay = () => {
        const overlay = document.createElement("div");
        overlay.classList.add("overlay");
        document.body.appendChild(overlay);
    }

    const removeOverlay = (e) => {
        e.preventDefault();
        const overlay = document.querySelector(".overlay");
        const popup = document.querySelector(".newBookPopup");
        popup.style.visibility = "hidden";
        document.body.removeChild(overlay);
    }

    const clearForm = () => {
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

    const checkBookValidity = () => {

        const bookTitle = document.querySelector("#bookTitle");
        const bookAuthor = document.querySelector("#bookAuthor");
        const bookPages = document.querySelector("#bookPages");

        if (bookTitle.checkValidity() && bookAuthor.checkValidity() && bookPages.checkValidity()) {
            return true;
        }

        return false;
    }

    const addNewBook = (e) => {
        
        e.preventDefault();
        addOverlay();

        saveButton = document.querySelector(".saveButton");

        popup = document.querySelector(".newBookPopup");
        popup.style.visibility = "visible";

        clearForm();

        cancelButton.addEventListener("click", removeOverlay);
        saveButton.addEventListener("click", saveBook);
    }

    //Empty the DOM when updating the library,
    //so that we don't get duplicates.
    const emptyDisplay = () => {
        while(libraryDisplay.childNodes.length > 2) {
            libraryDisplay.removeChild(libraryDisplay.lastChild);
        }
    }

    const updateLibrary = () => {

        //Empty the DOM when updating the library,
        //so that we don't get duplicates.
        emptyDisplay();

        for (book of library) {
            book.createElements();
        }
    }

    const saveBook = (e) => {

        if (!checkBookValidity()) {
            return;
        }

        const book = new Book(bookTitle.value, bookAuthor.value, bookPages.value, bookRead.checked);
        library.push(book);
        removeOverlay(e);
        updateLibrary();
    }

    const removeBook = (e) => {
        const book = e.target.id;
        library.splice(book, 1);
        updateLibrary();
    }

    const toggleRead = (e) => {
        
        e.preventDefault();
        const icon = e.target;
        
        const readColumn = e.target.parentNode.previousElementSibling;

        const book = library[icon.id];
        book.toggleRead();

        if (readColumn.classList.contains("readBook")) {
            readColumn.classList.remove("readBook");
            icon.classList.remove("toggled");
            readColumn.textContent = '';
        } else {
            readColumn.classList.add("readBook");
            icon.classList.add("toggled");
            readColumn.textContent = "read";
        }
        

    }

    // Populate the library with some default books.
    const addDefaultBooks = () => {

        const murakami = new Book("The Wind Up Bird Chronicle", "Haruki Murakami", 607, true);
        const trainspotting = new Book("Trainspotting", "Irvine Welsh", 344, false);
        const marabou = new Book("Marabou Stork Nightmares", "Irvine Welsh", 264, true);
        const pollen = new Book("Pollen", "Jeff Noon", 327, false);
        const gone = new Book("Gone Girl", "Gillian Flynn", 432, false);

        library.push(murakami);
        library.push(trainspotting);
        library.push(marabou);
        library.push(pollen);
        library.push(gone);
        
        updateLibrary();
    }
   
    //Event listeners for the library
    const libraryListeners = () => {

        const deleteButtons = document.querySelectorAll(".delButton");
        const readButtons = document.querySelectorAll(".readButton");
        
        //Event listener to delete book from library
        for (btn of deleteButtons) {
            btn.addEventListener("click", removeBook);
        }
        
        //Event listener to toggle read/unread
        for (btn of readButtons) {
            btn.addEventListener("click", toggleRead);
        }
        
        addBook.addEventListener("click", addNewBook);
    }

    addDefaultBooks();
    libraryListeners();

})();