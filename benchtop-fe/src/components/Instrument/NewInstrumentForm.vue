<template>
  <div>
    <div class="card-header">Instrument</div>
    <div class="card-body">
      <table class="table">
        <tbody>
          <tr>
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
          </tr>
          <tr>
            <td colspan="2">
              <h3>Calibration Due Date</h3>
              <div class="date-picker">
                <VueDatePicker
                  v-model="due_date"
                  :enableTimePicker="false"
                  auto-apply
                  :flow="flow"
                ></VueDatePicker>
              </div>
            </td>
          </tr>
          <tr>
            <td>Model</td>
            <td>
              <input
                type="text"
                name="model"
                maxlength="256"
                v-model="model"
                required
                id="id_model"
              />
            </td>
          </tr>
          <tr>
            <td>Serial Number</td>
            <td>
              <input
                type="text"
                name="serial_number"
                maxlength="256"
                v-model="serial_number"
                required
                id="id_serial_number"
              />
            </td>
          </tr>
          <tr>
            <td>Channel</td>
            <td>
              <input
                type="text"
                name="channel"
                maxlength="256"
                v-model="channel"
                required
                id="id_channel"
              />
            </td>
          </tr>
          <tr>
            <td>Transducer Model</td>
            <td>
              <input
                type="text"
                name="transducer_model"
                maxlength="256"
                v-model="transducer_model"
                required
                id="id_transducer_model"
              />
            </td>
          </tr>
          <tr>
            <td>Transducer Span (psia)</td>
            <td>
              <input
                type="text"
                name="transducer_span"
                maxlength="256"
                v-model="transducer_span"
                required
                id="id_transducer_span"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup>
import { ref, defineEmits, watchEffect } from "vue";

import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const channel = ref(""),
  serial_number = ref(""),
  model = ref(""),
  transducer_model = ref(""),
  transducer_span = ref(""),
  due_date = ref(new Date),
  date = ref(new Date),
  flow = ["year", "month", "calendar"];

const emit = defineEmits();
watchEffect(() => {
  emit("new-instrument-form", {
    channel,
    serial_number,
    model,
    transducer_model,
    transducer_span,
    due_date,
    date,
  });
});
</script>

