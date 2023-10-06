<template>
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
          <input type="checkbox" name="onsite_cal" v-model="onsite_cal" id="id_onsite_cal">
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
</template>

<script setup>
import { ref, defineProps } from 'vue'

const customer_name = ref("")
const onsite_cal = ref(false)
const control_doc = ref("")
const technician = ref("")
</script>