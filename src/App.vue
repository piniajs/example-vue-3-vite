<template>
  <div id="app">
    <img src="./logo.png" />
    <h1>Hello Vue 3 and Pinia!</h1>

    <h2>Hello {{ user.name }}</h2>

    <form @submit.prevent="addItemToCart">
      <input type="text" v-model="itemName" />
      <button>Add</button>
    </form>

    <form @submit.prevent="buy">
      <ul>
        <li v-for="item in cart.items" :key="item.name">
          {{ item.name }} ({{ item.amount }})
          <button @click="cart.removeItem(item.name)" type="button">X</button>
        </li>
      </ul>

      <button :disabled="!user.name">Buy</button>
      <button :disabled="!cart.items.length" @click="clearCart" type="button">
        Clear the cart
      </button>
    </form>
  </div>
</template>

<script>
// @ts-check
import { ref } from 'vue'
import { useUserStore } from './stores/user'
import { useCartStore } from './stores/cart'

export default {
  setup() {
    const user = useUserStore()
    const cart = useCartStore()

    const itemName = ref('')

    function addItemToCart() {
      if (!itemName.value) return
      cart.addItem(itemName.value)
      itemName.value = ''
    }

    function clearCart() {
      if (window.confirm('Are you sure you want to clear the cart?')) {
        cart.rawItems = []
      }
    }

    async function buy() {
      const n = await cart.purchaseItems()

      console.log(`Bought ${n} items`)

      cart.rawItems = []
    }

    // @ts-ignore
    window.stores = { user, cart }

    return {
      itemName,
      addItemToCart,
      cart,

      user,
      buy,
      clearCart,
    }
  },
}
</script>

<style scoped>
img {
  width: 200px;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
