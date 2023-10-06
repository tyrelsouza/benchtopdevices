<template>
  <div class="card-header">Environment</div>
  <div class="card-body">
    <table class="table">
      <tbody>
      <tr>
        <td>Accuracy</td>
        <td>
          <input type="number" name="accuracy" step="0.01" v-model="accuracy" required id="id_accuracy">
        </td>
      </tr>
      <tr>
        <td>Barometric Pressure (mbar)</td>
        <td>
          <input type="number" name="barometric_pressure" step="0.01" max="1100" min="800" v-model="barometric_pressure"
                 required id="id_barometric_pressure">
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
        <td>Humidity</td>
        <td>
          <input type="number" name="humidity" step="0.01" max="100.0" min="0.0" v-model="humidity" required
                 id="id_humidity">
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: 'EnvironmentForm',
  data() {
    return {
      accuracy: 0.05,
      barometric_pressure: 1013.25,
      temperature: 50.0,
      humidity: 50.0
    }
  }
}
</script>