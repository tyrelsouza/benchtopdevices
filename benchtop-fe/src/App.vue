<script setup>
import {ref} from "vue"
import Sheet from './components/Sheet.vue'
import PDF from './components/PDF/PDF.vue'

const sheet_or_pdf = ref(1)
</script>

<template>
  <Sheet v-if="sheet_or_pdf==0" />
  <PDF v-if="sheet_or_pdf==1" />
</template>

<style scoped>
</style>
