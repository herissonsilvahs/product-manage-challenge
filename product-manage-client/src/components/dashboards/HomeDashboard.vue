<template>
   <div>
        <div>
            <form class="form-inline my-2 my-lg-0">
                <input v-model="query" class="form-control mr-sm-2" type="search" placeholder="Product" aria-label="Search">
                <button @click="searchProduct" class="btn btn-outline-success" type="submit">Search Products</button>
            </form>
        </div>
        <div class="row">
            <div class="card product" v-for="product in products">
              <img class="card-img-top" src="" alt="Card image cap">
              <div class="card-body">
                <h5 class="card-title">{{product.name}}</h5>
                <p class="card-text">
                    {{product.description}}
                </p>
                <p class="card-expiry">Expiry: {{product.duedate}}</p>
                <p class="card-price">Price: {{product.price}} R$</p>
                <button type="button" class="btn btn-dark">More</button>
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
                query: ''
            }
        },
        mounted: async function(){
            try{
                const response = await Auth.product_list(this.$store.state.token)
                //console.log(response.data)
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
            async searchProduct(){
                if(this.query == '')
                    return

                try{
                    const response = await Auth.product_search(this.query, this.$store.state.token)

                    /* Format date and price attributes */
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
</script>

<style scoped>
    .card{
        width: 14rem;
        margin-left: 1em;
        margin-top: 2em;
    }
    .card .card-text{
        text-align: justify;
    }
    .card .card-price, .card-expiry{
        text-align: left;
    }
</style>