<template>
   <div>
        <div class="contentForm">
            <form class="form-inline my-2 my-lg-0">
                <input v-model="query" class="form-control mr-sm-2" type="search" placeholder="Product" aria-label="Search">
                <button @click="searchProduct" class="btn btn-outline-success" type="submit">Search</button>
            </form>
        </div>
        <div class="row contentItems">
            <div class="card product" v-for="product in product_list">
              <img class="card-img-top" src="" alt="Card image cap">
              <div class="card-body">
                <h5 class="card-title">{{product.name}}</h5>
                <p class="card-text">
                    {{product.description}}
                </p>
                <p class="card-expiry">Expiry: {{product.duedate}}</p>
                <p class="card-price">Price: {{product.price}}</p>

                <button class="btn btn-dark">More info</button>
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
                query: ''
            }
        },
        mounted: async function(){
            try{
                let response = await Auth.product_list(this.$store.state.token)
                response.data.products.forEach((item)=>{
                    item.price = this.formatFieldPrice(item.price)
                    item.duedate = this.formatFieldData(item.duedate)
                })
                this.product_list = response.data.products;
            }catch(error){
                console.log(erro.response.data)
            }
        },
        methods: {
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
            },
            async searchProduct(){
                if(this.query == '')
                    return
                try{
                    let response = await Auth.product_search(this.query, this.$store.state.token)

                    /* Format date and price attributes */
                    response.data.products.forEach((item)=>{
                        item.price = this.formatFieldPrice(item.price)
                        item.duedate = this.formatFieldData(item.duedate)
                    })

                    this.product_list = response.data.products;
                }catch(error){
                    console.log(error.response.data)
                }
            }
        }
    }
</script>

<style scoped>
    .contentForm{
        padding-top: 1em;
    }
    .contentItems{
        padding-top: 3em;
    }
    .card{
        width: 14rem;
        margin-left: 1em;
    }
    .card .card-text{
        text-align: justify;
    }
    .card .card-price, .card-expiry{
        text-align: left;
    }
</style>