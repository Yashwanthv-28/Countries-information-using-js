document.addEventListener('DOMContentLoaded', () => {
    const searchQueryInput = document.getElementById('search-query');
    const searchButton = document.getElementById('search-button');
    const resultsList = document.getElementById('results-list');

    searchButton.addEventListener('click', () => {
        const query = searchQueryInput.value.trim();
        if (query) {
            searchCountry(query);
        }
    });

    async function searchCountry(query) {
        try {
            const response = await fetch(`https://restcountries.com/v3.1/name/${query}`);
            const data = await response.json();
            if (Array.isArray(data) && data.length > 0) {
                const country = data[0];
                const countryInfo = {
                    id: country.cca3,
                    name: country.name.common,
                    capital: country.capital ? country.capital[0] : 'No capital',
                    region: country.region,
                    population: country.population,
                    type: 'country'
                };
                displayResults([countryInfo]);
            } else {
                alert('Country not found. Please enter a valid country name.');
            }
        } catch (error) {
            console.error('Error fetching country data:', error);
            alert('Error fetching country data. Please try again later.');
        }
    }

    function displayResults(results) {
        resultsList.innerHTML = '';
        results.forEach(result => {
            const li = document.createElement('li');
            li.textContent = `${result.name} - Capital: ${result.capital}, Region: ${result.region}, Population: ${result.population}`;
            resultsList.appendChild(li);
        });
    }
});
