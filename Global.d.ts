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

interface TodoItemProps {
  id: string
  parent: string | null
  title: string
  isDone: boolean
  children: TodoItemProps[]
}

type TodoItemPropsInStore = Omit<TodoItemProps, 'children'> & {
  childrenIds: string[]
}
