<template>
  <div class="bg-gray-200 h-screen p-2">
    <h1 class="text-3xl text-center">Todos</h1>
    <div class="flex mt-2">
      <div class="rounded flex w-full h-8">
        <button 
          class="w-full rounded-l"
          :class="[page == 'uncompleted' ? 'bg-blue-500 text-white' : 'bg-white text-gray-500']"
          @click="page = 'uncompleted'"
        >Remaining</button>
        <button 
          class="w-full rounded-r"
          :class="[page == 'completed' ? 'bg-blue-500 text-white' : 'bg-white text-gray-500']"
          @click="page = 'completed'"
        >Completed</button>
      </div>
    </div>
    <ul v-if="page == 'uncompleted'" class="mt-4">
      <li v-for="todo in uncompletedTodos" :key="todo.id" class="flex mt-2">
        <div
          class="bg-white py-2 px-3 flex items-center rounded-l flex-1"
          @click="completeTodo(todo.id)"
        >
          <input 
            type="checkbox" 
            class="mr-3"
          >
          <span class="mt-1">
            {{ todo.text }}
          </span>
        </div>
        <button 
          class="bg-red-400 text-white rounded-r px-2 py-3"
          @click="deleteTodo(todo.id)"
        >delete</button>
      </li>
    </ul>

    <ul v-if="page == 'completed'" class="mt-4">
      <li v-for="todo in completedTodos" :key="todo.id" class="flex mt-2">
        <div
          class="bg-white py-2 px-3 flex items-center rounded-l flex-1"
          @click="uncompleteTodo(todo.id)"
        >
          <input 
            type="checkbox" 
            class="mr-3"
            checked
          >
          <span class="mt-1 line-through">
            {{ todo.text }}
          </span>
        </div>
        <button 
          class="bg-red-400 text-white rounded-r px-2 py-3"
          @click="deleteTodo(todo.id)"
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
      page: 'uncompleted',
      todos: [
        {
          id: this.randomString(),
          text: 'Learn Vue',
          completed: true,
        },
        {
          id: this.randomString(),
          text: 'Learn supabase',
          completed: false,
        },
        {
          id: this.randomString(),
          text: 'Profit 🤑🤑🤑',
          completed: false
        }
      ]
    }
  },

  computed: {
    'completedTodos': function() {
      return this.todos.filter(todo => todo.completed)
    },

    'uncompletedTodos': function() {
      return this.todos.filter(todo => !todo.completed)
    }
  },

  methods: {
    addTodo() {
      this.todos.push({
        id: this.randomString(),
        text: this.newTodoText,
        completed: false
      })
      this.newTodoText = ''
      this.adding = false
    },

    deleteTodo(id) {
      let index = this.todos.map(todo => todo.id).indexOf(id)
      this.todos.splice(index, 1)
    },

    switchPage(page) {
      this.page = page
    },

    completeTodo(id) {
      let index = this.todos.map(todo => todo.id).indexOf(id)
      this.todos[index].completed = true
    },

    uncompleteTodo(id) {
      let index = this.todos.map(todo => todo.id).indexOf(id)
      this.todos[index].completed = false
    },

    randomString() {
      return Math.random().toString(36).substring(2);
    }
  }
}
</script>
