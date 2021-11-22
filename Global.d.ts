interface RangeType {
  from: string
  to: string
  x: number
  width: number
  color: string
}

interface GroupType {
  name: string
  ranges: RangeType[]
}
