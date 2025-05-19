<script setup lang="ts">
import AddMovieForm from './AddMovieForm.vue'
import Movies from './MovieList.vue'
import OrderButtons from './OrderButtons.vue'
import { useMoviesStore } from '../stores/movies'

// Use movies store
const moviesStore = useMoviesStore()

// Actions are directly available from the store
</script>

<template>
  <div class="container">
    <h1>Min filmlista</h1>

    <!-- Add movie form component -->
    <AddMovieForm @add-movie="moviesStore.addMovie" />

    <hr />

    <h2>Filmer</h2>

    <!-- Order buttons component -->
    <OrderButtons
      @sort-alphabetically="moviesStore.sortByAlphabet"
      @sort-by-grade="moviesStore.sortByGrade"
    />

    <!-- Movies list component -->
    <Movies :movies="moviesStore.movies" @delete-movie="moviesStore.deleteMovie" />
  </div>
</template>

<style></style>
