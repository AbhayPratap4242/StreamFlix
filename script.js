const API_KEY = "a5ae70f136b05e14ed9a8cadb7388d0e"; // 🔴 Put your API key here
const BASE = "https://api.themoviedb.org/3";
const IMG = "https://image.tmdb.org/t/p/w500";

const main = document.getElementById("main");
const form = document.getElementById("searchForm");
const search = document.getElementById("search");

/* Categories */
const categories = [
  { name: "Action", id: 28 },
  { name: "Comedy", id: 35 },
  { name: "Horror", id: 27 },
  { name: "Entertainment", id: 10751 }
];

/* Fetch Movies by Genre */
async function getMoviesByGenre(genreId) {
  const res = await fetch(`${BASE}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`);
  const data = await res.json();
  return data.results;
}

/* Create Section */
function createSection(title, movies) {
  const section = document.createElement("div");
  section.classList.add("section");

  section.innerHTML = `<h2>${title}</h2><div class="movies"></div>`;
  const container = section.querySelector(".movies");

  movies.forEach(movie => {
    if (!movie.poster_path) return;

    const div = document.createElement("div");
    div.classList.add("card");

    div.innerHTML = `
      <img src="${IMG + movie.poster_path}" alt="${movie.title}">
      <p>${movie.title}</p>
    `;

    container.appendChild(div);
  });

  main.appendChild(section);
}

/* Load Categories */
async function loadCategories() {
  main.innerHTML = "";

  for (let cat of categories) {
    const movies = await getMoviesByGenre(cat.id);
    createSection(cat.name, movies);
  }
}

/* Search */
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const query = search.value.trim();
  if (!query) return;

  const res = await fetch(`${BASE}/search/movie?api_key=${API_KEY}&query=${query}`);
  const data = await res.json();

  main.innerHTML = "";
  createSection("Search Results", data.results);
});

/* Initial Load */
loadCategories();