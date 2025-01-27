document.addEventListener('DOMContentLoaded', () => {
    // Fetch news data (you can keep your existing API)
    fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=b0017dbcaa4542c0ad71018d25f41447')
        .then(response => response.json())
        .then(data => {
            const newsContainer = document.getElementById('news-container');
            
            // Loop through the articles and create a new div for each one
            data.articles.forEach(article => {
                const newsItem = document.createElement('div');
                newsItem.classList.add('news-item');
                
                // Add content to each news item
                newsItem.innerHTML = `
                    <h2>${article.title}</h2>
                    <img src="${article.urlToImage}" alt="Image">
                    <p>${article.description}</p>
                    <a href="${article.url}" target="_blank">Read More</a>
                `;
                
                // Append the news item to the container
                newsContainer.appendChild(newsItem);
            });
        })
        .catch(error => console.error('Error fetching news:', error));
});
