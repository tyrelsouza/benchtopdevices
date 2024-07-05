<template>
  <div>
    <div class="card-header">Calibration Devices</div>
    <div class="card-body">
      <h3>Primary Device</h3>
      <select name="primary_device" v-model="primary_device" required id="id_report_type">
        <option value="-" selected>----Primary-----</option>
        <option value="Menzer1">Menzer1</option>
        <option value="Blackbelt">Blackbelt</option>
      </select>
        <h3>Calibration Date</h3>
        <div class="date-picker">
          <VueDatePicker v-model="primary_calibration_date" auto-apply :enableTimePicker="false" :flow="flow"></VueDatePicker>
        </div>
      <hr />
      <h3>Secondary Device</h3>

      <select name="secondary_device" v-model="secondary_device" required id="id_report_type">
        <option value="-" selected>----Secondary-----</option>
        <option value="Menzer1">Menzer1</option>
        <option value="Blackbelt">Blackbelt</option>
      </select>

      <h3>Calibration Date</h3>
      <div class="date-picker">
        <VueDatePicker v-model="secondary_calibration_date" auto-apply :enableTimePicker="false" :flow="flow"></VueDatePicker>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, defineEmits, watchEffect } from "vue";

import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const primary_device = ref(""),
    secondary_device = ref(""),
    primary_calibration_date = ref(new Date()),
    secondary_calibration_date = ref(new Date());

const flow = ref(["year", "month", "calendar"]);

const emit = defineEmits();
watchEffect(() => {
  emit("new-calibration-form", {
    primary_device,
    secondary_device,
    primary_calibration_date,
    secondary_calibration_date,
  });
});
</script>
