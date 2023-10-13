<template>
  <div class="card-header">Report Uploads</div>
  <div class="card-body">
    <table class="table">
      <tbody>
        <tr>
          <td>
            Report Type
            <select
              name="report_type"
              v-model="report_type"
              required
              id="id_report_type"
            >
              <option value="-" selected>----Select-----</option>
              <option value="Transducer Verify">Transducer Verify</option>
              <option value="Hardware Calibration">Hardware Calibration</option>
            </select>
          </td>
        </tr>
        <tr v-if="report_type != '-' || showUpload">
          <td>
            <button
              class="custom-button"
              @click="openFileInput"
              v-if="showUpload"
            >
              Select {{ report_type }} File
            </button>
          </td>
        </tr>
        <tr v-if="files.length > 0">
          <td>
            <ul>
              <li v-for="(file, index) in files" :key="index" class="file-list">
                <button class="custom-button red" @click="removeUpload(index)">
                  X
                </button>
                <span>{{ file.name }}</span>
                <div class="kind btn-group">
                  <input
                    type="radio"
                    class="btn-check"
                    :id="'both_kind_' + index"
                    :name="'kind_' + index"
                    value="both"
                    @change="kindChange('both', file)"
                  />
                  <label class="btn btn-primary" :for="'both_kind_' + index"> Both </label>

                  <input
                    type="radio"
                    class="btn-check"
                    :id="'af_kind_' + index"
                    :name="'kind_' + index"
                    value="found"
                    @change="kindChange('found', file)"
                  />
                  <label class="btn btn-primary" :for="'af_kind_' + index">
                    As Found
                  </label>
                  <input
                    type="radio"
                    class="btn-check"
                    :id="'al_kind_' + index"
                    :name="'kind_' + index"
                    value="left"
                    @change="kindChange('left', file)"
                  />
                  <label class="btn btn-primary" :for="'al_kind_' + index"> As Left </label>
                </div>
              </li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
    <input
      ref="doc"
      type="file"
      style="display: none"
      @change="readFile($event)"
    />
  </div>
</template>

<script setup>
import { ref, computed, watchEffect } from "vue";

const report_type = ref("-"),
  files = ref([]),
  current_file = ref(null),
  doc = ref();

const showUpload = computed({
  get() {
    /// default select
    if (report_type.value === "-") {
      return false;
    }

    // no more more than 2 files
    if (files.value.length >= 2) {
      return false;
    }

    // if the first item is both, disable upload
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

<style scoped>
ul {
  list-style-type: none;
  padding-left: 0;
}
button {
  margin-right: 0.5rem;
}
.kind {
  margin-top: 0.5rem;
}
</style>
