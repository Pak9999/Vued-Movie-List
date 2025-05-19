$(document).ready(function() {
    // Handle the form submission to add a new movie
    $("#add-movie-form").on("submit", function(e) {

        // Prevent the default form submission behavior
        e.preventDefault();
        
        // Get the input values
        const title = $("#title-field").val().trim();
        const rating = $("#rating-field").val();
        
        // Validates the title input and gives an alert if no title is entered
        if (title === "") {
            alert("Du måste ange en titel!");
            return;
        }
        
        // Validates the rating input and gives an alert if no rating is selected
        if (rating === "0") {
            alert("Du måste välja ett betyg!");
            return;
        }
        
        // Create new movie element
        const movieElement = createMovieElement(title, rating);
        
        // Adds the movie to the list
        $("#movies").append(movieElement);
        
        // Resets the form
        $(this).trigger("reset");
    });
    
    // Handles the clicking on the delete icon to remove a movie
    $("#movies").on("click", ".delete-movie-icon", function() {
        // Removes the parent li element
        $(this).parent().remove();
    });
    
    // Function to create each movie element with title and rating
    function createMovieElement(title, rating) {
        // Create the li element
        const li = $("<li></li>").attr({
            "data-grade": rating,
            "data-title": title
        }).text(title);
        
        // Adds the delete icon
        li.append($("<img>").attr({
            "src": "images/delete.png",
            "alt": "Delete movie",
            "class": "delete-movie-icon"
        }));
        
        // Adds star icons based on the choosen rating
        for (let i = 0; i < rating; i++) {
            li.append($("<img>").attr({
                "src": "images/star.png",
                "alt": "Star"
            }));
        }
        
        return li;
    }
});