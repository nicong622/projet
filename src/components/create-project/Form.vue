<template>
  <el-form :model="form">
    <el-form-item prop="name" label="项目名">
      <el-input v-model="form.name"></el-input>
    </el-form-item>

    <template v-for="(range, index) in ranges" :key="index">
      <el-form-item :label="`时间段 ${index + 1}`">
        <el-date-picker
          v-model="range.range"
          type="daterange"
          value-format="YYYY-MM-DD"
        ></el-date-picker>
      </el-form-item>
    </template>

    <el-form-item>
      <el-button @click="addRange">
        添加时间段
      </el-button>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submit">
        确定
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
export default defineComponent({
  name: 'CreateProjectForm',

  emits: ['submit'],

  data() {
    return {
      form: {
        name: '',
        ranges: [],
      } as GroupType,
      ranges: [{ range: [] }],
    }
  },

  methods: {
    addRange() {
      this.ranges.push({ range: [] })
    },

    submit() {
      this.ranges.forEach(({ range }) => {
        this.form.ranges.push({
          from: range[0],
          to: range[1],
          width: 0,
          x: 0,
          color: '#FF7800',
        })
      })

      this.$emit('submit', this.form as GroupType)
    },
  },
})
</script>
