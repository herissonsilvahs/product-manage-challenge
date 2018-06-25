<template>
   <div class="container-fluid">
        <div class="contentForm">
            <form class="form-inline my-2 my-lg-0">
                <input v-model="query" class="form-control mr-sm-2" type="search" placeholder="Product" aria-label="Search">
                <button @click="searchProduct" @keyup.enter="searchProduct" class="btn btn-outline-success" type="submit">Search</button>
            </form>
        </div>
        <div class="row contentItems">
            <product-card
                v-for="product in product_list"
                :key="product._id"
                :product="product"
                :options="product_options"
            />
        </div>
   </div>
</template>

<script>

    import Auth from '@/services/AuthenticationService'
    import ProductCard from '@/components/dashboards/product/ProductCard.vue'

    export default {
        data(){
            return{
                product_list: null,
                product_options: {
                    edit: false,
                    delete: false,
                    infos: true
                },
                query: ''
            }
        },
        components:{
            ProductCard
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
                this.product_list = response.data.products;
            }catch(error){
                console.log(erro.response.data)
            }
        },
        methods: {
            async searchProduct(){
                try{
                    let response = null
                    
                    if(this.query == '')
                        response = await Auth.product_list(this.$store.state.token)
                    else
                        response = await Auth.product_search(this.query, this.$store.state.token)

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