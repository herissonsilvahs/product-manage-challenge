<template>
    <div class="main-content row">
       <div class="col-8 content">
            <form class="form-inline my-2 my-lg-0">
                <input v-model="query" class="form-control mr-sm-2" type="search" placeholder="Product" aria-label="Search">
                <button @click="searchProduct" class="btn btn-outline-success" type="submit">Search</button>
            </form>
            <div class="row">
                <div class="card product" v-for="product in product_list">
                  <img class="card-img-top" src="" alt="Card image cap">
                  <div class="card-body">
                    <h5 class="card-title">{{product.name}}</h5>
                    <p class="card-text">
                        {{product.description}}
                    </p>
                    <p class="card-expiry">Expiry: {{product.duedate | formatFieldData() }}</p>
                    <p class="card-price">Price: {{product.price | formatFieldPrice() }}</p>
                    <button @click="updateProduct(product._id)" type="button" class="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-sm">Edit</button>

                    <button @click="deleteProduct(product._id)" class="btn btn-danger">Delete</button>
                  </div>
                </div>
            </div>
        </div>
        <div class="col-4">
            <form @submit.prevent="addProduct">
                <h5>Add new Product</h5>
                <div class="form-group">
                    <input type="text" required v-model="registry.name" class="form-control" placeholder="Enter name product" required>
                </div>
                <div class="form-group">
                    <textarea class="form-control" required v-model="registry.description" id="exampleFormControlTextarea1" aria-describedby="descriptionHelp" rows="3" required></textarea>
                    <small id="descriptionHelp">Product description</small>
                </div>
                <div class="form-group">
                    <input type="date" required v-model="registry.duedate" aria-describedby="expiryHelp" class="form-control" required>
                    <small id="expiryHelp">Product expiry date</small>
                </div>
                <div class="form-group">
                    <input type="text" required v-model="registry.price" class="form-control" placeholder="Price" required>
                </div>
                <div class="alert alert-info" v-if="registry_message" role="alert">
                    {{registry_message}}
                </div>
                <button type="submit" class="btn btn-primary">Save</button>
            </form>
        </div>
        <div class="modal fade bd-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <form>
                        <h5>Update Product</h5>
                        <div class="form-group">
                            <input type="text" v-model="update.name" class="form-control" placeholder="Enter name product" required>
                        </div>
                        <div class="form-group">
                            <textarea class="form-control" v-model="update.description" id="exampleFormControlTextarea1" aria-describedby="descriptionHelp" rows="3" required></textarea>
                            <small id="descriptionHelp">Product description</small>
                        </div>
                        <div class="form-group">
                            <input type="date" v-model="update.duedate" aria-describedby="expiryHelp" class="form-control" required>
                            <small id="expiryHelp">Product expiry date</small>
                        </div>

                        <div class="form-group">
                            <input type="text" v-model="update.price" class="form-control" placeholder="Price" required>
                        </div>
                        <div class="alert alert-info" v-if="update_message" role="alert">
                            {{update_message}}
                        </div>
                        <button @click="updateProduct(false)" data-dismiss="modal" type="button" class="btn btn-primary">Save</button>
                    </form>
                </div>
            </div>
        </div>
   </div>
</template>

<script>
    import Auth from '@/services/AuthenticationService'

    export default {
        data(){
            return{
                product_list: null,
                registry_message: null,
                registry: { // Register form fields
                    name: '',
                    description: '',
                    duedate: '',
                    price: ''
                },
                update_message: null,
                update: { // Update form fields
                    name: '',
                    description: '',
                    duedate: '',
                    price: ''
                },
                query: ''
            }
        },
        filters: {
            formatFieldData(date)
            {
                let dateArray = date.split('T')[0].split("-")
                const year = dateArray[0]
                const mounth = dateArray[1]
                const day = dateArray[2]
                return (day+'-'+mounth+'-'+year)
            },
            formatFieldPrice(price)
            {
                return price.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
            }
        },
        mounted: async function(){
            try{
                let response = await Auth.product_list(this.$store.state.token)
                response.data.products.forEach((item)=>{
                    item.price = item.price
                    item.duedate = item.duedate
                })
                this.product_list = response.data.products;
            }catch(error){
                console.log(erro.response.data)
            }
        },

        methods: {

            async deleteProduct(id){
                try{
                    let response = await Auth.remove_product(id, this.$store.state.token)
                    if(response.status === 200){
                        /* Remove item deleted from list*/
                        this.product_list.forEach((item, index)=>{
                            if(item._id === id)
                                this.product_list.splice(index, 1)
                        })
                    }
                }catch(error)
                {
                    console.log(erro.response.data)
                }
            },

            async addProduct(){
                try{
                    let response = await Auth.new_product({
                        name: this.registry.name,
                        price: this.registry.price,
                        duedate: this.registry.duedate,
                        description: this.registry.description
                    }, this.$store.state.token);

                    if(response.status === 201){

                        this.product_list.push(response.data.product) /* Add to list products */

                        this.registry_message = "new registry success"

                        this.registry = {
                            name: ' ',
                            description: ' ',
                            duedate: ' ',
                            price: ' '
                        }

                        setTimeout(()=>{
                            this.registry_message = null
                        }, 3000)
                    }
                }catch(error){
                    this.registry_message = error.response.data;
                }
            },

            async updateProduct(id){

                /*
                 * If call function pass id, get product values and set fields
                 * else update product with values in fields
                 */
                if(id){
                    try{
                        let response = await Auth.product_get(id, this.$store.state.token)
                        this.update = response.data.product
                    }catch(error){
                        this.update_message = error.response.data;
                    }
                }else{

                    try{
                        let response = await Auth.update_product(
                            this.update._id,
                        {
                            name: this.update.name,
                            price: this.update.price,
                            duedate: this.update.duedate,
                            description: this.update.description
                        }, this.$store.state.token);

                        if(response.status === 200){

                            /* Search item updated in products and update */
                            this.product_list.forEach((item, index)=>{
                                if(item._id === this.update._id){

                                    this.product_list[index] = response.data.product
                                }
                            })
                            this.update_message = "update success"

                            setTimeout(()=>{
                                this.update_message = null
                            }, 3000)
                        }
                    }catch(error){
                        this.update_message = error.response.data

                        setTimeout(()=>{
                            this.update_message = null
                        }, 3000)
                    }
                }
            },

            async searchProduct(){
                if(this.query == '')
                    return
                try{
                    let response = await Auth.product_search(this.query, this.$store.state.token)

                    this.product_list = response.data.products;
                }catch(error){
                    console.log(erro.reponse.data)
                }
            }

        }
    }


    $('#myModal').on('shown.bs.modal', function () {
      $('#myInput').trigger('focus')
    })
</script>

<style scoped>
    .main-content{
        padding-top: 2em;
    }
    .card{
        width: 16rem;
        margin-left: 1em;
        margin-top: 2em;
    }
    .card .card-text{
        text-align: justify;
    }
    .card .card-price, .card-expiry{
        text-align: left;
    }
    .modal-content{
        padding: 1em;
    }
</style>