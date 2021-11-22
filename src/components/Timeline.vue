<script lang="ts">
import { PropType } from '@vue/runtime-core'
import { getDaysInMonth } from '~/utils/index'
import useFetchGroups from '~/composables/timeline/useFetchGroups'
import hammer from '~/directives/hammer'

const months = ['2021-10', '2021-11']

export default defineComponent({
  directives: { hammer },

  props: {
    groups: {
      type: Array as PropType<GroupType[]>,
      required: true,
      default: () => [],
    },
  },

  setup(props) {
    const { groups } = toRefs(props)
    const { renderGroups } = useFetchGroups(groups)

    return {
      renderGroups,
    }
  },

  data() {
    return {
      daysOfAllMonths: months.map(month => ({ month, days: getDaysInMonth(month) })),
    }
  },

  methods: {
    prefixZero(number: number) {
      return `00${number}`.slice(-2)
    },
  },
})
</script>

<template>
  <div class="flex">
    <div class="group-names pt-16 relative z-2">
      <div
        v-for="item in renderGroups"
        :key="item.name"
        class="inline-block sticky left-0 z-1 bg-white h-8 leading-8 px-12px"
      >
        {{ item.name }}
      </div>
    </div>

    <div class="overflow-x-auto relative pb-4">
      <div class="timeline pt-8 whitespace-nowrap">
        <template v-for="monthDays in daysOfAllMonths" :key="monthDays.month">
          <div
            v-for="day in monthDays.days"
            :id="`${monthDays.month}-${prefixZero(day)}`"
            :key="`${monthDays.month}-${prefixZero(day)}`"
            class="relative w-40px text-center leading-8 inline-block"
          >
            <span
              v-if="day === 1"
              class="absolute -top-8 leading-8 left-0 whitespace-nowrap"
            >{{ monthDays.month }}</span>
            <span class="inline-block w-1/1 border-bottom-1 border-gray-400">{{ prefixZero(day) }}</span>
          </div>
        </template>
      </div>

      <div v-if="renderGroups" class="group-list">
        <template v-for="item in renderGroups" :key="item.name">
          <div class="group-item relative h-8">
            <div
              v-for="range in item.ranges"
              :key="`${item.name}-${range.from}`"
              v-hammer
              :style="`left:${range.x}px; width:${range.width}px; background-color: ${range.color}`"
              class="timerange-item absolute top-0 h-1/1"
            />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style>
.group-names {
  box-shadow: 4px 0 5px -5px;
}
</style>
