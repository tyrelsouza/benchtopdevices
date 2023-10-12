<template>
  <div class="card-header">Calibration Devices</div>
  <div class="card-body">
    <h3>Primary Device</h3>
    <select
      name="primary_device"
      v-model="report_type"
      required
      id="id_report_type"
    >
      <option value="-" selected>----Primary-----</option>
      <option value="TV">Menzer1</option>
      <option value="HC">Blackbelt</option>
    </select>
    <td colspan="2">
      <h3>Calibration Date</h3>
      <div class="date-picker">
        <VueDatePicker
          v-model="date"
          auto-apply
          :enableTimePicker="false"
          :flow="flow"
        ></VueDatePicker>
      </div>
    </td>
    <hr />
    <h3>Secondary Device</h3>

    <select
      name="secondary_device"
      v-model="report_type"
      required
      id="id_report_type"
    >
      <option value="-" selected>----Secondary-----</option>
      <option value="TV">Menzer1</option>
      <option value="HC">Blackbelt</option>
    </select>
    <h3>Calibration Date</h3>
    <div class="date-picker">
      <VueDatePicker
        v-model="date"
        auto-apply
        :enableTimePicker="false"
        :flow="flow"
      ></VueDatePicker>
    </div>
  </div>
</template>
<script setup>
import { ref, defineEmits, watchEffect } from "vue";

import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const model = ref(""),
  serial = ref(""),
  cert_id = ref(""),
  due_date = ref(new Date()),
  date = ref(new Date());

const flow = ref(["year", "month", "calendar"]);

const emit = defineEmits();
watchEffect(() => {
  emit("new-calibration-form", {
    model,
    serial,
    cert_id,
    due_date,
    date,
  });
});
</script>
