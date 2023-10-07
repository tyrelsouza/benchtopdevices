<template>
  <div class="card-header">Report Uploads</div>
  <div class="card-body">
    <table class="table">
      <tbody>
        <tr>
          <td>Report Type</td>
          <td>
            <select
              name="report_type"
              v-model="report_type"
              required
              id="id_report_type"
            >
              <option value="" selected>---------</option>
              <option value="TV">Transducer Verify</option>
              <option value="HC">Hardware Calibration</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>
            <button class="button" @click="openFileInput" v-if="showUpload">
              Select File
            </button>
          </td>
          <td>
            <ul>
              <li v-for="(file, index) in files" :key="index">
                <button @click="removeUpload(index)">x</button>
                {{ file.name }}
                <label>
                  <input
                    type="radio"
                    name="alignment"
                    value="both"
                    @change="kindChange('both', file)"
                  />
                  Both
                </label>
                <label>
                  <input
                    type="radio"
                    name="alignment"
                    value="left"
                    @change="kindChange('left', file)"
                  />
                  As Left
                </label>
                <label>
                  <input
                    type="radio"
                    name="alignment"
                    value="found"
                    @change="kindChange('found', file)"
                  />
                  As Found
                </label>
              </li>
            </ul>

            <input
              ref="doc"
              type="file"
              style="display: none"
              @change="readFile($event)"
            />
          </td>
        </tr>
        <tr>
          <td>&nbsp;</td>
          <td align="right">
            <input type="submit" value="Generate PDF and Label" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed, watchEffect } from "vue";

const report_type = ref("");
const files = ref([]);
const current_file = ref(null);
const doc = ref();

const showUpload = computed({
  get() {
    if (files.length > 2) {
      return false;
    }
    if (files.value.length > 0 && files.value[0].kind == "both") {
      return false;
    }

    return true;
  },
});

const openFileInput = () => {
  // Trigger a click event on the file input element
  doc.value.click();
};

const kindChange = (opt, file) => {
  // Change the file kind metadata, (both, as found, as left) for the uploaded file
  file.kind = opt;
  console.log(file);
};

const removeUpload = (index) => {
  files.value.splice(index, 1);
};

const readFile = ($event) => {
  const target = $event.target;
  if (target && target.files) {
    current_file.value = target.files[0];
  }
  if (!current_file.value.name.includes(".txt")) {
    return;
  }
  const reader = new FileReader();
  reader.onload = (res) => {
    let content = res.target.result;
    files.value.push({
      name: current_file.value.name,
      value: content,
      kind: "",
    });
  };
  reader.onerror = (err) => console.log(err);
  reader.readAsText(current_file.value);
  doc.value.value = null;
};

const emit = defineEmits();
watchEffect(() => {
  emit("upload-form", {
    report_type,
    files,
  });
});
</script>
