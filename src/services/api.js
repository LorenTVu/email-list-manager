const delay = (ms = 120) => new Promise((r) => setTimeout(r, ms));

const fpsemlist_define= {
  "IT-2025": {
    name: "IT Department",
    description: "All IT staff",
    active: true,
  },
  "HR-2025": {
    name: "HR Department",
    description: "Human Resources",
    active: true,
  },
};

const fpsemlist = {
  "IT-2025": {
    members: ["alice@plantsitelogistics.com", "bob@plantsitelogistics.com"],
    created_at: "2025-01-01T00:00:00Z",
    updated_at: "2025-08-01T00:00:00Z",
  },
  "HR-2025": {
    members: ["carol@plantsitelogistics.com"],
    created_at: "2025-02-01T00:00:00Z",
    updated_at: "2025-08-01T00:00:00Z",
  },
};

export default {
  async searchLists({ q = '' } = {}) {
    await delay()
    const ql = q.trim().toLowerCase()
    const ids = Object.keys(fpsemlist)
    const matched = ids.filter(id => {
      if (!ql) return true
      if (id.toLowerCase().includes(ql)) return true
      const md = fpsemlist_define[id] || {}
      if ((md.name || '').toLowerCase().includes(ql)) return true
      if ((md.description || '').toLowerCase().includes(ql)) return true
      return false
    }).map(id => ({
      id,
      name: fpsemlist_define[id]?.name || '',
      description: fpsemlist_define[id]?.description || '',
      member_count: (fpsemlist[id]?.members || []).length,
      active: fpsemlist_define[id]?.active ?? true
    }))
    return { data: matched, meta: { total: matched.length } }
  },

  async getList(id) {
    await delay()
    const key = String(id).toUpperCase()
    if (!fpsemlist[key]) throw new Error('List not found')
    return {
      id: key,
      name: fpsemlist_define[key]?.name || '',
      description: fpsemlist_define[key]?.description || '',
      members: [...fpsemlist[key].members],
      member_count: fpsemlist[key].members.length,
      created_at: fpsemlist[key].created_at,
      updated_at: fpsemlist[key].updated_at
    }
  },

  async createList({ id, name = '', description = '', active = true }) {
    await delay()
    const key = String(id).toUpperCase()
    if (fpsemlist[key]) throw new Error('LIST_EXISTS')
    fpsemlist_define[key] = { name, description, active }
    fpsemlist[key] = { members: [], created_at: new Date().toISOString(), updated_at: new Date().toISOString() }
    return { id: key, name, description, members: [] }
  },

  async addMembers(id, emails = []) {
    await delay()
    const key = String(id).toUpperCase()
    if (!fpsemlist[key]) throw new Error('List not found')
    const existing = new Set(fpsemlist[key].members.map(e => e.toLowerCase()))
    const added = []
    for (const raw of emails) {
      const e = String(raw || '').trim().toLowerCase()
      if (!e) continue
      if (!existing.has(e)) {
        existing.add(e)
        added.push(e)
      }
    }
    fpsemlist[key].members = Array.from(existing)
    fpsemlist[key].updated_at = new Date().toISOString()
    return { added, members: fpsemlist[key].members }
  },

  async removeMembers(id, emails = []) {
    await delay()
    const key = String(id).toUpperCase()
    if (!fpsemlist[key]) throw new Error('List not found')
    const removeSet = new Set(emails.map(e => String(e).trim().toLowerCase()))
    fpsemlist[key].members = fpsemlist[key].members.filter(e => !removeSet.has(e.toLowerCase()))
    fpsemlist[key].updated_at = new Date().toISOString()
    return { members: fpsemlist[key].members }
  }
}