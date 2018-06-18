<template>
    <header class="header fixed-top">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark justify-content-between">
            <a class="navbar-brand" href="#/">Product Manage</a>
            <form class="form-inline">
                <div class="row">
                    <div class="col">
                        <router-link v-if="!$store.state.userLogged" to="registry">
                            <button type="button" class="btn btn-outline-light">Sign Up</button>
                        </router-link>
                        <router-link v-if="$store.state.userLogged" to="registry">
                            <button type="button" class="btn btn-outline-link">
                                Hi, {{$store.state.user.name}}
                            </button>
                        </router-link>
                    </div>
                </div>
            </form>
        </nav>
    </header>
</template>

<script>
export default {

}
</script>

<style scoped>
</style>