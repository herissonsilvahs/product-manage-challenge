<template>
    <header class="header fixed-top">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark justify-content-between">
            <a class="navbar-brand" href="#/">Store</a>
            <form class="form-inline">
                <div class="row">
                    <div class="col">
                        <router-link v-if="!$store.state.userLogged" to="registry">
                            <button type="button" class="btn btn-outline-light">Sign Up</button>
                        </router-link>
                        <div class="dropdown" v-if="$store.state.userLogged">
                          <a class="btn btn-outline-secondary dropdown-toggle username" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Hi, {{$store.state.user.name}}
                          </a>

                          <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                            <router-link class="dropdown-item" to="dashboard">Dashboard</router-link>
                            <a class="dropdown-item" @click="logout">Logout</a>
                          </div>
                        </div>
                    </div>
                </div>
            </form>
        </nav>
    </header>
</template>

<script>
export default {
    methods:{
        logout(){
            this.$store.dispatch('setToken', null)
            this.$store.dispatch('setUser', null)
            this.$router.push('/')
        }
    }
}
</script>
<style scoped>
    .dropdown .username {
        color: white;
    }
</style>