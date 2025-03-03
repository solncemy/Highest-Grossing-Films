document.addEventListener("DOMContentLoaded", function() {
    fetch('films_data.json')
        .then(response => response.json())
        .then(data => {
            const filmItems = document.getElementById('film-items');
            const minRevenueInput = document.getElementById('min-revenue');
            const countryInput = document.getElementById('country');

            function displayFilms(films) {
                filmItems.innerHTML = '';
                films.forEach(film => {
                    const li = document.createElement('li');
                    li.textContent = `${film.title} (${film.release_year}) - Directed by ${film.director} - $${film.box_office} - ${film.country}`;
                    filmItems.appendChild(li);
                });
            }

            function filterFilms() {
                let filteredFilms = data;

                const minRevenue = parseFloat(minRevenueInput.value);
                if (!isNaN(minRevenue)) {
                    filteredFilms = filteredFilms.filter(film => parseFloat(film.box_office) >= minRevenue);
                }

                const country = countryInput.value.toLowerCase();
                if (country) {
                    filteredFilms = filteredFilms.filter(film => film.country.toLowerCase().includes(country));
                }

                displayFilms(filteredFilms);
            }

            minRevenueInput.addEventListener('input', filterFilms);
            countryInput.addEventListener('input', filterFilms);

            displayFilms(data); 
        });
});
