<script setup>
import CustomerForm from "./CustomerForm.vue";
import InstrumentForm from "./InstrumentForm.vue";
import CalibrationDeviceForm from "./CalibrationDeviceForm.vue";
import EnvironmentForm from "./EnvironmentForm.vue";
import UploadForm from "./UploadForm.vue";

</script>

<template>
  <div>
    <div class="item card">
      <UploadForm/>
    </div>
  </div>
  <div class="container">
    <div class="item card">
      <CustomerForm/>
    </div>
    <div class="item card">
      <EnvironmentForm/>
    </div>

    <div class="item card">
      <InstrumentForm/>
    </div>
    <div class="item card">
      <CalibrationDeviceForm/>
    </div>
  </div>
</template>
