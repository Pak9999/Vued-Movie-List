<script setup lang="ts">
import { ref } from 'vue'

// Define emits
const emit = defineEmits(['add-movie'])

// Form fields
const title = ref('')
const rating = ref('0')

// Form submission handler
const submitForm = () => {
  // Form validation
  if (title.value.trim() === '') {
    alert('Du måste ange en titel!')
    return
  }

  if (rating.value === '0') {
    alert('Du måste välja ett betyg!')
    return
  }

  // Emit event with movie data
  emit('add-movie', {
    title: title.value.trim(),
    rating: parseInt(rating.value),
  })

  // Reset form
  title.value = ''
  rating.value = '0'
}
</script>

<template>
  <form @submit.prevent="submitForm">
    <fieldset>
      <legend>Lägg till en film</legend>

      <label for="title-field">Titel:</label>
      <input type="text" id="title-field" class="form-control" v-model="title" />

      <label for="rating-field">Betyg:</label>
      <select id="rating-field" class="form-control" v-model="rating">
        <option value="0">Välj betyg här...</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>

      <input type="submit" class="btn btn-success mt-3" value="Spara film" />
    </fieldset>
  </form>
</template>

<style scoped></style>
