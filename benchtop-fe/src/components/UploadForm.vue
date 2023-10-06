<template>
  <div class="card-header">Report Uploads</div>
  <div class="card-body">
    <table class="table">
      <tbody>
      <tr>
        <td>Report Type</td>
        <td>
          <select name="report_type" v-model="report_type" required id="id_report_type">
            <option value="" selected>---------</option>
            <option value="TV">Transducer Verify</option>
            <option value="HC">Hardware Calibration</option>
          </select>
        </td>
      </tr>
      <tr>
        <td colspan=2>
          <ul>
            <li v-for="file in files">
              {{ file.name }}
            </li>
          </ul>
          <file-upload
              class="btn btn-primary"
              post-action="/upload/post"
              extensions="txt"
              accept="text/plain"
              :multiple="true"
              :size="1024 * 1024 * 10"
              v-model="files"
              @input-filter="inputFilter"
              @input-file="inputFile"
              ref="upload">
            <i class="fa fa-plus"></i>
            Select files
          </file-upload>

 <button type="button" class="btn btn-success" v-if="!upload || !upload.active" @click.prevent="upload.active = true">
          <i class="fa fa-arrow-up" aria-hidden="true"></i>
          Start Upload
        </button>
        <button type="button" class="btn btn-danger"  v-else @click.prevent="upload.active = false">
          <i class="fa fa-stop" aria-hidden="true"></i>
          Stop Upload
        </button>

        </td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td align="right">
          <input type="submit" value="Generate PDF and Label">
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import {ref} from 'vue'
import VueUploadComponent from 'vue-upload-component'

export default {
  name: 'UploadForm',
  data: function () {
    return {
      report_type: "",
      files: [],
      upload: ref(null),
    }
  },
  components: {
    FileUpload: VueUploadComponent
  },
  methods: {
    /**
     * Has changed
     * @param  Object|undefined   newFile   Read only
     * @param  Object|undefined   oldFile   Read only
     * @return undefined
     */
    inputFile: function (newFile, oldFile) {
      if (newFile && oldFile && !newFile.active && oldFile.active) {
        // Get response data
        console.log('response', newFile.response)
        if (newFile.xhr) {
          //  Get the response status code
          console.log('status', newFile.xhr.status)
        }
      }
    },
    /**
     * Pretreatment
     * @param  Object|undefined   newFile   Read and write
     * @param  Object|undefined   oldFile   Read only
     * @param  Function           prevent   Prevent changing
     * @return undefined
     */
    inputFilter: function (newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        // Filter non-image file
        if (!/\.(txt)$/i.test(newFile.name)) {
          return prevent()
        }
      }

      // Create a blob field
      newFile.blob = ''
      let URL = window.URL || window.webkitURL
      if (URL && URL.createObjectURL) {
        newFile.blob = URL.createObjectURL(newFile.file)
      }
    }
  }
}
</script>