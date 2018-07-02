<template>
  <v-layout row wrap>
    <v-flex pl-2 xs4 offset-xs4>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-flex>
    <v-flex xs10 offset-xs1>
      <v-container fluid grid-list-md>
        <v-data-iterator
          :items="products"
          :rows-per-page-items="rowsPerPageItems"
          :pagination.sync="pagination"
          :loading="loading"
          :search="search"
          content-tag="v-layout"
          class="elevation-1"
          row
          wrap
        >
          <v-flex
            slot="item"
            slot-scope="props"
            xs4
          >
            <product-card
              :item="props.item"
              :key="props.item._id"
              class="mt-4 mr-3"
            />
          </v-flex>
          <template slot="no-data">
            <v-btn color="primary" @click="initialize">Reset</v-btn>
          </template>
        </v-data-iterator>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
  import ProductCard from './ProductCard'
  import API from '@/services/AuthenticationService'

  export default{
    data(){
      return {
        rowsPerPageItems: [8],
        pagination: {
          rowsPerPage: 8
        },
        loading: true,
        search: '',
        products: [],
      }
    },
    components:{
      ProductCard
    },
    created: function(){
      this.initialize()
    },
    methods: {
      initialize(){
        API.products(this.$store.state.token)
        .then((response)=>{
          this.products = response.data.products
          this.loading = false
        })
        .catch((error)=>{
          this.loading = false
          this.errorDialogShow(error)
        })
      }
    }
  }
</script>