<template>
  <div class="bg-gray-200 h-screen p-2">
    <h1 class="text-3xl text-center">Todos</h1>
    <ul>
      <li class="bg-white mt-2 py-2 px-3 flex items-center rounded" v-for="todo in todos">
        <input type="checkbox" class="mr-3">
        <span class="mt-1">
          {{ todo.text }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
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
  }
}
</script>
