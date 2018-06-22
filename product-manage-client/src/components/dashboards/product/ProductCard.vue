<template>
    <div class="card product">
      <img class="card-img-top" src="" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">{{product.name}}</h5>
        <p class="card-text">
            {{product.description}}
        </p>
        <p class="card-expiry">Expiry: {{product.duedate | formatFieldData() }}</p>
        <p class="card-price">Price: {{product.price | formatFieldPrice() }}</p>
        <button @click="$emit('update', product._id)" type="button" class="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-sm">Edit</button>

        <button @click="$emit('delete', product._id)" class="btn btn-danger">Delete</button>
      </div>
    </div>
</template>

<script>
    export default{
        props: {
            product: { type: Object }
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
    }
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
</style>