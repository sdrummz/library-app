'use strict';

// book objects stored in myLibrary
let myLibrary = [
    { 
    title: "The Hobbit", 
    author: "J.R.R. Tolkien", 
    pages: 473,
    notes: null, 
    status: "Reading List",
    },
    { 
    title: "The Lord of the Rings, Return of the King", 
    author: "J.R.R. Tolkien", 
    pages: 416, 
    notes: null,
    status: "Still Reading",
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
    myLibrary.forEach(function (book, i) {
        //this function also gives each book/card a unique ID, to be used when deleting/editing and re-ordering
        book.id = `${i}`;

        // creating a new div to create each card
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
                    
                </div>
                <div class="card-action">
                    <a class="btn-flat edit" data-id="${book.id}">Edit</a>
                    <a class="btn-flat deleteBtn" data-id="${book.id}">Delete</a>
                </div>
            </div>`
        document.querySelector('.books').appendChild(div);
    })
    // every update we also want to reset our delete buttons
    DeleteBook();
}

displayBooks();

// this button pops up a card that confirms user wants to delete, deletes the book object from myLibrary based on ID, and then re-display's remaining books within myLibrary
function DeleteBook() {
    var deleteBtns = document.querySelectorAll('.deleteBtn');
    deleteBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
        var id = btn.getAttribute('data-id');
        console.log(id);
        myLibrary.splice(id, 1);
        displayBooks();
    })
})
}
// var deleteBtns = document.querySelectorAll('.deleteBtn');
// deleteBtns.forEach(function(btn) {
//     btn.addEventListener('click', function() {
//         var id = btn.getAttribute('data-id');
//         console.log(id);
//         myLibrary.splice(id, 1);
//         displayBooks();
//     })
// })

// Modal form init and actions
document.addEventListener('DOMContentLoaded', function () {
    var elem = document.querySelector('.modal');
    const options = {
        dismissible: false
    }
    var instance = M.Modal.init(elem, options)

    // submit checks/function
    const button = document.querySelector('.submitBtn');
    button.addEventListener('click', checkForm);

    // this function will check if the form is complete, then submit the form
    function checkForm() {
        const title = document.querySelector('#form-title');
        const author = document.querySelector('#form-author');
        const pages = document.querySelector('#form-pages');
        const read = document.querySelector('#form-read');
        const notes = document.querySelector('#form-notes');

        if (title.value && author.value && pages.value) {
            // submit form and close modal and reset
            addBook();
            displayBooks();
            instance.close();
            resetForm();

        } else if (!title.value) {
            title.classList.add('invalid');
        } else if (!author.value) {
            author.classList.add('invalid');
        } else if (!pages.value) {
            pages.classList.add('invalid');
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
            read.value = "";
            
        }

        // function creates new book object and pushes to myLibrary
        function addBook() {
            let newBook = new Book(title.value, author.value, pages.value, read.value, notes.value)
            myLibrary.push(newBook);
        }
        
    }
});

// form dropdown initialization
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
  });

// floating edit button to add book
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.fixed-action-btn');
    var instances = M.FloatingActionButton.init(elems);
  });
