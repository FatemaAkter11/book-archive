const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const displayBookContainer = document.getElementById('book-container');
const errorDiv = document.getElementById('error');
const searchResult = document.getElementById('search-result');
const checkData = checkDoc => {
    if (checkDoc !== undefined) {
        return checkDoc;
    }
    else {
        return "Data is not available";
    }
};
searchBtn.addEventListener("click", function () {
    const searchText = searchInput.value;
    //clear data
    searchInput.value = "";
    //Error handling
    if (searchText === "") {
        displayBookContainer.textContent = "";
        error.innerText = 'Please type something to search.';
    }
    else {
        displayBookContainer.textContent = "";
        //load data
        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.numFound === 0 && searchText !== "") {
                    errorDiv.innerText = "No result Found";
                }
                else {
                    errorDiv.innerText = "";
                }
                // console.log(data);
                searchResult.innerHTML = `<h3 class="mb-2">Result found: ${data.numFound}</h3>`;
                data = data.docs;
                data.forEach(doc => {
                    // console.log(doc);
                    const div = document.createElement("div");
                    div.classList.add('col');
                    div.innerHTML = `
                <div class="card h-100">
                <img class="card-img-top" src="https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg" class="card-img-top" alt="...">
                <div class="card-body h-25">
                    <h2 class="card-title">Book Name: ${doc.title}</h2>
                    <h3 class="card-title">Author Name: ${doc.author_name[0]}</h3>
                    <h4 class="card-title">Book Publisher: ${doc.publisher[0]}</h4>
                    <h5 class="card-title">First Publish Year: ${doc.first_publish_year}</h5>
                </div>
            </div>`;
                    displayBookContainer.appendChild(div);
                });
            });
    }
});