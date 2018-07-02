<template>
  <v-toolbar app fixed clipped-left>
    <v-toolbar-title>
      <router-link class="white--text pt-0" :to="{ name:'home' }">
        <v-icon large>fas fa-shopping-bag</v-icon>
      </router-link>
      <span class="headline ml-2">Store App</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-menu v-if="$store.state.userLogged" offset-y>
      <v-btn
        slot="activator"
        color="white"
        dark
        outline
      >
        Hi, {{$store.state.user.name}}
      </v-btn>
      <v-list>
        <v-list-tile
          :to="{name: 'profile_dashboard', params: { action: 'geral' }}"
        >
          <v-list-tile-title>Dashboard</v-list-tile-title>
        </v-list-tile>
        <v-list-tile
          @click="logout"
        >
          <v-list-tile-title>Logout</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>

<script>
  export default {
    methods:{
      logout(){
        this.$store.dispatch('setToken', null)
        this.$store.dispatch('setUser', null)
        this.$router.push({name: 'home'})
      }
    }
  }
</script>
<style scoped>

</style>