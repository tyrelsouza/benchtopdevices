<template>
  <div class="card-header">Instrument</div>
  <div class="card-body">
    <table class="table">
      <tbody>

      <tr>
        <td><h3>Calibration Date</h3>
          <VueDatePicker v-model="instrument_calibration_date" inline auto-apply :flow="flow"></VueDatePicker>
        </td>
        <td><h3>Calibration Due Date</h3>
          <VueDatePicker v-model="instrument_calibration_due_date" inline auto-apply :flow="flow"></VueDatePicker>
        </td>
      </tr>
      <tr>
        <td>Model</td>
        <td>
          <input type="text" name="instrument_model" maxlength="256" v-model="instrument_model" required
                 id="id_instrument_model">
        </td>
      </tr>
      <tr>
        <td>Serial Number</td>
        <td>
          <input type="text" name="serial_number" maxlength="256" v-model="serial_number" required
                 id="id_serial_number">
        </td>
      </tr>
      <tr>
        <td>Channel</td>
        <td>
          <input type="text" name="channel" maxlength="256" v-model="channel" required id="id_channel">
        </td>
      </tr>
      <tr>
        <td>Transducer Model</td>
        <td>
          <input type="text" name="transducer_model" maxlength="256" v-model="transducer_model" required
                 id="id_transducer_model">
        </td>
      </tr>
      <tr>
        <td>Transducer Span</td>
        <td>
          <input type="text" name="transducer_span" maxlength="256" v-model="transducer_span" required
                 id="id_transducer_span">
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
  name: 'InstrumentForm',
  data() {
    return {
      channel: "",
      serial_number: "",
      instrument_model: "",
      transducer_model: "",
      transducer_span: "",
      instrument_calibration_due_date: "",
      instrument_calibration_date: "",
      flow: ['year', 'month', 'calendar']
    }
  },
}
</script>