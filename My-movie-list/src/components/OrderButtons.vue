<script setup lang="ts">
// Define emits
const emit = defineEmits(['sort-alphabetically', 'sort-by-grade'])

// Sort by title handler
const sortByTitle = () => {
  emit('sort-alphabetically')
}

// Sort by grade handler
const sortByGrade = () => {
  emit('sort-by-grade')
}
</script>

<template>
  <div class="order-buttons">
    <button class="btn btn-primary btn-sm" @click="sortByTitle" id="sort-by-title">
      Sortera efter titel
    </button>
    <button class="btn btn-primary btn-sm" @click="sortByGrade" id="sort-by-grade">
      Sortera efter betyg
    </button>
  </div>
</template>

<style scoped>
.order-buttons {
  margin-bottom: 15px;
}

button {
  margin-right: 10px;
}
</style>
