<template>
  <div class="home">
    <component-header />
    <div class="container-fluid">
        <component-user-login />
    </div>
  </div>
</template>

<script>

import ComponentUserLogin from './UserLogin.vue'
import ComponentHeader from '@/components/Header'

export default {
    name: 'Home',
    data () {
        return {
        }
    },
    components: {
        ComponentUserLogin,
        ComponentHeader
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
