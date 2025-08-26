<template>
  <div id="app">
    <header class="app-header">
      <h1>Email List Manager</h1>
      <nav>
        <router-link to="/">Search</router-link>
        <router-link to="/lists/new">New List</router-link>
      </nav>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<style>
#app { font-family: Arial, sans-serif; max-width: 980px; margin: 20px auto; }
.app-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; }
.app-header nav a { margin-left:12px; text-decoration:none; color:#1366d6; }
</style>
