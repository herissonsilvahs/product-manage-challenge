<template>
  <div class="home">
    <component-header />
    <home-list-products v-show="$store.state.userLogged" />
    <component-user-login v-show="!$store.state.userLogged" />
  </div>
</template>

<script>

import ComponentUserLogin from './UserLogin.vue'
import ComponentHeader from '@/components/Header'
import HomeListProducts from '@/components/HomeListProducts'

export default {
    name: 'Home',
    components: {
        ComponentUserLogin,
        ComponentHeader,
        HomeListProducts
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
