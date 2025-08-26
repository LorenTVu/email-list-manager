<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useListsStore } from '../stores/lists'

const store = useListsStore()
const q = ref('')
const router = useRouter()

const doSearch = async () => {
  await store.search(q.value)
}

onMounted(() => { store.search() })

const view = id => router.push({ name: 'ListDetail', params: { id } })
</script>

<template>
  <div class="p-4">
    <div style="display:flex; gap:8px; margin-bottom:12px;">
      <input v-model="q" placeholder="Search by ID, name, description" style="flex:1; padding:8px;" @keyup.enter="doSearch"/>
      <button @click="doSearch">Search</button>
      <router-link to="/lists/new"><button>New List</button></router-link>
    </div>

    <div v-if="store.loading">Loading...</div>
    <div v-if="store.error" style="color:crimson">{{ store.error }}</div>

    <table style="width:100%; border-collapse:collapse;">
      <thead>
        <tr><th style="text-align:left">ID</th><th>Name</th><th>Description</th><th>Members</th><th></th></tr>
      </thead>
      <tbody>
        <tr v-for="l in store.lists" :key="l.id" style="border-top:1px solid #eee">
          <td>{{ l.id }}</td>
          <td>{{ l.name }}</td>
          <td>{{ l.description }}</td>
          <td style="text-align:center">{{ l.member_count }}</td>
          <td><button @click="view(l.id)">View</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
