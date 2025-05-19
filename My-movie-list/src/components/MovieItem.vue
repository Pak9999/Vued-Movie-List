<script setup lang="ts">
// Define props
const props = defineProps({
  movie: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
})

// Define emits
const emit = defineEmits(['delete'])

// Handler for delete button
const handleDelete = () => {
  emit('delete', props.index)
}
</script>

<template>
  <li :data-grade="movie.rating" :data-title="movie.title">
    {{ movie.title }}

    <!-- Delete icon -->
    <img
      src="../assets/delete.png"
      alt="Delete movie"
      class="delete-movie-icon"
      @click="handleDelete"
    />

    <!-- Star icons based on rating -->
    <img v-for="n in movie.rating" :key="n" src="../assets/star.png" alt="Star" />
  </li>
</template>

<style scoped>
li {
  list-style: none;
  background-color: #eee;
  margin: 5px;
  padding: 20px;
  box-shadow: 0 0 5px #999;
  position: relative;
}

li > img {
  height: 25px;
  margin-left: 5px;
}

li > img:not(.delete-movie-icon) {
  float: right;
}

.delete-movie-icon {
  cursor: pointer;
  float: right;
  margin-left: 15px;
}
</style>
