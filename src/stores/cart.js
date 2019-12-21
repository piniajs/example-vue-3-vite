// @ts-check
import { createStore } from 'pinia'
import { useUserStore } from './user'

export const useCartStore = createStore({
  id: 'cart',
  state: () => ({
    /** @type {string[]} */
    rawItems: []
  }),
  getters: {
    /**
     * @returns {Array<{ name: string; amount: number }>}
     */
    items: state =>
      state.rawItems.reduce((items, item) => {
        const existingItem = items.find(it => it.name === item)

        if (!existingItem) {
          items.push({ name: item, amount: 1 })
        } else {
          existingItem.amount++
        }

        return items
      }, [])
  },
  actions: {
    /**
     * Add item to the cart
     * @param {string} name
     */
    addItem(name) {
      this.state.rawItems.push(name)
    },

    /**
     * Remove item from the cart
     * @param {string} name
     */
    removeItem(name) {
      const i = this.state.rawItems.lastIndexOf(name)
      if (i > -1) this.state.rawItems.splice(i, 1)
    },

    async purchaseItems() {
      const user = useUserStore()
      if (!user.state.name) return

      console.log('Purchasing', this.items.value)
      const n = this.items.value.length
      this.state.rawItems = []

      return n
    }
  }
})
