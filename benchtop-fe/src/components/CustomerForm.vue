<template>
  <div>
    <div class="card-header">Customer</div>
    <div class="card-body">
      <table class="table">
        <tbody>
        <tr>
          <td>Customer Name</td>
          <td>
            <input type="text" name="customer_name" maxlength="256" v-model="customer_name" required
                   id="id_customer_name">
          </td>
        </tr>
        <tr>
          <td>On Site Calibration</td>
          <td>
            <div class="checkbox-wrapper-55">
            <label class="rocker rocker-small">
              <input type="checkbox" name="onsite_cal" v-model="onsite_cal" id="id_onsite_cal">
              <span class="switch-left">Yes</span>
              <span class="switch-right">No</span>
            </label>
  </div>
          </td>
        </tr>
        <tr>
          <td>Control Doc#</td>
          <td>
            <input type="text" name="control_doc" maxlength="256" v-model="control_doc" required id="id_control_doc">
          </td>
        </tr>
        <tr>
          <td>Technician</td>
          <td>
            <input type="text" name="technician" maxlength="256" v-model="technician" required id="id_technician">
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'

const
  customer_name = ref(""),
  onsite_cal = ref(false),
  control_doc = ref(""),
  technician = ref("")

const emit = defineEmits();
watchEffect(() => {
  emit("customer-form", {
    customer_name,
    onsite_cal,
    control_doc,
    technician,
  });
});
</script>