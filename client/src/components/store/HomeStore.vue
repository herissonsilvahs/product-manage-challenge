<template>
  <v-container fluid>
    <product-list />
  </v-container>
</template>

<script>

  import ProductList from '@/components/store/product/ProductList.vue'

  export default {
    components:{
      ProductList
    }
  }
</script>

<style scoped>

</style>