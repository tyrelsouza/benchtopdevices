<template>
  <div class="card-header">Primary Calibration Device</div>
  <div class="card-body">
    <table class="table">
      <tbody>
      <tr>
        <td><h3>Calibration Date</h3>
          <VueDatePicker v-model="calibration_date" inline auto-apply :flow="flow"></VueDatePicker>
        </td>
        <td><h3>Calibration Due Date</h3>
          <VueDatePicker v-model="calibration_due_date" inline auto-apply :flow="flow"></VueDatePicker>
        </td>
      </tr>
      <tr>
        <td>Model</td>
        <td>
          <input type="text" name="calibration_model" maxlength="100" v-model="calibration_model" required
                 id="id_calibration_model">
        </td>
      </tr>
      <tr>
        <td>Serial #</td>
        <td>
          <input type="text" name="calibration_serial" maxlength="100" v-model="calibration_serial" required
                 id="id_calibration_serial">
        </td>
      </tr>

      <tr>
        <td>Cert ID</td>
        <td>
          <input type="text" name="calibration_cert_id" maxlength="100" v-model="calibration_cert_id" required
                 id="id_calibration_cert_id">
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

export default {
  components: {VueDatePicker},
  name: 'CalibrationDeviceForm',
  data() {
    return {
      calibration_model: "",
      calibration_serial: "",
      calibration_cert_id: "",
      calibration_due_date: "",
      calibration_date: "",
      flow: ['year', 'month', 'calendar']
    }
  },
}
</script>