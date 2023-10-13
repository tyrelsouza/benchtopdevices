<template>
  <div class="flextainer">
    <div class="left">
      <div class="grid">
        <div class="grid-item item card">
          <CustomerForm @customerForm="customerForm" />
          <EnvironmentForm @environmentForm="environmentForm" />
        </div>
        <div class="grid-item item card">
          <UploadForm @uploadForm="uploadForm" />
        </div>
      </div>
      <div class="grid">
        <div class="grid-item item card">
          <InstrumentForm
            v-if="!show_new_instrument"
            @instrumentForm="instrumentForm"
            @showNewInstrument="showNewInstrument"
          />
          <NewInstrumentForm
            v-if="show_new_instrument"
            @newInstrumentForm="newInstrumentForm"
          />
        </div>
        <div class="grid-item item card">
          <CalibrationDeviceForm
            v-if="!show_new_calibration"
            @calibrationForm="calibrationForm"
            @showNewCalibration="showNewCalibration"
          />
          <NewCalibrationDeviceForm
            v-if="show_new_calibration"
            @newCalibrationForm="newCalibrationForm"
          />
        </div>
      </div>
    </div>

    <div class="right">
      <PDF
        :upload="upload_form_data"
        :customer="customer_form_data"
        :environment="environment_form_data"
        :instrument="new_instrument_form_data"
        :calibration="new_calibration_form_data"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from "vue";

import CustomerForm from "./CustomerForm.vue";
import NewInstrumentForm from "./Instrument/NewInstrumentForm.vue";
import InstrumentForm from "./Instrument/InstrumentForm.vue";
import NewCalibrationDeviceForm from "./CalibrationDevice/NewCalibrationDeviceForm.vue";
import CalibrationDeviceForm from "./CalibrationDevice/CalibrationDeviceForm.vue";
import EnvironmentForm from "./EnvironmentForm.vue";
import UploadForm from "./UploadForm.vue";
import PDF from "./PDF/PDF.vue";

// Not needed yet
const instrument_form_data = ref(),
  calibration_form_data = ref();

// Booleans
const show_new_instrument = ref(true),
  show_new_calibration = ref(true);

// form Data
const upload_form_data = ref(),
  customer_form_data = ref(),
  environment_form_data = ref(),
  new_instrument_form_data = ref(),
  new_calibration_form_data = ref();

const uploadForm = (form) => {
  upload_form_data.value = form;
};

const customerForm = (form) => {
  customer_form_data.value = form;
};

const environmentForm = (form) => {
  environment_form_data.value = form;
};

const newInstrumentForm = (form) => {
  new_instrument_form_data.value = form;
};

const instrumentForm = (form) => {
  instrument_form_data.value = form;
};

const newCalibrationForm = (form) => {
  new_calibration_form_data.value = form;
};

const calibrationForm = (form) => {
  calibration_form_data.value = form;
};

const showNewInstrument = (val) => {
  show_new_instrument.value = val;
};
const showNewCalibration = (val) => {
  show_new_calibration.value = val;
};

const emits = defineEmits([
  "uploadForm",
  "customerForm",
  "environmentForm",
  "instrumentForm",
  "newInstrumentForm",
  "calibrationForm",
  "newCalibrationForm",
  "showNewInstrument",
  "showNewCalibration",
]);
</script>

<style scoped>
body {
  margin: 1rem;
  background: url("/public/funky-lines.webp");
}
</style>
