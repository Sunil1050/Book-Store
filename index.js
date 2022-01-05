let userInput = document.getElementById('searchInput');
let selectEle = document.getElementById('selectDisplayCount');
let spinnerEle = document.getElementById('spinner');
let resultContainer = document.getElementById('row');

userInput.addEventListener('change', function(event) {
    formData.userInput = event.target.value;
});

selectEle.addEventListener('change', function(event) {
    formData.select = event.target.value;
});

let resultEle = document.createElement('h1');
resultEle.classList.add('result', 'd-none', 'd-md-none', 'col-12', 'col-md-12');
resultContainer.appendChild(resultEle);

let formData = {
    userInput: "",
    select: '10'
};
console.log(formData);

function createAndAppendResults(item) {
    let {
        title,
        imageLink,
        author
    } = item;

    let containerEle = document.createElement('div');
    containerEle.classList.add('mt-3', 'mb-3', 'col-12', 'col-md-6');
    resultContainer.appendChild(containerEle);

    let imgEle = document.createElement('img');
    imgEle.src = imageLink;
    imgEle.classList.add('w-100');
    containerEle.appendChild(imgEle);

    let authorEle = document.createElement('p');
    authorEle.textContent = author;
    authorEle.classList.add('author-text');
    containerEle.appendChild(authorEle);

}

function displayResults(jsonData) {
    spinnerEle.classList.add('d-none', 'd-md-none');
    let {
        search_results
    } = jsonData;
    if (search_results.length === 0) {
        resultEle.textContent = "No result found"
        resultEle.classList.remove('d-none', 'd-md-none');
    } else {
        resultEle.textContent = "Popular Books";
        resultEle.classList.remove('d-none', 'd-md-none');
        for (let item of search_results) {
            createAndAppendResults(item);
        }
    }
}
userInput.addEventListener('keydown', function(event) {
    if (event.key === "Enter") {
        let {
            userInput,
            select
        } = formData;
        spinnerEle.classList.remove('d-none', 'd-md-none');
        let options = {
            method: "GET"
        };
        let url = "https://apis.ccbp.in/book-store?title=" + userInput + "&maxResults=" + select;
        console.log(url);
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                console.log(jsonData)
                displayResults(jsonData);
            })
    }
});