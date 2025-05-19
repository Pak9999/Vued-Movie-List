$(document).ready(function() {
    // Global variable for movies
    let movies = [];
    let filteredMovies = [];
    let activeFilters = {
        genre: "",
        year: ""
    };
    
    // Load movies and display them
    movies = loadMovies();
    filteredMovies = [...movies];
    printMovies(filteredMovies);
    
    // Delete movie button event handler
    $("#movies").on("click", ".delete-movie-icon", function() {
        const movieLi = $(this).parent();
        const title = movieLi.attr("data-title");
        
        // Remove movie from the array
        movies = movies.filter(movie => movie.title !== title);
        
        // Update localStorage
        saveMovies(movies);
        
        // Apply current filter to the updated list
        applyFilters();
        
        // Refresh the display
        printMovies(filteredMovies);
    });
    
    // Sort by title button
    $("#sort-by-title").on("click", function() {
        // Save sort preference to sessionStorage
        sessionStorage.setItem("sortType", "title");
        
        // Sort and display
        $("#movies").find("li").sort(sortByTitle).appendTo($("#movies"));
    });
    
    // Sort by grade button
    $("#sort-by-grade").on("click", function() {
        // Save sort preference to sessionStorage
        sessionStorage.setItem("sortType", "grade");
        
        // Sort and display
        $("#movies").find("li").sort(sortByGrade).appendTo($("#movies"));
    });
    
    // New movie form submission
    $("#new-movie-form").on("submit", function(e) {
        // Prevent default form submission
        e.preventDefault();
        
        // Get input values
        const title = $("#title").val().trim();
        const grade = $("#grade").val();
        const genre = $("#genre").val();
        const year = $("#year").val();
        
        // Validate inputs
        if (title === "" || grade === "") {
            alert("Du måste minst ange både titel och betyg!");
            return;
        }
        
        // Create new movie object
        const newMovie = { 
            title: title, 
            grade: parseInt(grade),
            genre: genre || "",
            year: year ? parseInt(year) : ""
        };
        
        // Add new movie to array
        movies.push(newMovie);
        
        // Save updated movies
        saveMovies(movies);
        
        // Apply current filters
        applyFilters();
        
        // Refresh the display
        printMovies(filteredMovies);
        
        // Reset form
        this.reset();
    });
    
    // Apply filters button
    $("#apply-filter").on("click", function() {
        // Get filter values
        activeFilters.genre = $("#filter-genre").val();
        activeFilters.year = $("#filter-year").val();
        
        // Apply filters and update display
        applyFilters();
        printMovies(filteredMovies);
    });
    
    // Clear filters button
    $("#clear-filter").on("click", function() {
        // Clear filter fields
        $("#filter-genre").val("");
        $("#filter-year").val("");
        
        // Reset filters
        activeFilters.genre = "";
        activeFilters.year = "";
        
        // Show all movies
        filteredMovies = [...movies];
        printMovies(filteredMovies);
    });
    
    // Helper function to apply filters
    function applyFilters() {
        filteredMovies = movies.filter(movie => {
            let matchesGenre = true;
            let matchesYear = true;
            
            if (activeFilters.genre && movie.genre) {
                matchesGenre = movie.genre === activeFilters.genre;
            }
            
            if (activeFilters.year && movie.year) {
                matchesYear = movie.year.toString() === activeFilters.year;
            }
            
            return matchesGenre && matchesYear;
        });
    }
});

function printMovies(movies) {
    // Clear the existing movies list
    $("#movies").empty();
    
    // Loop through each movie and create its list item
    movies.forEach(movie => {
        // Create list item with data attributes
        const li = $("<li></li>").attr({
            "data-grade": movie.grade,
            "data-title": movie.title,
            "data-genre": movie.genre || "",
            "data-year": movie.year || ""
        });
        
        // Add movie title
        li.append($("<span></span>").addClass("movie-title").text(movie.title));
        
        // Add movie metadata if available
        let metadata = [];
        if (movie.genre) metadata.push(translateGenre(movie.genre));  // Translate genre to Swedish
        if (movie.year) metadata.push(movie.year);
        
        if (metadata.length > 0) {
            li.append($("<span></span>").addClass("movie-metadata").text(" (" + metadata.join(", ") + ")"));
        }
        
        // Add delete button
        li.append($("<img>").attr({
            "src": "images/delete.png",
            "alt": "Delete movie",
            "class": "delete-movie-icon"
        }));
        
        // Add stars based on movie grade
        for (let i = 0; i < movie.grade; i++) {
            li.append($("<img>").attr({
                "src": "images/star.png",
                "alt": "Star"
            }));
        }
        
        // Set background color based on grade
        setMovieColor(li, movie.grade);
        
        // Add to movies list
        $("#movies").append(li);
    });
    
    // Update movie count
    updateMovieCount();
    
    // Sort movies according to current sort setting (if any)
    sortMovies();
}

// Function to set background color based on rating
function setMovieColor(movieElement, rating) {
    if (rating >= 4) {
        movieElement.css("background-color", "#d4edda"); // Green for high ratings
    } else if (rating >= 2) {
        movieElement.css("background-color", "#fff3cd"); // Yellow for medium ratings
    } else {
        movieElement.css("background-color", "#f8d7da"); // Red for low ratings
    }
}

function loadMovies() {
    // Try to load movies from localStorage
    let movies;
    const savedMovies = localStorage.getItem("movies");
    
    if (savedMovies) {
        // Parse saved movies from JSON
        movies = JSON.parse(savedMovies);
    } else {
        // Default movies if nothing is saved
        movies = [
            { title: "Star Wars: Episode IV - A New Hope", grade: 5, genre: "Sci-Fi", year: 1977 },
            { title: "Titanic", grade: 4, genre: "Drama", year: 1997 },
            { title: "Cats", grade: 1, genre: "Comedy", year: 2011 },
        ];
        
        // Save default movies to localStorage
        saveMovies(movies);
    }
    
    return movies;
}

function saveMovies(movies) {
    // Convert movies array to JSON and save to localStorage
    localStorage.setItem("movies", JSON.stringify(movies));
}

// Helper function to update movie count
function updateMovieCount() {
    const count = $("#movies li").length;
    $("#movie-count").text(count);
}

// Helper function to sort movies based on current sort setting
function sortMovies() {
    const sortType = sessionStorage.getItem("sortType");
    
    if (sortType === "title") {
        $("#movies").find("li").sort(sortByTitle).appendTo($("#movies"));
    } else if (sortType === "grade") {
        $("#movies").find("li").sort(sortByGrade).appendTo($("#movies"));
    }
}

// Sort functions
function sortByTitle(a, b) {
    const titleA = $(a).attr("data-title").toLowerCase();
    const titleB = $(b).attr("data-title").toLowerCase();
    
    if (titleA < titleB) return -1;
    if (titleA > titleB) return 1;
    return 0;
}

function sortByGrade(a, b) {
    const gradeA = parseInt($(a).attr("data-grade"));
    const gradeB = parseInt($(b).attr("data-grade"));
    
    return gradeB - gradeA; // Sort descending by grade
}

// Function to translate genre from English to Swedish
function translateGenre(englishGenre) {
    const genreTranslations = {
        "Action": "Action",
        "Comedy": "Komedi",
        "Drama": "Drama",
        "Horror": "Skräck",
        "SciFi": "Sci-Fi",
        "Romance": "Romantik"
    };
    
    return genreTranslations[englishGenre] || englishGenre;
}
