const API_KEY = "bc861b946c774399aefa52a3b59d77b8"
const url = "https://newsapi.org/v2/everything?q="



async function fetchData(query) {
    try {
        const res = await fetch(`${url}${query}&apiKey=${API_KEY}`, {
            mode: "cors",
        });
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Fetch error:", error);
        return { articles: [] }; // Return an empty array if the fetch fails
    }
}

function renderMain(arr) {
    if (!arr || arr.length === 0) {
        document.querySelector("main").innerHTML = "<p>No results found.</p>";
        return;
    }
    let mainHTML = "";
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].urlToImage) {
            mainHTML += `<div class="card">
                            <a href=${arr[i].url}>
                                <img src=${arr[i].urlToImage} lazy="loading" />
                                <h4>${arr[i].title}</h4>
                                <div class="publishbyDate">
                                    <p>${arr[i].source.name}</p>
                                    <span>•</span>
                                    <p>${new Date(arr[i].publishedAt).toLocaleDateString()}</p>
                                </div>
                                <div class="desc">
                                    ${arr[i].description}
                                </div>
                            </a>
                         </div>`;
        }
    }
    document.querySelector("main").innerHTML = mainHTML;
}
window.Search = Search;
