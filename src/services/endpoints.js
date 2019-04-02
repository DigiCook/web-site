export default {
  menu: {
    list: { method: 'GET', url: 'api/menu' },
    get: { method: 'GET', url: 'api/menu/:id' }
  },
  plat: {
    list: { method: 'GET', url: 'api/plat' },
    get: { method: 'GET', url: 'api/plat/:id' }
  },
  typePlat: {
    list: { method: 'GET', url: 'api/typePlat' }
  }
  // TODO: Add all other endpoints
}
