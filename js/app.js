// book search area
const searchBook = () => {
    const searchInputField = document.getElementById('search-input');
    const searchText = searchInputField.value;
    //clear data
    searchInputField.value = '';
    if (searchText === '') {
        displayErrorNotice('Please type something to search.');
    } else {
        document.getElementById('error').textContent = '';
        // load data
        const url = `http://openlibrary.org/search.json?q=${searchText}`;
        try {
            fetch(url)
                .then(res => res.json())
                .then(data => displaySearchResult(data.docs));
        } catch {
            displayErrorNotice();
            // console.log(err);
        }

    }
}

// display error notice
const displayErrorNotice = (errorMessage = 'No Result Found') => {
    document.getElementById('error').innerHTML = `
		<h5 class="text-danger my-4">${errorMessage}</h5>
	`;
}

// book search result
const displaySearchResult = docs => {
    // console.log(docs);
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    if (docs.length === 0) {
        displayErrorNotice();
    }
    docs.forEach(doc => {
        // console.log(doc);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
                <div class="card h-100">
                <img class="h-75" src="https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg" class="card-img-top" alt="...">
                <div class="card-body h-25">
                    <h2 class="card-title">Book Name: ${doc.title}</h2>
                    <h3 class="card-title">Author Name: ${doc.author_name}</h3>
                    <h5 class="card-title">First Publish Year: ${doc.first_publish_year}</h5>
                </div>
            </div>
                `;
        searchResult.appendChild(div);
    });
}
/* <h4 class="card-title">Book Publisher: ${doc.publisher}</h4> */