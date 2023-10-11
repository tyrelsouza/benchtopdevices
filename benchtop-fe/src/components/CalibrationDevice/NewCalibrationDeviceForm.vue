<template>
  <div class="card-header">Primary Cal Device</div>
  <div class="card-body">
    <table class="table">
      <tbody>
        <tr>
          <td colspan="2">
            <h3>Calibration Date</h3>
            <VueDatePicker
              v-model="date"
              auto-apply
              :enableTimePicker="false"
              :flow="flow"
            ></VueDatePicker>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <h3>Calibration Due Date</h3>
            <VueDatePicker
              v-model="due_date"
              auto-apply
              :enableTimePicker="false"
              :flow="flow"
            ></VueDatePicker>
          </td>
        </tr>
        <tr>
          <td>Model</td>
          <td>
            <input
              type="text"
              name="model"
              maxlength="100"
              v-model="model"
              required
              id="id_model"
            />
          </td>
        </tr>
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

        <tr>
          <td>Cert ID</td>
          <td>
            <input
              type="text"
              name="cert_id"
              maxlength="100"
              v-model="cert_id"
              required
              id="id_cert_id"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>
import { ref, defineEmits, watchEffect } from "vue";

import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const model = ref(""),
  serial = ref(""),
  cert_id = ref(""),
  due_date = ref(new Date),
  date = ref(new Date);

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
