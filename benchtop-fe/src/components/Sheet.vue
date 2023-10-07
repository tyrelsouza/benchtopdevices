<template>
  <div>
    <div class="item card">
      <UploadForm @uploadForm="uploadForm" />
    </div>
  </div>

  <div class="container">
    <div class="item card">
      <CustomerForm @customerForm="customerForm" />
    </div>
    <div class="item card">
      <EnvironmentForm @environmentForm="environmentForm" />
    </div>

    <div class="item card">
      <NewInstrumentForm @newInstrumentForm="newInstrumentForm" />
    </div>
    <div class="item card">
      <NewCalibrationDeviceForm @newCalibrationForm="newCalibrationForm" />
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from "vue";

import CustomerForm from "./CustomerForm.vue";
import NewInstrumentForm from "./Instrument/NewInstrumentForm.vue";
import NewCalibrationDeviceForm from "./CalibrationDevice/NewCalibrationDeviceForm.vue";
import EnvironmentForm from "./EnvironmentForm.vue";
import UploadForm from "./UploadForm.vue";

const
  upload_form_data = ref(),
  calibration_form_data = ref(),
  customer_form_data = ref(),
  environment_form_data = ref(),
  new_instrument_form_data = ref(),
  instrument_form_data = ref(),
  new_calibration_form_data = ref()


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

const emits = defineEmits([
  "uploadForm",
  "customerForm",
  "environmentForm",
  "instrumentForm",
  "newInstrumentForm",
  "calibrationForm",
  "newCalibrationForm",
]);
</script>
