<template>
  <div class="card-header">Finished?</div>
  <div class="card-body">
    <button class="custom-button" @click="exportToPDF">
      Generate PDF and Label
    </button>
    <br>
    <br>
    <div :class="{ hide: hide }" class="px666">
      <div v-for="table of tables">
        <div id="pdf" ref="document">
          <div class="header">
            <div class="flex-container">
              <div class="column pct-25">
                <img :src="BenchTopLogoUrl"/>
              </div>
              <div class="column pct-50">
                <div>Customer: {{ props.customer?.customer_name }}</div>
                <div>Onsite cal (yes/no): {{ onsite() }}</div>
                <div>Control Doc#: {{ props.customer?.control_doc }}</div>
                <div>Technician: {{ props.customer?.technician }}</div>
              </div>
              <div class="column pct-25">
                <img :src="Al2pCertUrl"/>
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
                <div>
                  <span class="label">Model :</span>{{ props.instrument?.model }}
                </div>
                <div>
                <span class="label">Serial# :</span
                >{{ props.instrument?.serial_number }}
                </div>
                <div>
                <span class="label">Channel :</span
                >{{ props.instrument?.channel }}
                </div>
                <div>
                <span class="label">Transducer Model :</span
                >{{ props.instrument?.transducer_model }}
                </div>
                <div>
                <span class="label">Transducer Span :</span
                >{{ props.instrument?.transducer_span }}
                </div>
              </div>
              <div class="column pct-33">
                <div><span class="ul">Primary Cal Device</span></div>
                <div>
                  <span class="label">Model :</span>{{ props.calibration?.model }}
                </div>
                <div>
                <span class="label">Serial# :</span
                >{{ props.calibration?.serial }}
                </div>
                <div><span class="label">Cal Date :</span>{{ c_date() }}</div>
                <div>
                  <span class="label">Cal Due Date :</span>{{ c_due_date() }}
                </div>
                <div>
                <span class="label">Cert ID :</span
                >{{ props.calibration?.cert_id }}
                </div>
              </div>
              <div class="column pct-33">
                <div><span class="label">Cal Date :</span>{{ i_date() }}</div>
                <div>
                  <span class="label">Cal Due Date :</span>{{ i_due_date() }}
                </div>
                <div><span class="ul">Environmental Data</span></div>
                <div>
                <span class="label">Baro (Psi) :</span
                >{{ props.environment?.pressure }}
                </div>
                <div>
                <span class="label">Temp (&deg;F):</span
                >{{ props.environment?.temperature }}
                </div>
                <div>
                <span class="label">Humidity (%RH):</span
                >{{ props.environment?.humidity }}
                </div>
              </div>
            </div>
          </div>
          <br/>
          <!-- End InstrumentInfo -->
          <!-- As Found -->
          <ReadingTable />
          <br/>
          <!-- As Left -->
          <ReadingTable />
          <!-- End Instruments-->
          <div class="box">
            <p>
              Secondary Cal Device (For Environmental Data): EXTECH S/N A23050006
              Cert # 1535483 07/24/23 (Cal Date) (Precision Psychrometer)
            </p>
            <p>
              Uncertainty Statement: The accuracy of measurement is determined by
              the standards uncertainty, with a coverage factor of k=2 (confidence
              of roughly 95%).
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div>
    {{ output() }}
  </div>
</template>

<script setup>
import {defineProps, ref} from "vue";
import html2pdf from "html2pdf.js";
import BenchTopLogoUrl from "../../assets/BenchTopLogo.png";
import Al2pCertUrl from "../../assets/al2pCert.png";

import ParseTransducer from "../../parsers/Transducer"
import ParseHardwareCalibration from "../../parsers/Hardware.js"
import ReadingTable from "./ReadingTable.vue";

const hide = ref(false);
const tables = ref([])

const props = defineProps({
  upload: Object,
  customer: Object,
  environment: Object,
  instrument: Object,
  calibration: Object,
});

const onsite = () => {
  return props.customer?.onsite_cal ? "Yes" : "No";
};

const i_date = () => {
  if (props.instrument === undefined) {
    return
  }
  if (props.instrument.date === undefined) {
    return
  }
  const d = props.instrument.date
  const year = d.getFullYear();
  const month = (d.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based, so we add 1
  const day = d.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};


const i_due_date = () => {
  if (props.instrument?.due_date === undefined) {
    return;
  }
  const d = props.instrument.due_date
  const year = d.getFullYear();
  const month = (d.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based, so we add 1
  const day = d.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const c_date = () => {
  if (props.calibration?.date === undefined) {
    return;
  }
  const d = props.calibration.date
  const year = d.getFullYear();
  const month = (d.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based, so we add 1
  const day = d.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};
const c_due_date = () => {
  if (props.calibration?.due_date === undefined) {
    return;
  }
  const d = props.calibration.due_date
  const year = d.getFullYear();
  const month = (d.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based, so we add 1
  const day = d.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const exportToPDF = () => {
  const element = document.getElementById("pdf");
  var opt = {
    margin: 0.4,
    filename: `${props.instrument.model}_${i_date()}.pdf`,
    image: {type: "jpeg", quality: 0.98},
    html2canvas: {scale: 2},
    jsPDF: {unit: "in", format: "letter", orientation: "portrait"},
  };
  html2pdf().from(element).set(opt).save();
};

const output = () => {
  let content = ""
  tables.value = []

  if (props.upload !== undefined && props.upload.files.length > 0) {
    const acc = props.environment.accuracy
    if (props.upload.report_type === "Transducer Verify") {
      for (const idx in props.upload.files) {
        content = ParseTransducer(props.upload.files[idx]["value"], acc)
        tables.value = [...tables.value, ...content]
      }
    } else if (props.upload.report_type === "Hardware Calibration") {
      for (const idx in props.upload.files) {
        content = ParseHardwareCalibration(props.upload.files[idx]["value"], acc)
        tables.value = [...tables.value, ...[content]]
      }
    }
  }

  return tables
}


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

.hide {
  display: none;
}

.pdf-container {
  max-width: 960px;
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
