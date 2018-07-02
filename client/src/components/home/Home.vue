<template>
  <v-content>
    <home-store v-if="$store.state.userLogged" />
    <user-authenticate v-else />
  </v-content>
</template>

<script>

import UserAuthenticate from '@/components/auth/UserAuthenticate'
import HomeStore from '@/components/store/HomeStore'

export default {
    name: 'home',
    components: {
        UserAuthenticate,
        HomeStore
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
