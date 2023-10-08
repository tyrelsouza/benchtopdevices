<template>
  <div class="container">
    <div class="item card">
      <UploadForm @uploadForm="uploadForm" />
    </div>

    <div class="item card">
      <CustomerForm @customerForm="customerForm" />
    </div>

    <div class="item card">
      <EnvironmentForm @environmentForm="environmentForm" />
    </div>

    <div class="item card">
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


    <div class="item card">
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

const upload_form_data = ref(),
  calibration_form_data = ref(),
  customer_form_data = ref(),
  environment_form_data = ref(),
  new_instrument_form_data = ref(),
  instrument_form_data = ref(),
  new_calibration_form_data = ref(),
  show_new_instrument = ref(false),
  show_new_calibration = ref(false);

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
