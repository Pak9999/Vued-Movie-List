<script setup lang="ts">
import MovieApplication from './components/MovieApplication.vue'
</script>

<template>
  <main>
    <MovieApplication />
  </main>
</template>

<style>
/* Import Bootstrap CSS */
@import 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css';

body {
  margin: 0;
  padding: 20px 0;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

main {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
