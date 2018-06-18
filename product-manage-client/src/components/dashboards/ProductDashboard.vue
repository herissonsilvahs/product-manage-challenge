<template>
    <div class="row">
       <div class="col-8 content">
            <form class="form-inline my-2 my-lg-0">
                <input v-model="query" class="form-control mr-sm-2" type="search" placeholder="Product" aria-label="Search">
                <button @click="searchProduct" class="btn btn-outline-success" type="submit">Search</button>
            </form>
            <div class="row">
                <div class="card product" v-for="product in products">
                  <img class="card-img-top" src="" alt="Card image cap">
                  <div class="card-body">
                    <h5 class="card-title">{{product.name}}</h5>
                    <p class="card-text">
                        {{product.description}}
                    </p>
                    <p class="card-expiry">Expiry: {{product.duedate}}</p>
                    <p class="card-price">Price: {{product.price}}</p>
                    <button @click="updateProduct(product._id)" type="button" class="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-sm">Edit</button>

                    <button @click="deleteProduct(product._id)" class="btn btn-danger">Delete</button>
                  </div>
                </div>
            </div>
        </div>
        <div class="col-4">
            <form>
                <h5>Add new Product</h5>
                <div class="form-group">
                    <input type="text" v-model="registry.name" class="form-control" placeholder="Enter name product" required>
                </div>
                <div class="form-group">
                    <textarea class="form-control" v-model="registry.description" id="exampleFormControlTextarea1" aria-describedby="descriptionHelp" rows="3" required></textarea>
                    <small id="descriptionHelp">Product description</small>
                </div>
                <div class="form-group">
                    <input type="date" v-model="registry.duedate" aria-describedby="expiryHelp" class="form-control" required>
                    <small id="expiryHelp">Product expiry date</small>
                </div>

                <div class="form-group">
                    <input type="text" v-model="registry.price" class="form-control" placeholder="Price" required>
                </div>
                <div class="alert alert-info" v-if="registry_message" role="alert">
                    {{registry_message}}
                </div>
                <button type="button" @click="addProduct" class="btn btn-primary">Save</button>
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
                        <button type="submit" @click="updateProduct()" class="btn btn-primary">Save</button>
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
                products: null,
                registry_message: null,
                registry: {
                    name: '',
                    description: '',
                    duedate: '',
                    price: ''
                },
                update_message: null,
                update: {
                    name: '',
                    description: '',
                    duedate: '',
                    price: ''
                },
                query: ''
            }
        },
        mounted: async function(){
            try{
                const response = await Auth.product_list(this.$store.state.token)
                response.data.forEach((item)=>{
                    item.price = item.price.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
                    item.duedate = item.duedate.split('T')[0]
                })

                this.products = response.data;
            }catch(error){
                console.log(erro)
            }
        },

        methods: {
            async deleteProduct(id){
                try{
                    const response = await Auth.remove_product(id, this.$store.state.token)
                    if(response.status === 200){
                        /* Remove item deleted from list*/
                        this.products.forEach((item, index)=>{
                            if(item._id === id)
                                this.products.splice(index, 1)
                        })
                    }
                }catch(error)
                {
                    console.log(erro)
                }
            },

            async addProduct(){
                try{
                    const response = await Auth.new_product({
                        name: this.registry.name,
                        price: this.registry.price,
                        duedate: this.registry.duedate,
                        description: this.registry.description
                    }, this.$store.state.token);

                    if(response.status === 201){

                        /* Format date and price attributes */
                        response.data.price = response.data.price.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
                        response.data.duedate = response.data.duedate.split('T')[0]

                        this.products.push(response.data) /* Add to list products */

                        this.registry_message = "new regitry success"

                        this.update_message = null
                        this.update.name = ''
                        this.update.price = ''
                        this.update.description = ''
                        this.update.duedate = ''

                        setTimeout(()=>{
                            this.registry_message = null
                        }, 3000)
                    }
                }catch(error){
                    this.registry_message = error.response.data.message;
                }
            },
            async updateProduct(id = false){
                if(!id){
                    try{
                        const response = await Auth.update_product(
                            this.update._id,
                        {
                            name: this.update.name,
                            price: this.update.price,
                            duedate: this.update.duedate,
                            description: this.update.description
                        }, this.$store.state.token);

                        if(response.status === 200){
                            /* Format attributes*/
                            response.data.price = response.data.price.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
                            response.data.duedate = response.data.duedate.split('T')[0]

                            /* Search item updated in products and update */
                            this.products.forEach((item, index)=>{
                                if(item._id === this.update._id){

                                    this.products[index] = response.data
                                }
                            })
                            this.update_message = "update success"

                            setTimeout(()=>{
                                this.update_message = null
                                this.update.name = ''
                                this.update.price = ''
                                this.update.description = ''
                                this.update.duedate = ''
                            }, 3000)
                        }
                    }catch(error){
                        this.update_message = error.response.data.message;
                    }
                }else{

                    try{
                        const response = await Auth.product_get(id, this.$store.state.token)
                        response.data.duedate = response.data.duedate.split('T')[0]
                        this.update = response.data
                    }catch(error){
                        this.update_message = error.response.data.message;
                    }
                }
            },

            async searchProduct(){
                if(this.query == '')
                    return

                try{
                    const response = await Auth.product_search(this.query, this.$store.state.token)
                    response.data.forEach((item)=>{
                        item.price = item.price.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
                        item.duedate = item.duedate.split('T')[0]
                    })

                    this.products = response.data;
                }catch(error){
                    console.log(erro.data)
                }
            }

        }
    }

    $('#myModal').on('shown.bs.modal', function () {
      $('#myInput').trigger('focus')
    })
</script>

<style scoped>
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