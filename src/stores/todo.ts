import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todo', {
  state: () => {
    return {
      todos: {
        root: {
          id: 'root',
          parent: null,
          title: '',
          isDone: false,
          childrenIds: ['todo1', 'todo3'],
        },
        todo1: {
          id: 'todo1',
          title: 'todo1',
          parent: 'root',
          isDone: false,
          childrenIds: ['todo2'],
        },
        todo2: {
          id: 'todo2',
          title: 'todo2',
          parent: 'todo1',
          isDone: false,
          childrenIds: [],
        },
        todo3: {
          id: 'todo3',
          title: 'todo3',
          parent: 'root',
          isDone: false,
          childrenIds: [],
        },
      },
    }
  },

  actions: {
    getTodos() {
      const todos = this.todos

      function dfs(node: TodoItemPropsInStore): TodoItemProps {
        const children = node.childrenIds.reduce<TodoItemProps[]>((prev, id) => {
          const item: TodoItemPropsInStore = todos[id as keyof typeof todos]

          if (!item) return prev

          return [...prev, dfs(item)]
        }, [])

        return { ...node, children }
      }

      return dfs(todos.root).children
    },

    addNewTodo() {

    },
  },
})
