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
          class="bg-red-400 text-white rounded-r px-4 py-3"
          @click="deleteTodo(todo.id)"
        ><i class="fas fa-trash"></i></button>
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
          class="bg-red-400 text-white rounded-r px-4 py-3"
          @click="deleteTodo(todo.id)"
        ><i class="fas fa-trash"></i></button>
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
      ><i class="fas fa-times"></i></button>
      <button 
        class="bg-green-400 text-white py-2 px-3 rounded-r"
        @click="addTodo()"
      ><i class="fas fa-plus"></i></button>
    </div>
    <button 
      class="bg-green-400 text-white py-2 px-3 w-full rounded mt-2 flex justify-center items-center"
      v-else
      @click="adding = true"
    ><i class="fas fa-plus"></i></button>
  </div>
</template>

<script>
import { createClient } from '@supabase/supabase-js'

export default {
  name: 'App',
  data() {
    return {
      adding: false,
      newTodoText: '',
      page: 'uncompleted',
      supabaseClient: null,
      todos: []
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
    async addTodo() {
      await this.supabaseClient.from('todos').insert([
        {
          text: this.newTodoText
        }
      ])

      this.newTodoText = ''
      this.adding = false
    },

    async deleteTodo(id) {
      await this.supabaseClient.from('todos').delete().eq('id', id)
    },

    switchPage(page) {
      this.page = page
    },

    async completeTodo(id) {
      await this.supabaseClient.from('todos').update({'completed': true}).eq('id', id)
    },

    async uncompleteTodo(id) {
      await this.supabaseClient.from('todos').update({'completed': false}).eq('id', id)
    },
  },

  created() {
    var self = this
    this.supabaseClient = createClient(
      import.meta.env.VITE_SUPABASE_URL, 
      import.meta.env.VITE_SUPABASE_KEY
    )

    this.supabaseClient.from('todos').select('*').then((result) => {
      self.todos = result.data
    })

    this.supabaseClient.from('todos').on('*', payload => {
      switch (payload.eventType) {
        case 'INSERT':
          this.todos.push(payload.new)
          break
        case 'UPDATE':
          let updateIndex = this.todos.map(todo => todo.id).indexOf(payload.new.id)
          this.todos[updateIndex] = payload.new
          break
        case 'DELETE':
          let deleteIndex = this.todos.map(todo => todo.id).indexOf(payload.old.id)
          this.todos.splice(deleteIndex, 1)
          break
      }
    }).subscribe()
  }
}
</script>
