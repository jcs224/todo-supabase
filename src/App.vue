<template>
  <div class="bg-gray-200 h-screen p-2">
    <h1 class="text-3xl text-center">Todos</h1>
    <div class="flex mt-2">
      <div class="rounded flex w-full h-8">
        <button class="bg-blue-500 text-white w-full rounded-l">Remaining</button>
        <button class="bg-white text-gray-500 w-full rounded-r">Completed</button>
      </div>
    </div>
    <ul class="mt-4">
      <li v-for="(todo, index) in todos" :key="index" class="flex mt-2">
        <div
          class="bg-white py-2 px-3 flex items-center rounded-l flex-1"
        >
          <input type="checkbox" class="mr-3">
          <span class="mt-1">
            {{ todo.text }}
          </span>
        </div>
        <button 
          class="bg-red-400 text-white rounded-r px-2 py-3"
          @click="deleteTodo(index)"
        >delete</button>
      </li>
    </ul>
    <div 
      class="flex mt-2"
      v-if="adding"
    >
      <input 
        type="text" 
        class="bg-white w-full rounded-l p-2"
        v-model="newTodoText"
      >
      <button 
        class="bg-red-400 text-white py-2 px-3" 
        @click="adding = false"
      >Cancel</button>
      <button 
        class="bg-green-400 text-white py-2 px-3 rounded-r"
        @click="addTodo()"
      >Add</button>
    </div>
    <button 
      class="bg-green-400 text-white py-2 px-3 w-full rounded mt-2"
      v-else
      @click="adding = true"
    >Add</button>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      adding: false,
      newTodoText: '',
      todos: [
        {
          text: 'Learn supabase',
          completed: false,
        },
        {
          text: 'Profit 🤑🤑🤑',
          completed: false
        }
      ]
    }
  },

  methods: {
    addTodo() {
      this.todos.push({
        text: this.newTodoText,
        completed: false
      })
      this.newTodoText = ''
      this.adding = false
    },

    deleteTodo(index) {
      this.todos.splice(index, 1)
    }
  }
}
</script>
