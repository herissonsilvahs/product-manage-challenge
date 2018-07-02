<template>
  <v-app dark>
    <component-header />
    <router-view/>
  </v-app>
</template>

<script>

import ComponentHeader from '@/components/Header'

export default {
  name: 'App',
  components: {
    ComponentHeader
  }
}
</script>

<style>
body{
  background-color: #dddddd;
}
</style>
