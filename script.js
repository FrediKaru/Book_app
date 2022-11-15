const controlPanel = document.querySelector('.controlPanel');
const books = document.querySelector('.books');
const app = document.querySelector('.app');
const modal = document.querySelector('.modal');
const span = document.querySelector('.close');
const addBookForm = document.querySelector('.add-book-form')

window.addEventListener("click", (e) => {
    if(e.target == modal) {
        modal.style.display = "none";
    }
})

span.addEventListener('click', () => {
    modal.style.display = "none";
})
let myLibrary = [];
function addLocalStorage() {
   myLibrary = JSON.parse(localStorage.getItem("library")) || [];
    renderBooks();
    
}

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = Math.floor(Math.random() * 10000000);
}
function addBookToLibrary(title, author, pages, read){
    myLibrary.push(new Book(title, author, pages, read))
    saveAndRenderBooks();
}

/// Submit book info from form element and add into array.
addBookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const data= new FormData(e.target)
    let newBook = {}
    for(let [name, value] of data) {
        if(name === 'book-read') {
            newBook["book-read"] = true;
        } else {
            newBook[name] = value; "" 
        }
    }
    if(!newBook['book-read']){
        newBook['book-read'] = false
    }
    addBookToLibrary(newBook['book-title'],newBook['book-author'],newBook['book-pages'],newBook['book-read'])
});

function createBookElement(el, content, className){
    const element = document.createElement(el);
    element.textContent = content;
    element.setAttribute("class", className);
    return element;
}
function createReadElement(bookItem, book){
    const read = document.createElement('div');
    read.setAttribute('class', 'book-read');
    read.appendChild(createBookElement("h1", "Read?", "book-read-title"));
    const input = document.createElement('input')
    input.type = "checkbox";
    input.addEventListener('click', (e) => {
        if (e.target.checked){
            bookItem.setAttribute("class", "card book read-checked");
            book.read = true;
            renderBooks();
        } else {
            bookItem.setAttribute("class", "card book read-unchecked");
            book.read = false;
            renderBooks();
        }
        
    });
    if(book.read) {
        input.checked = true;
        bookItem.setAttribute("class", "card book read-checked");
    }
    read.appendChild(input);
        return read;
}

function deleteBook(index) {
    myLibrary.splice(index, 1);
    renderBooks();
}
function creatBookItem(book, index){
    const bookItem = document.createElement("div");
    bookItem.setAttribute("id", index);
    bookItem.setAttribute("key", index);
    bookItem.setAttribute("class", "card book");
    bookItem.appendChild(
        createBookElement("h1", `Title: ${book.title}`, "book-title")
    );
    bookItem.appendChild(
        createBookElement("h1", `Author: ${book.author}`, "book-author")
    );
    bookItem.appendChild(
        createBookElement("h1", `Pages: ${book.pages}`, "book-pages")
    );
    bookItem.appendChild(createReadElement(bookItem, book));
    bookItem.appendChild(createBookElement("button", "X", "delete"));
    books.insertAdjacentElement('afterbegin', bookItem);

    bookItem.querySelector('.delete').addEventListener('click', () => {
        deleteBook(index);
    })
}


function createEditIcon(book) {

}
function createIcons() {
    const div = createBookElement('div', null, "icons");
    const icon1 = document.createElement('img');
    icon1.src = '/icons/pencil.svg'
}
function renderBooks(){
    books.textContent = "";
    myLibrary.map((book, index) => {
        creatBookItem(book, index);
    });
}
function saveAndRenderBooks() {
    localStorage.setItem("library", JSON.stringify(myLibrary));
    renderBooks();
  }
function openModal(){
    modal.style.display = 'block';
    return;
}
function addButton() {
    const addButton = createBookElement("button", "Add", "addBtn");
    addButton.addEventListener('click', () => {
        openModal();
    })
    return controlPanel.append(addButton);
}
function searchButton() {
    const searchButton = createBookElement("input", "Search", "searchBtn");
    searchButton.setAttribute("placeholder", "Search books...")
    return controlPanel.append(searchButton);
}

searchButton();
addButton();
addLocalStorage()