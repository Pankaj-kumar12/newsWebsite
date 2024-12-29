const API_KEY = "bc861b946c774399aefa52a3b59d77b8";
const BASE_URL = "https://newsapi.org/v2/everything?q=";

/**
 * Fetches data from the NewsAPI based on the query string.
 * @param {string} query - The search term.
 * @returns {Promise<Object>} - The fetched data or a default structure in case of an error.
 */
async function fetchData(query) {
    try {
        const response = await fetch(`${BASE_URL}${query}&apiKey=${API_KEY}`, {
            mode: "cors",
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error.message);
        return { articles: [] }; // Return a default structure to avoid breaking the UI
    }
}

/**
 * Renders the fetched news articles on the page.
 * @param {Array} articles - The list of news articles to render.
 */
function renderMain(articles) {
    const mainContainer = document.querySelector("main");

    if (!articles || articles.length === 0) {
        mainContainer.innerHTML = "<p>No results found.</p>";
        return;
    }

    let mainHTML = articles
        .filter(article => article.urlToImage) // Only include articles with images
        .map(article => `
            <div class="card">
                <a href="${article.url}" target="_blank" rel="noopener noreferrer">
                    <img src="${article.urlToImage}" alt="News image" loading="lazy" />
                    <h4>${article.title}</h4>
                    <div class="publishbyDate">
                        <p>${article.source.name || "Unknown Source"}</p>
                        <span>•</span>
                        <p>${new Date(article.publishedAt).toLocaleDateString()}</p>
                    </div>
                    <div class="desc">
                        ${article.description || "No description available"}
                    </div>
                </a>
            </div>
        `)
        .join("");

    mainContainer.innerHTML = mainHTML;
}

/**
 * Handles searching and renders the results.
 * @param {string} query - The search query to use.
 */
async function Search(query) {
    if (!query) {
        alert("Please enter a search term.");
        return;
    }

    const data = await fetchData(query);
    renderMain(data.articles);
}

// Make the Search function globally available for inline usage
window.Search = Search;

// Optional: Attach event listeners for search inputs (if needed)
document.getElementById("searchForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
        Search(searchInput.value.trim());
    }
});

document.getElementById("searchFormMobile")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const searchInputMobile = document.getElementById("searchInputMobile");
    if (searchInputMobile) {
        Search(searchInputMobile.value.trim());
    }
});
