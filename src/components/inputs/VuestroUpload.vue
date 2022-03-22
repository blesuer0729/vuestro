<template>
  <vuestro-tray class="vuestro-upload"
                :stretch="stretch"
                :variant="variant"
                :size="size">
    <template #title>
      <slot name="title">Upload</slot>
    </template>
    <vuestro-container gutter="none" justify="flex-end" align="center" overflow-hidden>
      <div class="vuestro-upload-files">
        <div class="vuestro-upload-file"
             v-for="(f, idx) in files" :key="f.name">
          <div class="vuestro-upload-file-name">{{ f.name }}</div>
          <template v-if="previews && f.type.startsWith('image/')">
            <img v-if="fileData[idx]" :src="fileData[idx]"/>
            <vuestro-icon v-else name="spinner" pulse></vuestro-icon>
          </template>
        </div>
      </div>
      <label :for="id">
        <vuestro-button :size="size"
                        round no-border>
          <vuestro-icon name="folder-open"></vuestro-icon>
        </vuestro-button>
      </label>
      <input v-if="showInput"
             :id="id"
             ref="theInput"
             class="vuestro-upload-input"
             type="file"
             :multiple="multiple"
             :accept="accept"
             @change="onFileSelect"/>
      <vuestro-button v-if="files.length > 0"
                      round
                      no-border
                      variant="danger"
                      size="sm"
                      @click="reset">
        <vuestro-icon name="trash"></vuestro-icon>
      </vuestro-button>
     </vuestro-container>
  </vuestro-tray>
</template>

<script>

export default {
  name: 'VuestroUpload',
  props: {
    size: { type: String, default: 'md' },
    variant: { type: String, default: 'outline' },
    stretch: { type: Boolean, default: false },
    accept: { type: String, default: '' },
    multiple: { type: Boolean, default: false },
    previews: { type: Boolean, default: true },
  },
  data() {
    return {
      id: this.vuestroGenerateId(8), // random id to link the input[file] to the label
      showInput: true,
      files: [],
      fileData: [],
    };
  },
  methods: {
    onFileSelect(e) {
      this.files = [];
      for (let f of e.target.files) {
        this.files.push(f);
      }
      this.fileData = [];

      for (let f of this.files) {
        let fd = new FormData();
        fd.append('vuestroUpload', f);

        if (this.previews) {
          let fr = new FileReader();
          fr.onload = (e) => {
            this.fileData.push(e.target.result);
          };
          fr.readAsDataURL(fd.get('vuestroUpload'));
        }
      }
      this.$emit('files', this.files);
    },
    reset() {
      this.files = [];
      this.fileData = [];
      this.showInput = false;
      this.$nextTick(() => {
        this.showInput = true;
        this.$emit('files', null);
      });
    },
  },
};

</script>

<style>

.vuestro-app {
  --vuestro-upload-min-width: 300px;
  --vuestro-upload-preview-width: 3em;
}

</style>

<style scoped>

.vuestro-upload {
  min-width: var(--vuestro-upload-min-width);
  padding-right: 0.2em;
  overflow: hidden;
}

.vuestro-upload-input {
  display: none;
  color: var(--vuestro-text-color);
}

.vuestro-upload-filenames {
  font-size: 0.8em;
  margin: 0 0.6em;
}

.vuestro-upload-files {
  margin: 0.2em 0.5em;
  overflow: hidden;
}
.vuestro-upload-file {
  display: flex;
  align-items: center;
  direction: rtl;
}
.vuestro-upload-file > img {
  margin: 0 0.5em;
  height: auto;
  width: var(--vuestro-upload-preview-width);
}
.vuestro-upload-file > .vuestro-icon {
  width: var(--vuestro-upload-preview-width);
  height: calc(var(--vuestro-upload-preview-width));
}

.vuestro-upload-file-name {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

</style>