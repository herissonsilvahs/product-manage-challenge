<template>
  <div>
    <!-- Toolbar manager products -->
    <v-toolbar flat>
      <v-toolbar-title>Manager Products</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>

      <!-- Dialog form for create and edit product -->
      <v-dialog v-model="dialog" max-width="500px">
        <v-btn slot="activator" color="primary" dark class="mb-2">Create</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">Products</span>
          </v-card-title>
          
          <form xs12 sm6 md4 class="pa-4">
              <v-text-field
              v-model="editedItem.name"
              :required=" editedIndex > -1 ? true : false "
              label="Name">
              </v-text-field>

              <v-text-field
              v-model="editedItem.price"
              :required=" editedIndex > -1 ? false : true "
              label="Price"
              placeholder="Ex: 23.50">
              </v-text-field>

              <v-text-field
              v-model="editedItem.duedate"
              :required=" editedIndex > -1 ? false : true "
              :mask="editedIndex > -1 ? '' : '##/##/####' "
              :return-masked-value=" editedIndex > -1 ? false : true "
              placeholder="Ex: 23/05/2017"
              label="Expiry">
              </v-text-field>

              <v-text-field
              multi-line
              v-model="editedItem.description"
              :required=" editedIndex > -1 ? false : true "
              placeholder="Product description"
              label="Description">
              </v-text-field>
          </form>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- End dialog form -->

    </v-toolbar>
    <!-- End toolbar manager products -->
    <v-text-field
      v-model="search"
      append-icon="search"
      label="Search"
      single-line
      hide-details
    ></v-text-field>
    <v-data-table
      :headers="headers"
      :loading="loading"
      :items="products"
      :search="search"
      class="elevation-1"
    >
      <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
      <template slot="items" slot-scope="props">
        <td>{{ props.item.name }}</td>
        <td class="text-xs-right">{{ props.item.price | formatPrice() }}</td>
        <td class="text-xs-right">{{ props.item.duedate | formatDate() }}</td>
        <td class="text-xs-right">{{ props.item.description }}</td>
        <td class="justify-center layout px-0">
          <v-icon
            small
            class="mr-2"
            @click="editItem(props.item)"
          >
            edit
          </v-icon>
          <v-icon
            small
            @click="deleteItem(props.item)"
          >
            delete
          </v-icon>
        </td>
      </template>
      <template slot="no-data">
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
    <v-dialog v-model="errorDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span>{{error_message}}</span>
          <v-spacer></v-spacer>
        </v-card-title>
        <v-card-actions>
          <v-btn color="primary" flat @click.stop="errorDialogClose">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import API from '@/services/AuthenticationService'
  export default{
    data(){
      return{
        loading: true,
        search: '',
        error_message: null,
        errorDialog: false,
        products: [],
        dialog: false,
        headers: [
          {
            text: 'Name',
            align: 'left',
            sortable: true,
            value: 'name'
          },
          { text: 'Price', value: 'price' },
          { text: 'Expiry', value: 'duedate' },
          { text: 'Description', value: 'description' },
          { text: 'Actions', value: 'name', sortable: false }
        ],
        editedIndex: -1,
        editedItem: {
          name: null,
          price: null,
          duedate: null,
          description: null
        },
        defaultItem: {
          name: null,
          price: null,
          duedate: null,
          description: null
        }
      }
    },
    watch: {
      dialog (val) {
        val || this.close()
      }
    },
    created: function(){
      this.initialize()
    },
    methods:{
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
      },

      editItem (item) {
        this.editedIndex = this.products.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.editedItem.duedate = new Date(this.editedItem.duedate)
                                  .toLocaleDateString('pt-BR')
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.products.indexOf(item)
        if(confirm('You really want delete this item?')){
          API.product_delete(item._id, this.$store.state.token)
          .then(()=>{
            this.products.splice(index, 1)
          })
          .catch((error)=>{
            this.errorDialogShow(error)
          })
        }
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      invertedDuedate(){
      /* Temporary solution for format date to database */
      return  (this.editedItem.duedate.substr(6, 4)+'/'+
              this.editedItem.duedate.substr(3, 2)+'/'+
              this.editedItem.duedate.substr(0, 2))
      },

      save () {

        if (this.editedIndex > -1) {
          /* Update exist product */
          API.product_update(
            this.editedItem._id,
            {
              name: this.editedItem.name,
              description: this.editedItem.description,
              price: this.editedItem.price,
              duedate: this.invertedDuedate()
            },
            this.$store.state.token
          )
          .then((response)=>{
            Object.assign(this.products[this.editedIndex], response.data.product)
            this.dialog = false
          })
          .catch((error)=>{
            this.errorDialogShow(error)
          })

        } else {

          /* Create new product */
          this.editedItem.duedate = this.invertedDuedate()
          API.product_insert(this.editedItem, this.$store.state.token)
          .then((response)=>{
            this.products.unshift(response.data.product)
            this.dialog = false
          })
          .catch((error)=>{
            this.errorDialogShow(error)
          })
        }
      },

      errorDialogShow(error){
        this.error_message = error.response.data.message || 
                              error.response.data.Error.message
        this.errorDialog = true
      },

      errorDialogClose(){
        this.errorDialog = false
        this.error_message = null
      }
    }
  }
</script>

<style scoped>
.borda{border: 1px solid red;}
</style>