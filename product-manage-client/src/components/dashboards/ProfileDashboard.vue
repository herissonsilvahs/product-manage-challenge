<template>
    <div class="row justify-content-center">
        <div class="card col-8">
          <div class="card-body">
            <div class="jumbotron">
                <h1 class="display-5">{{$store.state.user.name}}</h1>
                <hr class="my-4">
                <p class="lead">Email: {{$store.state.user.email}}</p>
                <hr class="my-4">
                <p class="lead">CPF: {{$store.state.user.cpf}}</p>
                <hr class="my-4">
                <p class="lead">Birthday: {{$store.state.user.birthday | formatFieldData() }}</p>
                <hr class="my-4">
                <p class="lead" v-if="$store.state.user.type==0">Nivel: Admin</p>
                <p class="lead" v-else-if="$store.state.user.type==1">Nivel: Client</p>
                <hr class="my-4">
                <a class="btn btn-primary btn-lg" href="#" role="button">Edit</a>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
    export default {
        filters:{
            formatFieldData(date)
            {
                let dateArray = date.split('T')[0].split("-")
                const year = dateArray[0]
                const mounth = dateArray[1]
                const day = dateArray[2]
                return (day+'/'+mounth+'/'+year)
            }
        }
    }
</script>

<style scoped>
    .card{
        padding: 0px;
    }
    .card .jumbotron{
        text-align: left;
    }

    .card .jumbotron p{
        font-size: 12pt;
    }

    .card .jumbotron h1{
        text-align: center;
        font-size: 18pt;
    }
</style>