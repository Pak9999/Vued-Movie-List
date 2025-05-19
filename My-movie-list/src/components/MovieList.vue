<script setup lang="ts">
import Movie from './MovieItem.vue'
import type { Movie as MovieType } from '../stores/movies'

// Define props
defineProps({
  movies: {
    type: Array as () => MovieType[],
    required: true,
  },
})

// Define emits
const emit = defineEmits(['delete-movie'])

// Handler for delete movie event
const handleDelete = (index: number) => {
  emit('delete-movie', index)
}
</script>

<template>
  <ul id="movies">
    <Movie
      v-for="(movie, index) in movies"
      :key="index"
      :movie="movie"
      :index="index"
      @delete="handleDelete"
    />
  </ul>
</template>

<style scoped>
#movies {
  margin: 0;
  padding: 0;
}
</style>
