// book search area
const searchBook = () => {
    const searchInputField = document.getElementById('search-input');
    const searchText = searchInputField.value;
    // console.log(searchText);
    //clear data
    searchInputField.value = '';
    // load data
    const url = `http://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.docs));
}
// book search result
const displaySearchResult = books => {
    console.log(books);
}