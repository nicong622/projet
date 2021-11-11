export interface RangeType {
  from: string
  to: string
  x: number
  width: number
}

export interface GroupType {
  name: string
  ranges: RangeType[]
}

export default function useFetchGroups() {
  const basicGroups: GroupType[] = [
    {
      name: 'group1',
      ranges: [
        {
          from: '2021-10-2',
          to: '2021-10-4',
          x: 0,
          width: 0,
        },
        {
          from: '2021-10-5',
          to: '2021-10-7',
          x: 0,
          width: 0,
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
        },
        {
          from: '2021-10-15',
          to: '2021-10-17',
          x: 0,
          width: 0,
        },
      ],
    },
  ]
  const renderGroups = ref(basicGroups)

  function clacRangePosition(from: RangeType['from'], to: RangeType['to']) {
    const elFrom = document.getElementById(from)
    const elTo = document.getElementById(to)

    if (!elFrom || !elTo) return { x: 0, width: 0 }

    return { x: elFrom.offsetLeft, width: elTo.offsetLeft + elTo.clientWidth - elFrom.offsetLeft }
  }

  function buildRenderGroups(groups: GroupType[]) {
    return groups.map(group => ({
      ...group,
      ranges: group.ranges.map(range => ({ ...range, ...clacRangePosition(range.from, range.to) })),
    }))
  }

  onMounted(async() => {
    await nextTick()
    renderGroups.value = buildRenderGroups(basicGroups)
  })

  return {
    renderGroups,
  }
}
