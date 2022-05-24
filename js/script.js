"use strict";

let contactsArr = [];
let numOfContacts = 0;
let currentPage = 0;
let contactsPerPage = 10;

/* fetching data from the json file containing all contact info
    and calling functions to display page numbers and the paginated contact list */
fetch('js/contacts.json')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        contactsArr = data;
        numOfContacts = data.length;
        outputPageNum();
        outputContacts();
    });

// function to display page numbers
// when a page number is clicked, trigger a function to update currentPage
function outputPageNum() {
    let pageCount = Math.ceil(numOfContacts / contactsPerPage);
    let pageStr = '';
    let pageCode1 = `<li><a onclick="whenClicked(`;
    let pageCode2 = `)">`;
    let pageCode3 = `</a></li>`;

    for (let i = 1; i <= pageCount; i++) {
        pageStr += pageCode1 + i + pageCode2 + i + pageCode3;
    }
    document.getElementById('pages').innerHTML = pageStr;
}

// function to update currentPage and update the paginated contact list
function whenClicked(clickedPage) {
    currentPage = clickedPage - 1;
    outputContacts();
}

// function to generate the paginated contact list
function outputContacts() {
    let contactCode1 = `
    <li class="contact-item cf">
    <div class="contact-details">
    <img class="avatar" src="
    `;

    let contactCode2 = `
    ">
    <h3>
    `;

    let contactCode3 = `
    </h3>
    <span class="email">
    `;

    let contactCode4 = `
    </span>
    </div>
    <div class="joined-details">
    <span class="date">
    `;

    let contactCode5 = `
    </span>
    </div>
    </li>
    `;

    let contactStr = '';
    let start = currentPage * contactsPerPage;
    let end = start + contactsPerPage;
    let paginatedContacts = contactsArr.slice(start, end);

    for (let i = 0; i < paginatedContacts.length; i++) {
        contactStr +=
            contactCode1 + paginatedContacts[i].avatar +
            contactCode2 + paginatedContacts[i].name +
            contactCode3 + paginatedContacts[i].email +
            contactCode4 + paginatedContacts[i].date +
            contactCode5;
    }
    document.getElementById('contacts').innerHTML = contactStr;
}