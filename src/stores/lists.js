import { defineStore } from 'pinia'
import api from '../services/api'

export const useListsStore = defineStore('lists', {
  state: () => ({
    lists: [],      
    total: 0,
    current: null,  
    loading: false,
    error: null
  }),
  actions: {
    async search(q = '') {
      this.loading = true
      try {
        const res = await api.searchLists({ q })
        this.lists = res.data
        this.total = res.meta?.total ?? this.lists.length
        this.error = null
      } catch (e) {
        this.error = e.message || 'Search failed'
      } finally {
        this.loading = false
      }
    },

    async getList(id) {
      this.loading = true
      try {
        const data = await api.getList(id)
        this.current = data
        this.error = null
        return data
      } catch (e) {
        this.current = null
        this.error = e.message || 'Get list failed'
        throw e
      } finally {
        this.loading = false
      }
    },

    async createList(payload) {
      this.loading = true
      try {
        const res = await api.createList(payload)
        this.error = null
        return res
      } catch (e) {
        this.error = e.message || 'Create failed'
        throw e
      } finally {
        this.loading = false
      }
    },

    async addMembers(id, emailsArray) {
      this.loading = true
      try {
        const res = await api.addMembers(id, emailsArray)
        if (this.current?.id === id) {
          this.current.members = res.members
          this.current.member_count = res.members.length
        }
        return res
      } catch (e) {
        throw e
      } finally {
        this.loading = false
      }
    },

    async removeMembers(id, emailsArray) {
      this.loading = true
      try {
        const res = await api.removeMembers(id, emailsArray)
        if (this.current?.id === id) {
          this.current.members = res.members
          this.current.member_count = res.members.length
        }
        return res
      } catch (e) {
        throw e
      } finally {
        this.loading = false
      }
    }
  }
})
