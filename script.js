// Blog articles

const articles = [
    {
        id: 1,
        title: "Getting Started with Web Development",
        category: "Web Development",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
        description: "Learn the basics of web development and how websites are created.",
        content: "Web development is the process of creating websites and web applications. HTML is used to create the structure, CSS is used for styling, and JavaScript is used to add functionality."
    },

    {
        id: 2,
        title: "Why JavaScript is Important",
        category: "JavaScript",
        image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
        description: "Understand why JavaScript is one of the most popular web technologies.",
        content: "JavaScript makes websites interactive. It can be used for form validation, animations, API calls, dynamic content and many other features."
    },

    {
        id: 3,
        title: "Introduction to HTML",
        category: "HTML",
        image: "https://images.unsplash.com/photo-1547658719-da2b51169166",
        description: "Learn how HTML is used to create the structure of a webpage.",
        content: "HTML stands for HyperText Markup Language. It provides the basic structure of a webpage using elements such as headings, paragraphs, images, links and forms."
    },

    {
        id: 4,
        title: "CSS Basics for Beginners",
        category: "CSS",
        image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2",
        description: "Learn how CSS can make a website attractive and responsive.",
        content: "CSS stands for Cascading Style Sheets. It is used to control colors, fonts, spacing, layouts and responsive designs."
    },

    {
        id: 5,
        title: "How APIs Work",
        category: "Technology",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31",
        description: "Understand the basic concept of APIs and how applications communicate.",
        content: "An API allows two different software systems to communicate with each other. Websites can use APIs to get data from external services and display that data to users."
    },

    {
        id: 6,
        title: "Tips for Learning Programming",
        category: "Programming",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
        description: "Some simple tips that can help beginners improve their programming skills.",
        content: "The best way to learn programming is through regular practice. Start with simple programs, understand the concepts and gradually build real-world projects."
    }
];


// Get HTML elements

const articleContainer = document.getElementById("articleContainer");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const articleDetails = document.getElementById("articleDetails");


// Display categories

function loadCategories() {

    const categories = [];

    articles.forEach(function(article) {

        if (!categories.includes(article.category)) {
            categories.push(article.category);
        }

    });

    categories.forEach(function(category) {

        const option = document.createElement("option");

        option.value = category;
        option.textContent = category;

        categoryFilter.appendChild(option);

    });
}


// Display articles

function displayArticles(articleList) {

    articleContainer.innerHTML = "";

    if (articleList.length === 0) {

        articleContainer.innerHTML = `
            <p>No articles found.</p>
        `;

        return;
    }

    articleList.forEach(function(article) {

        const card = document.createElement("div");

        card.className = "article-card";

        card.innerHTML = `
            <img 
                src="${article.image}" 
                alt="${article.title}"
                class="article-image"
            >

            <div class="article-content">

                <span class="category">
                    ${article.category}
                </span>

                <h3>${article.title}</h3>

                <p>
                    ${article.description}
                </p>

                <button 
                    class="read-btn"
                    onclick="showArticle(${article.id})"
                >
                    Read More
                </button>

            </div>
        `;

        articleContainer.appendChild(card);

    });
}


// Search and filter

function filterArticles() {

    const searchText = searchInput.value.toLowerCase();

    const selectedCategory = categoryFilter.value;

    const filteredArticles = articles.filter(function(article) {

        const matchesSearch =
            article.title.toLowerCase().includes(searchText) ||
            article.description.toLowerCase().includes(searchText);

        const matchesCategory =
            selectedCategory === "all" ||
            article.category === selectedCategory;

        return matchesSearch && matchesCategory;

    });

    displayArticles(filteredArticles);
}


// Show individual article

function showArticle(id) {

    const article = articles.find(function(item) {
        return item.id === id;
    });

    if (!article) {
        return;
    }

    articleDetails.style.display = "block";

    articleDetails.innerHTML = `
        <h2>${article.title}</h2>

        <p>
            <strong>Category:</strong> ${article.category}
        </p>

        <br>

        <p>
            ${article.content}
        </p>

        <br>

        <button class="read-btn" onclick="closeArticle()">
            Close Article
        </button>
    `;

    articleDetails.scrollIntoView({
        behavior: "smooth"
    });
}


// Close article

function closeArticle() {

    articleDetails.style.display = "none";

}


// Search event

searchInput.addEventListener("input", filterArticles);


// Category event

categoryFilter.addEventListener("change", filterArticles);


// Start the website

loadCategories();

displayArticles(articles);