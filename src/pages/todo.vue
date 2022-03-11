<script lang="ts">
import { defineComponent } from 'vue'
import { useTodoStore } from '~/stores/todo'

export default defineComponent({
  data() {
    const todoStore = useTodoStore()

    return {
      todos: todoStore.getTodos(),
    }
  },
})
</script>

<template>
  <div id="todo-app">
    <h1>todo-app</h1>

    <TodoItem
      v-for="item in todos"
      :id="item.id"
      :key="item.id"
      :title="item.title"
      :is-done="item.isDone"
      :children="item.children"
    >
    </TodoItem>
  </div>
</template>
