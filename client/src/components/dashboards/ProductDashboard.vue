<template>
  <v-layout v-if="$store.state.user.type == 0" row wrap>

    <v-flex xs12 v-if="$route.params.action == 'list'">

      <product-manager-table />

    </v-flex>

  </v-layout>

  <!-- Alert access denied for user not admin -->
  <v-alert v-else :value="true" type="error">
    This user is not allowed to access this router.
  </v-alert>
  <!-- End Alert -->
</template>

<script>
  import API from '@/services/AuthenticationService'
  import ProductManagerTable from '@/components/dashboards/product/ProductManagerTable'

  export default {
  components: {
    ProductManagerTable
  }
}
</script>

<style scoped>

</style>