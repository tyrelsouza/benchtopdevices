<template>
  <div class="card-header">Instrument</div>
  <div class="card-body">
    <table class="table">
      <tbody>
        <tr>
          <td>Serial #</td>
          <td>
            <input
              type="text"
              name="serial"
              maxlength="100"
              v-model="serial"
              required
              id="id_serial"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>
import { ref, defineEmits, watchEffect } from "vue";

const
  serial = ref("")


const emit = defineEmits();
watchEffect(() => {
  emit("instrument-form", {
    serial,
  });
});
</script>
