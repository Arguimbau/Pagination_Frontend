const API_ENDPOINT = 'http://localhost:8080/api/books';
const SortAuthor = 'http://localhost:8080/api/books/sort';
const PAGE_SIZE = 10;
let sortColumn = 'author';
const tblRows = document.getElementById('tbl-rows');
let sortDirection = 'asc';


document.getElementById('header-row').onclick = function (evt) {
    const id = evt.target.id;
    if(!id.startsWith('sort-')) return;
    //TODO handle sorting here
    sortData();
};

async function sortData(page = 0, size = PAGE_SIZE, sort = sortColumn) {
    const data = await fetch(`${SortAuthor}?page=${page}&size=${size}&sort=${sortColumn},${sortDirection}`)
        .then(response => response.json())
    displayData(data.content);
    displayPagination(data.totalPages, page);
}

async function fetchData(page = 0, size = PAGE_SIZE) {
    const data = await fetch(`${API_ENDPOINT}?page=${page}&size=${size}`)
        .then(response => response.json())
    displayData(data.content);
    displayPagination(data.totalPages, page);
}



    function displayData(books) {
    tblRows.innerHTML = books.map(book => `<tr><td>${book.author}</td><td>${book.title}</td></tr>`).join('');
}


    function displayPagination(totalPages, currentPage, size) {
    let paginationHtml = '';
    if (currentPage > 0) { // Previous Page
    paginationHtml += `<li class="page-item"><a class="page-link" data-page="${currentPage - 1}" href="#">Previous</a></li>`;
}
    // Display page numbers
    let startPage = Math.max(0, currentPage - 2);
    let endPage = Math.min(totalPages - 1, currentPage + 2);


    for (let i = startPage; i <= endPage; i++) {
    if (i === currentPage) {
    paginationHtml += `<li class="page-item active"><a class="page-link" href="#">${i + 1}</a></li>`;
} else {
    paginationHtml += `<li class="page-item"><a class="page-link" data-page="${i}" href="#">${i + 1}</a></li>`;
}
}


    if (currentPage < totalPages - 1) { // Next Page
    paginationHtml += `<li class="page-item"><a class="page-link" data-page="${currentPage + 1}" href="#">Next</a></li>`;
}
    const paginationElement = document.getElementById('pagination');
    paginationElement.innerHTML = paginationHtml;
}


    document.querySelector('#pagination').onclick = function (evt) {
    evt.preventDefault();
    if (evt.target.tagName === 'A' && evt.target.hasAttribute('data-page')) {
    const page = parseInt(evt.target.getAttribute('data-page'));
    fetchData(page);
}
};


    fetchData();//Initial call to the backend