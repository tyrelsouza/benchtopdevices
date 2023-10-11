<template>
  <div class="card-header">Finished?</div>
  <div class="card-body">
    <button  class="custom-button" @click="exportToPDF">Generate PDF and Label</button>
        {{ i_date() }}, {{ i_due_date() }}
    <div :class="{ hide: hide }">
    <div id="pdf" ref="document">
      <div class="header">
        <div class="flex-container">
          <div class="column pct-25">
            <img :src="BenchTopLogoUrl" />
          </div>
          <div class="column pct-50">
            <div>Customer: {{props.customer?.customer_name}}</div>
            <div>Onsite cal (yes/no): {{onsite()}}</div>
            <div>Control Doc#: {{props.customer?.control_doc}}</div>
            <div>Technician: {{props.customer?.technician}}</div>
          </div>
          <div class="column pct-25">
            <img :src="Al2pCertUrl" />
          </div>
        </div>
      </div>
      <!-- EndHeader -->
      <h1>Calibration Certificate</h1>

      <!-- Instrument Info -->
      <div class="instrument-information">
        <div class="flex-container">
          <div class="column pct-33">
            <div><span class="ul">Instrument</span></div>
            <div><span class="label">Model :</span>{{props.instrument?.model}}</div>
            <div><span class="label">Serial# :</span>{{props.instrument?.serial_number}}</div>
            <div><span class="label">Channel :</span>{{props.instrument?.channel}}</div>
            <div><span class="label">Transducer Model :</span>{{props.instrument?.transducer_model}}</div>
            <div><span class="label">Transducer Span :</span>{{props.instrument?.transducer_span}}</div>
          </div>
          <div class="column pct-33">
            <div><span class="ul">Primary Cal Device</span></div>
            <div><span class="label">Model :</span>{Model}</div>
            <div><span class="label">Serial# :</span>{Serial_no}</div>
            <div><span class="label">Cal Date :</span>{Cal Date}</div>
            <div><span class="label">Cal Due Date :</span>{Serial_no}</div>
            <div><span class="label">Cert ID :</span>{Cert ID}</div>
          </div>
          <div class="column pct-33">
            <div><span class="label">Cal Date :</span>{{i_date()}}</div>
            <div><span class="label">Cal Due Date :</span>{{i_due_date()}}</div>
            <div><span class="ul">Environmental Data</span></div>
            <div><span class="label">Baro (Psi) :</span>{Baro}</div>
            <div><span class="label">Temp (&deg;F):</span>{Temp}</div>
            <div><span class="label">Humidity (%RH):</span>{Humidity}</div>
          </div>
        </div>
      </div>
      <br />
      <!-- End InstrumentInfo -->
      <!-- As Found -->
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
              <td>-12.500</td>
              <td>0.050%</td>
              <td>-12.510</td>
              <td>-12.490</td>
              <td>-12.500</td>
              <td>0</td>
            </tr>
            <tr>
              <td>-12.500</td>
              <td>0.050%</td>
              <td>-12.510</td>
              <td>-12.490</td>
              <td>-12.500</td>
              <td>0</td>
            </tr>
            <tr>
              <td>-12.500</td>
              <td>0.050%</td>
              <td>-12.510</td>
              <td>-12.490</td>
              <td>-12.500</td>
              <td>0</td>
            </tr>
            <tr>
              <td>-12.500</td>
              <td>0.050%</td>
              <td>-12.510</td>
              <td>-12.490</td>
              <td>-12.500</td>
              <td>0</td>
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
            </tr><tr>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr><tr>
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
      <br />
      <!-- As Left -->
      <div class="readings">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Gauge Reading</th>
              <th>Accuracy (+/- FS)</th>
              <th>Low Limit</th>
              <th>High Limit</th>
              <th>As Left (units)</th>
              <th>OOT</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>-12.500</td>
              <td>0.050%</td>
              <td>-12.510</td>
              <td>-12.490</td>
              <td>-12.500</td>
              <td>0</td>
            </tr>
            <tr>
              <td>-12.500</td>
              <td>0.050%</td>
              <td>-12.510</td>
              <td>-12.490</td>
              <td>-12.500</td>
              <td>0</td>
            </tr>
            <tr>
              <td>-12.500</td>
              <td>0.050%</td>
              <td>-12.510</td>
              <td>-12.490</td>
              <td>-12.500</td>
              <td>0</td>
            </tr>
            <tr>
              <td>-12.500</td>
              <td>0.050%</td>
              <td>-12.510</td>
              <td>-12.490</td>
              <td>-12.500</td>
              <td>0</td>
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
      <!-- End Instruments-->
      <div class="box">
        <p>
          Secondary Cal Device (For Environmental Data): EXTECH S/N A23050006 Cert
          # 1535483 07/24/23 (Cal Date) (Precision Psychrometer)
        </p>
        <p>
          Uncertainty Statement: The accuracy of measurement is determined by the
          standards uncertainty, with a coverage factor of k=2 (confidence of
          roughly 95%).
        </p>
      </div>
    </div>
  </div>
  </div>
</template>

<script setup>
import {ref, defineProps} from "vue"
import { format } from 'date-fns';
import html2pdf from "html2pdf.js";
import BenchTopLogoUrl from "../../assets/BenchTopLogo.png";
import Al2pCertUrl from "../../assets/al2pCert.png";
const hide = ref(true);

const props = defineProps({
  upload: Object,
  customer: Object,
  environment: Object,
  instrument: Object,
  calibration: Object
})

const onsite = () => {
  return props.customer?.onsite_cal ? "Yes" : "No"
}

const i_date = () => {
  if (props.instrument?.date === undefined){
    return
  }
  const date = props.instrument.date
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based, so we add 1
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}/${month}/${day}`
}

const i_due_date = () => {
  if (props.instrument?.due_date === undefined){
    return
  }
  const date = props.instrument.due_date
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based, so we add 1
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}/${month}/${day}`
}

const exportToPDF = () => {
  const element = document.getElementById("pdf")
  var opt = {
    margin:       0.4,
    filename:     'myfile.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2 },
    jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
  };
  html2pdf().from(element).set(opt).save();
};
</script>

<style scoped>
@media print {
  .custom-button {
    display: none;
  }
}
body {
  margin:1rem;
}

.hide {
  display: none;
}
.pdf-container {
  max-width:960px;
  margin: auto;
}
h1 {
  text-align: center;
  font-size: 1.75rem;
  font-weight: bold;
}
.ul {
  font-size: 12pt;
  text-decoration: underline;
}
.box {
  border: 1px solid;
}
.label {
  font-size: 12pt;
  font-weight: bold;
  padding-right: 0.25rem;
}
.flex-container {
  display: flex;
  justify-content: space-between;
}

.instrument-information {
  font-size: 8pt;
}


.pct-50 {
  width: 45%;
}
.pct-33 {
  width: 33%;
}
.pct-25 {
  width: 25%;
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
