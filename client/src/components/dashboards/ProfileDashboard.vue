<template>
  <v-layout row wrap>
    <v-flex xs12 v-if="$route.params.action == 'geral'">
      <profile-view />
    </v-flex>
  </v-layout>
</template>

<script>
  import ProfileView from './profile/ViewProfile.vue'
  export default {
    components: {
      ProfileView
    }
  }
</script>

<style scoped>

</style>