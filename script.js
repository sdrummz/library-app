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

function addBook () {
    let newBook = new Book(title, author, pages, isRead, notes)
    myLibrary.push(newBook);
}

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
                    <p class="isRead">Completed: ${book.isRead}</p>
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

// Modal form
document.addEventListener('DOMContentLoaded', function () {
    var elem = document.querySelector('.modal');
    const options = {
        dismissible: false
    }
    var instance = M.Modal.init(elem, options)
    
});

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.fixed-action-btn');
    var instances = M.FloatingActionButton.init(elems);
  });

  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
  });