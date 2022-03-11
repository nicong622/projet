<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    id: String,
    isDone: Boolean,
    title: String,
    children: Array as PropType<TodoItemProps[]>,
  },
})
</script>

<template>
  <div class="todo-item pt-1 px-2">
    <div class="header">
      <input :id="id" type="checkbox" :name="id" :checked="isDone">
      <label :for="id">{{ title }}</label>
    </div>

    <div class="children pl-4">
      <TodoItem
        v-for="subitem in children"
        :id="subitem.id"
        :key="subitem.id"
        :title="subitem.title"
        :is-done="subitem.isDone"
        :children="subitem.children"
      ></TodoItem>
    </div>
  </div>
</template>
