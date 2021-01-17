'use strict';

let myLibrary = [
    { 
    title: "The Hobbit", 
    author: "J.R.R. Tolkien", 
    pages: 473,
    notes: null, 
    isRead: "Read" 
    },
    { 
    title: "The Lord of the Rings, Return of the King", 
    author: "J.R.R. Tolkien", 
    pages: 416, 
    notes: null,
    isRead: "Read"
    }
];

function Book(title, author, pages, isRead, notes) {
    this.title = title
    this.author = author
    this.pages = pages
    this.notes = notes
    this.isRead = isRead
    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.isRead}`
    }
};

function displayBooks () {

    document.querySelector('.books').innerHTML = '';
    myLibrary.forEach(function (book, i) {
        let div = document.createElement('div');
        div.setAttribute('class', 'col l4 m6 s12');
        div.innerHTML = `
            <div class="card small z-depth-3">
                <div class="card-content">
                    <span class="card-title">${book.title}</span>
                    <p class="author">By: ${book.author}</p>
                    <p class="pages">Number of Pages: ${book.pages}</p>
                    <p class="isRead">Status: ${book.isRead}</p>
                </div>
                <div class="card-action">
                    <a class="btn-flat">Edit</a>
                    <a class="btn-flat delete">Delete</a>
                </div>
            </div>`
        document.querySelector('.books').appendChild(div);
    })
}

displayBooks();

const deleteBtn = document.querySelectorAll('.delete')
deleteBtn.forEach(function(btn) {
    btn.addEventListener('click', function() {
        
    })
})

// Modal form actions
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
            instance.close();
            addBook();
            displayBooks();
            resetForm();

        } else if (!title.value) {
            title.classList.add('invalid');
        } else if (!author.value) {
            author.classList.add('invalid');
        } else if (!pages.value) {
            pages.classList.add('invalid');
        }

        function resetForm() {
            title.value = '';
            title.classList.remove('valid');
            author.value = '';
            author.classList.remove('valid');
            pages.value = '';
            pages.classList.remove('valid');
            read.checked = false;
            notes.value = '';
        }

        function addBook() {
            let newBook = new Book(title.value, author.value, pages.value, read.value, notes.value)
            myLibrary.push(newBook);
        }
        
    }
});


// floating edit button to add book
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.fixed-action-btn');
    var instances = M.FloatingActionButton.init(elems);
  });