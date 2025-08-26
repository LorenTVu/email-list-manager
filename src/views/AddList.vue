<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useListsStore } from '../stores/lists'

const router = useRouter()
const store = useListsStore()

const id = ref('')
const name = ref('')
const description = ref('')
const error = ref(null)
const creating = ref(false)

const submit = async () => {
  error.value = null
  if (!id.value) { error.value = 'ID is required'; return }
  creating.value = true
  try {
    const payload = { id: id.value, name: name.value, description: description.value, active: true }
    await store.createList(payload)
    router.push({ name: 'ListDetail', params: { id: id.value.toUpperCase() } })
  } catch (e) {
    error.value = e.message || 'Create failed'
  } finally { creating.value = false }
}
</script>

<template>
  <div style="padding:12px;">
    <h2>Create New List</h2>
    <div v-if="error" style="color:crimson">{{ error }}</div>

    <div style="margin-top:8px;">
      <label>ID</label><br />
      <input v-model="id" placeholder="e.g. IT-2025" />
    </div>
    <div>
      <label>Name</label><br />
      <input v-model="name" />
    </div>
    <div>
      <label>Description</label><br />
      <textarea v-model="description" rows="3"></textarea>
    </div>

    <div style="margin-top:8px;">
      <button @click="submit" :disabled="creating">Create</button>
    </div>
  </div>
</template>
