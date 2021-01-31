'use strict';

// book objects stored in myLibrary
let myLibrary = [
    { 
    title: "The Hobbit", 
    author: "J.R.R. Tolkien", 
    pages: 473,
    status: "Reading List",
    notes: "Here are some notes", 

    },
    { 
    title: "1984", 
    author: "George Orwell", 
    pages: 328, 
    status: "Still Reading",
    notes: null,

    }
];

// Book constructor function
function Book(title, author, pages, status, notes) {
    this.title = title
    this.author = author
    this.pages = pages
    this.status = status
    this.notes = notes
    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.status}`
    }
};

// Display books within myLibrary on cards, plus card buttons and logic
function displayBooks () {
    document.querySelector('.books').innerHTML = '';
    // if localstorage of myLibrary exists, use for persistance
    if (localStorage.myLibrary) {
        myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
    }
    myLibrary.forEach(function (book, i) {
        //this function also gives each book/card a unique ID, to be used when deleting/editing and re-ordering
        book.id = `${i}`;

        // creating a new div to represent each card within myLibrary
        let div = document.createElement('div');
        div.setAttribute('class', 'col l4 m6 s12');
        div.innerHTML = `
            <div class="card small z-depth-3">
                <div class="card-content">
                    <span class="card-title">${book.title}</span>
                    <br>
                    <p class="author">By: ${book.author}</p>
                    <p class="pages">Number of Pages: ${book.pages}</p>
                    <p class="status">Status: ${book.status}</p>
                    <a href="#modal4" class="btn-flat editNotes modal-trigger purple-text" data-id="${book.id}">Notes</a>
                    
                </div>
                <div class="card-action">
                    <a href="#modal3" class="btn-flat modal-trigger editBtn purple-text" data-id="${book.id}">Status</a>
                    <a href="#modal2" class="btn-flat modal-trigger deleteBtn purple-text" data-id="${book.id}">Delete</a>
                </div>
            </div>`
        document.querySelector('.books').appendChild(div);
    })
    
    // re-init the delete, status, and notes buttons each time a deletion or addition is made to ensure they have the right book id according to index
    modalBtns();
}

// display the books when loaded
displayBooks();


// adds event listeners to the modal buttons edit delete and notes, then sets activeID to the index of the book in which edit or delete was pushed to be used with other functions. editBtn populates the modal form to edit the current book. 
let activeID = '';
function modalBtns() {
    const deleteBtn = document.querySelectorAll('.deleteBtn');
    deleteBtn.forEach(function(btn) {
        btn.addEventListener('click', function() {
            activeID = parseInt(btn.getAttribute('data-id'));
        })
    })
    const editBtn = document.querySelectorAll('.editBtn');
    editBtn.forEach(function(btn) {
        btn.addEventListener('click', function() {
            activeID = parseInt(btn.getAttribute('data-id'));
        })
    })
    const noteBtn = document.querySelectorAll('.editNotes');
    noteBtn.forEach(function(btn) {
        btn.addEventListener('click', function() {
            activeID = parseInt(btn.getAttribute('data-id'));
            let bookObject = myLibrary[activeID];
            document.getElementById('notes-text').value = bookObject.notes;
            M.updateTextFields();
        })
    })
}

// add event listener to submit button on Edit Status modal to change book object value for status
let editRead = document.querySelector('#edit-read');
const editStatus = document.querySelector('.editSubmitBtn');
editStatus.addEventListener('click', function() {
    let book = myLibrary[activeID];
    book.status = editRead.value;
    storeData();
    displayBooks();
    editRead.value = '';
    M.FormSelect.init(document.querySelectorAll('select'))
})

// When Delete is clicked, a modal pops up asking to confirm if we'd like to delete. We add an event listener to the modal's delete button, which removes the book from myLibrary and runs displayBooks() to remove book from DOM as well
const deleteBook = document.querySelector('.deleteBook');
deleteBook.addEventListener('click', function() {
    console.log(activeID)
    myLibrary.splice(activeID, 1);
    storeData();
    displayBooks();
})

// submit notes modal
let notesText = document.querySelector('#notes-text');
const editNotes = document.querySelector('.notesSubmitBtn');
editNotes.addEventListener('click', function() {
    let book = myLibrary[activeID];
    book.notes = notesText.value;
    storeData();
    displayBooks();
    M.updateTextFields();
})

// Adding new book 
// event listener for submit form button
const submitBtn = document.querySelector('.submitBtn');
submitBtn.addEventListener('click', checkForm);

// form fields
const title = document.querySelector('#form-title');
const author = document.querySelector('#form-author');
const pages = document.querySelector('#form-pages');
const read = document.querySelector('#form-read');
const notes = document.querySelector('#form-notes');

// this function will check if the add book form is complete, then submit the form
function checkForm() {
    if (title.value && author.value && pages.value) {
        // submit form and close modal and reset
        addBook();
        M.Modal.getInstance(document.getElementById('modal1')).close();
        resetForm();
        storeData();
        displayBooks();

    } else if (!title.value) {
        title.classList.add('invalid');
    } else if (!author.value) {
        author.classList.add('invalid');
    } else if (!pages.value) {
        pages.classList.add('invalid');
    } 

}
// function resets the fields in the form
function resetForm() {
    title.value = '';
    title.classList.remove('valid');
    author.value = '';
    author.classList.remove('valid');
    pages.value = '';
    pages.classList.remove('valid');
    notes.value = '';
    notes.classList.remove('valid');
    read.value = '';
    
}

// function creates new book object and pushes to myLibrary
function addBook() {
    let newBook = new Book(title.value, author.value, pages.value, read.value, notes.value)
    myLibrary.push(newBook);
}


// init Materialize components on load
document.addEventListener('DOMContentLoaded', function () {
    // modal 1 is add a book modal/form, modal 2 is delete a book, modal 3 is edit a book, select is dropdown in form, floatBtn is the floating add book button
    const elem1 = document.getElementById('modal1');
    const elem2 = document.getElementById('modal2');
    const elem3 = document.getElementById('modal3');
    const elem4 = document.getElementById('modal4');
    const elem5 = document.querySelectorAll('select');
    const elem6 = document.querySelectorAll('.fixed-action-btn');
    const options = {
        dismissible: false
    }
    const modal1 = M.Modal.init(elem1, options);
    const modal2 = M.Modal.init(elem2, options);
    const modal3 = M.Modal.init(elem3, options);
    const modal4 = M.Modal.init(elem4, options);
    const dropdown = M.FormSelect.init(elem5);
    const floatBtn = M.FloatingActionButton.init(elem6);
});

// localstorage 
function storeData() {
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}
