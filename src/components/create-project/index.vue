<template>
  <el-button type="primary" @click="showDialog">
    新建项目
  </el-button>

  <el-dialog v-model="visible">
    <CreateProjectForm @submit="onFormSubmit" />
  </el-dialog>
</template>

<script lang="ts">
import CreateProjectForm from './Form.vue'

export default defineComponent({
  components: {
    CreateProjectForm,
  },

  emits: ['submit'],

  data() {
    return {
      visible: false,
    }
  },

  methods: {
    showDialog() {
      this.visible = true
    },

    onFormSubmit($event: any) {
      this.visible = false
      this.$emit('submit', $event)
    },
  },
})
</script>
