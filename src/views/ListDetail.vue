<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useListsStore } from '../stores/lists'

const route = useRoute()
const store = useListsStore()
const id = ref(route.params.id)
const list = ref(null)
const newEmails = ref('')
const removeEmails = ref('')
const error = ref(null)

const load = async () => {
  error.value = null
  try {
    list.value = await store.getList(id.value)
  } catch (e) {
    error.value = e.message || 'Failed loading list'
  }
}
onMounted(load)
watch(() => route.params.id, (v) => { id.value = v; load() })

const add = async () => {
  const arr = newEmails.value.split(',').map(s => s.trim()).filter(Boolean)
  if (!arr.length) return
  try {
    const res = await store.addMembers(id.value, arr)
    list.value.members = res.members
    list.value.member_count = res.members.length
    newEmails.value = ''
  } catch (e) {
    error.value = e.message || 'Add failed'
  }
}

const remove = async () => {
  const arr = removeEmails.value.split(',').map(s => s.trim()).filter(Boolean)
  if (!arr.length) return
  try {
    const res = await store.removeMembers(id.value, arr)
    list.value.members = res.members
    list.value.member_count = res.members.length
    removeEmails.value = ''
  } catch (e) {
    error.value = e.message || 'Remove failed'
  }
}
</script>

<template>
  <div style="padding:12px;">
    <div v-if="error" style="color:crimson">{{ error }}</div>
    <div v-if="!list">Loading...</div>
    <div v-else>
      <h2>{{ list.id }} — {{ list.name }}</h2>
      <p>{{ list.description }}</p>

      <h3>Members ({{ list.member_count }})</h3>
      <ul>
        <li v-for="m in list.members" :key="m">{{ m }}</li>
      </ul>

      <div style="margin-top:12px;">
        <h4>Add members (comma separated)</h4>
        <input v-model="newEmails" style="width:60%" placeholder="alice@plantsitelogistics.com, bob@plantsitelogistics.com" />
        <button @click="add">Add</button>
      </div>

      <div style="margin-top:12px;">
        <h4>Remove members (comma separated)</h4>
        <input v-model="removeEmails" style="width:60%" />
        <button @click="remove">Remove</button>
      </div>
    </div>
  </div>
</template>
