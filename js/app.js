const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("search-btn");
const bookContainer = document.getElementById("book-container");
const errorDiv = document.getElementById("error");
const resultFound = document.getElementById("resultFound");
const checkData = checkItem => {
    if (checkItem !== undefined) {
        return checkItem;
    }
    else {
        return " no data available";
    }
};
searchBtn.addEventListener("click", function () {
    const searchValue = searchInput.value;
    //clear data
    searchInput.value = "";
    //Error handling
    if (searchValue === "") {
        bookContainer.textContent = "";
        error.innerText = "Field is empty! please Enter a book name.";
    }
    else {
        bookContainer.textContent = "";
        //load data
        const url = `https://openlibrary.org/search.json?q=${searchValue}`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.numFound === 0 && searchValue !== "") {
                    errorDiv.innerText = "No result Found";
                }
                else {
                    errorDiv.innerText = "";
                }
                // console.log(data);
                resultFound.innerHTML = `<h6>result found: ${data.numFound}</h6>`
                data = data.docs;
                data.forEach(doc => {
                    // console.log(doc);
                    const div = document.createElement("div");
                    div.classList.add('col-md-3', 'col-12');
                    const author = checkData(doc.author_name[0]);
                    const year = checkData(doc.first_publish_year);
                    const publisher = checkData(doc.publisher[0]);
                    div.innerHTML = `
         <div class="border rounded overflow-hidden p-2">
         <img class="w-100" src="https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg" alt="" />
       </div>
       <div class="py-2 d-flex justify-content-between align-items-center d-md-block text-md-center">
         <h2>Book name: ${doc.title}</h2>
         <h5>Author Name: ${author} </h5>
         <h6>publisher: ${publisher}</h6>
         <h6>First publish Year: ${year}</h6>  </div>`;
                    bookContainer.appendChild(div);
                });
            });
    }
});