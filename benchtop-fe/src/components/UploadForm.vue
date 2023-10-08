d ..<template>
  <div class="card-header">Report Uploads</div>
  <div class="card-body">
    <table class="table">
      <tbody>
        <tr>
          <td>Report Type
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
        <tr v-if="showUpload">
          <td>
            <button class="custom-button" @click="openFileInput" v-if="showUpload">
              Select First File
            </button>

          </td>
        </tr>
        <tr v-if="files.length > 0">
          <td>
            <ul>
              <li v-for="(file, index) in files" :key="index" class="file-list">
                <button class="custom-button red" @click="removeUpload(index)">x</button>
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

          </td>
        </tr>
        <tr>
          <td>
            <input class="custom-button" type="submit" value="Generate PDF and Label" />
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

const report_type = ref(""),
  files = ref([]),
  current_file = ref(null),
  doc = ref();

const showUpload = computed({
  get() {
    console.log(files.value.length)
    if (files.value.length >= 2) {
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
