<template>
  <div class="card-header">Environment</div>
  <div class="card-body">
    <table class="table">
      <tbody>
      <tr>
        <td>Accuracy</td>
        <td>
          <input type="number" name="accuracy" step="0.001" v-model="accuracy" required id="id_accuracy">
        </td>
      </tr>
      <tr>
        <td>Pressure (psi)</td>
        <td>
          <input type="number" name="pressure" step="0.01" max="1000" min="0" v-model="pressure"
                 required id="id_pressure">
        </td>
      </tr>
      <tr>
        <td>Temperature (&deg;F)</td>
        <td>
          <input type="number" name="temperature" step="0.01" max="1000.0" min="-459.67" v-model="temperature" required
                 id="id_temperature">
        </td>
      </tr>
      <tr>
        <td>Humidity (%RH)</td>
        <td>
          <input type="number" name="humidity" step="0.01" max="100.0" min="0.0" v-model="humidity" required
                 id="id_humidity">
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>
import { ref, defineEmits, watchEffect } from 'vue'

const
  accuracy = ref(0.05),
  pressure = ref(14.7),
  temperature = ref(50.0),
  humidity = ref(50.0)

const emit = defineEmits();
watchEffect(() => {
  emit("environment-form", {
    accuracy,
    pressure,
    temperature,
    humidity,
  });
});
</script>