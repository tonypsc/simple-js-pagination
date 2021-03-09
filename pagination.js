
// Creates pagination
const createPagination = (pages) => {
    
    //constants
    const nextCaption = 'Next',
        backCaption = 'Back',
        pageToShow = 8 // Pages to show before and after the current page
    
    // Reading url parameters
    let url = location.protocol + '//' + location.host + location.pathname;
    let fullUrl = new URL(window.location.href);
    let searchParams = new URLSearchParams(fullUrl.search);
    let page = searchParams.get('page') || 1;

    if(pages === 0) return '';
    page--;
    pages = Math.ceil(pages);

    let html = '<ul>';
    let pagesAfter = pages - page - 1;
    let pagesBefore = page;

    if(page === 0) {
        html += `<li>${backCaption}</li>`;
    } else {
        html += `<a href="${url}?page=${page}"><li>${backCaption}</li></a>`;
    }

    let start = 0;

    // Adjusting the pages before and the ellipsis if necesary
    if(pagesBefore > pageToShow) {
        start = page - pageToShow;
        html += `<a href="${url}?page=${start -1}"><li>...</li></a>`;
    } 

    let end = pages;

    // Adjusting the pages after and the ellipsis if necesary
    if(pagesAfter > pageToShow) {
        end = page + pageToShow + 1;
    } 

    for(let i = start; i < end; i++) {
        if(i != page) {
            html += `<a href="${url}?page=${i+1}"><li>${i+1}</li></a>`;
        } else {
            html += `<li class="page-selected">${i+1}</li>`;
        }
    }

    // Show ellipsis after
    if(pagesAfter > pageToShow) {
        html += `<a href="${url}?page=${end}"><li>...</li></a>`;
    } 

    if(page === pages - 1) {
        html += `<li>${nextCaption}</li>`;
    } else {
        html += `<a href="${url}?page=${page+2}"><li>${nextCaption}</li></a>`;
    }

    html += '</ul>';

    return html;
}
