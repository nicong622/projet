import type { Ref } from 'vue'

export default function useFetchGroups(basicGroups: Ref<GroupType[]>) {
  const renderGroups = ref<GroupType[]>([])

  function clacRangePosition(from: RangeType['from'], to: RangeType['to']) {
    const elFrom = document.getElementById(from)
    const elTo = document.getElementById(to)

    if (!elFrom || !elTo) return { x: 0, width: 0 }

    return {
      x: elFrom.offsetLeft,
      width: elTo.offsetLeft + elTo.clientWidth - elFrom.offsetLeft,
    }
  }

  function buildRenderGroups() {
    renderGroups.value = basicGroups.value.map(group => ({
      ...group,
      ranges: group.ranges.map(range => ({ ...range, ...clacRangePosition(range.from, range.to) })),
    }))
  }

  onMounted(async() => {
    await nextTick()
    buildRenderGroups()
  })

  watch(
    () => basicGroups,
    buildRenderGroups,
    { deep: true },
  )

  return {
    renderGroups,
  }
}
