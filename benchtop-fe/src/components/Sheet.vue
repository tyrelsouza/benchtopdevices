<template>
  <div>
    <div class="item card">
      <UploadForm />
    </div>
  </div>

  <div class="container">
    <div class="item card">
      <CustomerForm />
    </div>
    <div class="item card">
      <EnvironmentForm />
    </div>

    <div class="item card">
      <NewInstrumentForm />
    </div>
    <div class="item card">
      <NewCalibrationDeviceForm />
    </div>
  </div>
</template>

<script setup>
import CustomerForm from "./CustomerForm.vue";
import NewInstrumentForm from "./Instrument/NewInstrumentForm.vue";
import NewCalibrationDeviceForm from "./CalibrationDevice/NewCalibrationDeviceForm.vue";
import EnvironmentForm from "./EnvironmentForm.vue";
import UploadForm from "./UploadForm.vue";
</script>