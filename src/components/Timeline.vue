<script setup lang="ts">
import { getDaysInMonth } from '~/utils/index'
import useFetchGroups from '~/composables/timeline/useFetchGroups'

const months = ['2021-10', '2021-11']
const daysOfAllMonths = months.map(month => ({ month, days: getDaysInMonth(month) }))

const { renderGroups } = useFetchGroups()
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
            :id="`${monthDays.month}-${day}`"
            :key="`${monthDays.month}-${day}`"
            class="relative w-50px text-center leading-8 inline-block"
          >
            <span
              v-if="day === 1"
              class="absolute -top-8 leading-8 left-0 whitespace-nowrap"
            >{{ monthDays.month }}</span>
            <span class="inline-block w-1/1 border-bottom-1 border-gray-400">{{ day }}</span>
          </div>
        </template>
      </div>

      <div v-if="renderGroups" class="group-list">
        <template v-for="item in renderGroups" :key="item.name">
          <div class="group-item relative h-8">
            <div
              v-for="range in item.ranges"
              :key="`${item.name}-${range.from}`"
              class="timerange-item absolute top-0 bg-gray-200 h-1/1"
              :style="`left:${range.x}px; width:${range.width}px`"
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
