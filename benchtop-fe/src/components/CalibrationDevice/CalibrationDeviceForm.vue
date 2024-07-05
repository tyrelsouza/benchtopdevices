<template>
  <div>
  <div class="card-header">
    Primary Cal Device
    <button class="custom-button" role="button" @click="showNewCalibrationClick">+ New</button>
  </div>
  <div class="card-body">
    <table class="table">
      <tbody>
        <tr>
          <td>Serial #</td>
          <td>
            <input
              type="text"
              name="serial"
              maxlength="100"
              v-model="serial"
              required
              id="id_serial"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <div class="summary">
      <p>Enter a serial number to search for an existing <br/>
      Primary Calibration Device, or press New to log a new device.
      </p>
    </div>
  </div>
  </div>
</template>
<script setup>
import { ref, defineEmits, watchEffect } from "vue";

const serial = ref("");

const showNewCalibrationClick = () => {
  emit("show-new-calibration", true);
};

const emit = defineEmits();
watchEffect(() => {
  emit("calibration-form", {
    serial,
  });
});
</script>
