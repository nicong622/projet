<script lang="ts">
import CreateProjectDialog from '~/components/create-project/index.vue'

export default defineComponent({
  components: {
    CreateProjectDialog,
  },

  data() {
    return {
      basicGroups: [] as GroupType[],
    }
  },

  mounted() {
    this.basicGroups = [
      {
        name: 'group1',
        ranges: [
          {
            from: '2021-10-02',
            to: '2021-10-04',
            x: 0,
            width: 0,
            color: '#FF7800',
          },
          {
            from: '2021-10-05',
            to: '2021-10-07',
            x: 0,
            width: 0,
            color: '#FFE300',
          },
        ],
      },
      {
        name: 'group2',
        ranges: [
          {
            from: '2021-10-12',
            to: '2021-10-14',
            x: 0,
            width: 0,
            color: '#FF7800',
          },
          {
            from: '2021-10-15',
            to: '2021-10-17',
            x: 0,
            width: 0,
            color: '#FFE300',
          },
        ],
      },
    ]
  },

  methods: {
    handleSubmit(payload: GroupType) {
      this.basicGroups.push(payload)
    },
  },
})
</script>

<template>
  <div>
    <Timeline :groups="basicGroups" />

    <CreateProjectDialog @submit="handleSubmit" />
  </div>
</template>
