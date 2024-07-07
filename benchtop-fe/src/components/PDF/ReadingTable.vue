<template>
  <div>
    <div class="readings">
      <table class="table table-striped">
        <thead>
        <tr>
          <th>Gauge Reading</th>
          <th>Accuracy (+/- FS)</th>
          <th>Low Limit</th>
          <th>High Limit</th>
          <th>As Found (units)</th>
          <th>OOT</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>HI?</td>
          <td>TBD</td>
          <td>TBD</td>
          <td>TBD</td>
          <td>TBD</td>
          <td>TBD</td>
        </tr>
        <tr>
          <td>TBD</td>
          <td>TBD</td>
          <td>TBD</td>
          <td>TBD</td>
          <td>TBD</td>
          <td>TBD</td>
        </tr>
        <tr>
          <td>TBD</td>
          <td>TBD</td>
          <td>TBD</td>
          <td>TBD</td>
          <td>TBD</td>
          <td>TBD</td>
        </tr>
        <tr>
          <td>TBD</td>
          <td>TBD</td>
          <td>TBD</td>
          <td>TBD</td>
          <td>TBD</td>
          <td>TBD</td>
        </tr>
        <tr>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup>
import {defineProps, ref} from "vue";

const props = defineProps({
  as_found: Object,
  as_left: Object,
});
</script>
<style scoped>
@media print {
  .custom-button {
    display: none;
  }
}

body {
  margin: 1rem;
}

h1 {
  text-align: center;
  font-size: 1.75rem;
  font-weight: bold;
}

.column img {
  width: 150px;
}

tr td {
  padding: 0 !important;
  margin: 0 !important;
}

tr th {
  padding: 0 !important;
  margin: 0 !important;
  width: 18%;
}

.table {
  font-size: 9pt;
}
</style>