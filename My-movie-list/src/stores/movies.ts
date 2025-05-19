import { ref } from 'vue'
import { defineStore } from 'pinia'

// Define movie interface
export interface Movie {
  title: string
  rating: number
}

export const useMoviesStore = defineStore('movies', () => {
  // State
  const movies = ref<Movie[]>([])

  // Actions
  function addMovie(movie: Movie) {
    movies.value.push(movie)
  }

  function deleteMovie(index: number) {
    movies.value.splice(index, 1)
  }

  function sortByAlphabet() {
    movies.value.sort((a, b) => a.title.localeCompare(b.title))
  }

  function sortByGrade() {
    movies.value.sort((a, b) => b.rating - a.rating)
  }

  return { movies, addMovie, deleteMovie, sortByAlphabet, sortByGrade }
})
